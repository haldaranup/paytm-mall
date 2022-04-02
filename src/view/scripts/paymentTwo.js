///*************** cookies ******************** */
alert("after type your card number press enter get for payment button");
const cookies = (name) => {
  // console.log(name);
  let tokenArr = document.cookie.split(";");
  // console.log(tokenArr);
  for (let i = 0; i < tokenArr.length; i++) {
    let subArr = tokenArr[i].split("=");
    // console.log(subArr[0]);
    if (subArr[0].trim() === name) {
      // console.log(subArr[1], "ram");
      return subArr[1];
    }
  }
};

//**************** fetch all data from backend ****************/

const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

//********* fetch user id********** */

const disPlayName = async () => {
  let subArr = cookies("token");
  //   console.log("token", subArr);
  let res = await fetch("https://paytm-mall-clone.herokuapp.com/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      Authorization: `Bearer ${subArr}`,
    },
  });
  let data = await res.json();
  //   console.log(data);
  return data;
};

// ****************** fetch all user product**************************/
const fetchUserProducts = async (id) => {
  try {
    let res = await fetchData(`https://paytm-mall-clone.herokuapp.com/userCartProduct/${id}`);
    // console.log(res);
    let total = 0;
    res.map(async (el) => {
      let pid = el.productId;
      let data = await fetchData(`https://paytm-mall-clone.herokuapp.com/fashion?q=${pid}`);
      //   console.log(data);
      total += Number(data.price);
      //   console.log(total);
      document.getElementById("pay").innerText = `₹ ${total}`;
    });
  } catch (error) {
    console.log(error);
  }
};

///********************** finding user id********** */

const findUser = async () => {
  try {
    let data = await disPlayName();
    fetchUserProducts(data.id);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
findUser();

const payment = async () => {
  //   let productDetails = {
  //     userId: await disPlayName(),
  //     couponId: cookies("couponId"),
  //   };

  let card = document.getElementById("card");
  let value = card.value;
  let btn = document.querySelector("button");
  let count = 0;
  card.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      btn.style.display = "block";
    }
  });

  btn.addEventListener("click", async () => {
    try {
      let data = await disPlayName();
      let id = data.id;
      //********* */
      let res = await fetchData(`https://paytm-mall-clone.herokuapp.com/userCartProduct/${id}`);
      console.log(res);
      res.map(async (el) => {
        let productDetails = {
          userId: el.userId,
          productId: el.productId,
        };
        // console.log(productDetails);
        //************************************************************************************** */
        productDetails = JSON.stringify(productDetails);
        let res = await fetch("https://paytm-mall-clone.herokuapp.com/userBuyProduct", {
          method: "POST",
          body: productDetails,
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        console.log("data", data);
        //************************************************** */
      });
      btn.textContent = "Processing....";
      setTimeout(() => {
        window.location.href = "/review.html";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  });
};

payment();

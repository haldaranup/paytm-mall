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
  return data.id;
};

const payment = async () => {
  let token = cookies("token");

  let productDetails = {
    userId: await disPlayName(),
    couponId: cookies("couponId"),
  };
  //   console.log("product", productDetails);
  //   console.log(userId, "userId");
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
      productDetails = JSON.stringify(productDetails);
      let res = await fetch("https://paytm-mall-clone.herokuapp.com/userBuyCoupon", {
        method: "POST",
        body: productDetails,
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      btn.textContent = "Processing....";
      setTimeout(() => {
        window.location.href = "/review.html";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  });

  let price = cookies("totalPrice");
  document.getElementById("pay").textContent = `₹ ${price}`;
};

payment();

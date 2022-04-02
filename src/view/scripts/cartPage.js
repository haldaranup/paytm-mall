let container = document.getElementById("container");
container.textContent = "";
let totalPrice = 0;

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

// ************************ cookies data ****************\

const cookies = (name) => {
  // console.log(name);
  let tokenArr = document.cookie.split(";");
  //   console.log(tokenArr);
  for (let i = 0; i < tokenArr.length; i++) {
    let subArr = tokenArr[i].split("=");
    // console.log(subArr[0]);
    if (subArr[0].trim() === name) {
      // console.log(subArr[1], "ram");
      return subArr[1];
    }
  }
};

// ******************* apppend all cart product *******************/

const appendData = async (id) => {
  console.log("id", id);
  let data = await fetchData(`https://paytm-mall-clone.herokuapp.com/fashion?q=${id}`);
  console.log(data);

  let main_div = document.createElement("div");

  let image_div = document.createElement("div");

  let image = document.createElement("img");
  image.setAttribute("src", data.image);

  let details_div = document.createElement("div");

  let name = document.createElement("h4");
  name.textContent = data.brand;

  let desc = document.createElement("p");
  desc.setAttribute("class", "grey");
  desc.textContent = data.name;

  let o_price = document.createElement("span");
  o_price.setAttribute("class", "price");
  o_price.textContent = ` ₹ ${data.price}`;
  // due to error we have written inside this
  totalPrice += Number(data.price);
  document.getElementById("bag_price").textContent = totalPrice;
  document.getElementById("total").textContent = totalPrice;

  let s_price = document.createElement("span");
  s_price.setAttribute("class", "grey");
  s_price.setAttribute("class", "line-through");
  s_price.textContent = ` ₹${data.stPrice}`;

  let size = document.createElement("span");
  size.innerText = `size :${data.size}`;
  size.style.marginLeft = "10px";

  let button = document.createElement("button");
  button.setAttribute("class", "btn");
  button.textContent = `Remove Item `;
  button.addEventListener("click", () => {
    removeItem(id);
  });

  image_div.append(image);
  details_div.append(name, desc, o_price, s_price, size, button);
  main_div.append(image_div, details_div);
  container.append(main_div);
};

// ****************** fetch all user product**************************/
const fetchUserProducts = async (id) => {
  try {
    let res = await fetchData(`https://paytm-mall-clone.herokuapp.com/userCartProduct/${id}`);
    console.log(res);
    res.map((el) => {
      //   console.log(el.productId);
      appendData(el.productId);
    });
  } catch (error) {
    console.log(error);
  }
};

// console.log(user);
const getusedId = async () => {
  try {
    let subArr = cookies("token");
    console.log("token", subArr);
    if (subArr == undefined) {
      alert("please log in");
      window.location.href = "/qrsign.html";
    } else {
      let res = await fetch("https://paytm-mall-clone.herokuapp.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${subArr}`,
        },
      });
      let data = await res.json();

      fetchUserProducts(data.id);
    }
  } catch (error) {
    console.log(error.message);
  }
};
getusedId();

async function removeItem(pid) {
  try {
    // finding user id
    let subArr = cookies("token");
    // console.log("token", subArr)
    let res = await fetch("https://paytm-mall-clone.herokuapp.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${subArr}`,
      },
    });
    let data = await res.json();
    console.log(data);
    uid = data.id;
    console.log(uid, pid);

    let response = await fetch(
      `https://paytm-mall-clone.herokuapp.com/userCartProduct?p=${pid}&u=${uid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let dataOne = await response.json();
    if (!dataOne._id) {
      window.location.href = "/qrsign.html";
    } else {
      window.location.href = "/cartPage.html";
    }
  } catch (error) {
    console.log(error.message);
  }
}

document.getElementById("pay").addEventListener("click", () => {
  window.location.href = "/address.html";
});

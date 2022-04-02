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

const fetchData = async (productName) => {
  try {
    let res = await fetch(`https://paytm-mall-clone.herokuapp.com/coupon/${productName}`);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const appendData = (Data) => {
  document.querySelector("#product_products").textContent = "";
  let count = 0;
  Data.map(function (elm) {
    count++;
    var div = document.createElement("div");
    div.setAttribute("class", "product_div");

    var image = document.createElement("img");
    image.setAttribute("src", elm.image);
    image.setAttribute("width", "100%");

    var name = document.createElement("p");
    name.textContent = `${elm.name} Gift Cards`;
    name.style.color = "gray";
    name.style.fontSize = "20px";
    name.style.marginTop = "10px";
    name.style.marginBottom = "10px";

    var mrp = document.createElement("p");
    mrp.textContent = "₹ " + elm.price;
    mrp.style.fontSize = "18px";
    mrp.style.fontWeight = "bolder";

    var cashback = document.createElement("p");
    cashback.textContent = "Buy for ₹ " + elm.offPrice;
    cashback.style.fontSize = "15px";
    cashback.style.color = "red";
    cashback.style.fontWeight = "bold";

    var withcashback = document.createElement("p");
    withcashback.textContent = "with cashback";
    withcashback.style.fontSize = "20px";
    withcashback.style.color = "gray";

    div.append(image, name, mrp, cashback, withcashback);

    document.querySelector("#product_products").append(div);
    div.addEventListener("click", () => {
      // localStorage.setItem("price", JSON.stringify(elm.mrp));
      document.cookie = "couponId=" + elm._id;
      window.location.href = "checkout.html";
    });
  });
  document.getElementById("item_count").textContent = count;
  document.getElementById(
    "total"
  ).textContent = `${Data[0].name} - ${count} Products`;
};
const sortData = async () => {
  let productName = JSON.parse(localStorage.getItem("coupon"));
  let Data = await fetchData(productName);
  let value = document.getElementById("sort").value;
  //   console.log(value);
  let data;
  if (value == "ltoh") {
    data = Data.sort((a, b) => {
      return a.price - b.price;
    });
  } else if (value == "htol") {
    data = Data.sort((a, b) => {
      return b.price - a.price;
    });
  } else {
    data = Data;
  }
  appendData(data);
};

const getData = async () => {
  try {
    // let productName = JSON.parse(localStorage.getItem("coupon"));
    let productName = cookies("couponName");

    let data = await fetchData(productName);
    appendData(data);
  } catch (error) {
    console.log(error);
  }
};
getData();

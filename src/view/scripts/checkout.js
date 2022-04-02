///*********** for cookies ********** */
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

//*********** authntction************ */

const disPlayName = async () => {
  let subArr = cookies("token");

  if (subArr == undefined) {
    alert("please sign in");
    window.location.href = "qrsign.html";
  } else {
    window.location.href = "payment.html";
  }
};

//********************* fetch data ************* */

const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

let productId = cookies("couponId");
console.log(productId);

//******************** */

const goTo = () => {
  console.log("hello");
  disPlayName();
  document.getElementById("button1").innerText = "Processing....";
  setTimeout(() => {
    // window.location.href = "/payment.html";
  }, 3000);
};

// ******** adding money to button and store the price in the cookie***************//
async function totalPrice() {
  let quantity = document.querySelector("#quantity").value || "1";

  let data = await fetchData(`https://paytm-mall-clone.herokuapp.com/coupon?q=${productId}`);

  document.querySelector("#total").textContent = quantity * data.price;
  //   localStorage.setItem("price", JSON.stringify(selected * price));
  let total = quantity * data.price;
  document.cookie = "totalPrice=" + total;
  document.getElementById("button1").addEventListener("click", goTo);
}
//************** go to payment page**************** */
const appendData = async () => {
  alert("please choose  quantity");
  let data = await fetchData(`https://paytm-mall-clone.herokuapp.com/coupon?q=${productId}`);
  document.getElementById("name").textContent = `${data.name} Gift Cards`;

  // image
  let image = document.createElement("img");
  image.setAttribute("src", data.image);
  image.setAttribute("width", "100%");
  document.querySelector("#pdt_image").append(image);

  // ul data
  let li1 = document.createElement("li");
  li1.innerText = data.ph1;
  let li2 = document.createElement("li");
  li2.innerText = data.ph2;
  let li3 = document.createElement("li");
  li3.innerText = data.ph3;
  document.querySelector("ul").append(li1, li2, li3);

  /// adding price
  document.querySelector("#MRP").textContent = "₹" + data.price;
  document.querySelector("#total").textContent = data.price;

  // quantity

  document.querySelector("#quantity").addEventListener("change", totalPrice);
  console.log(data);
};
appendData();

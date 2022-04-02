///*********** for cookies ********** */
const cookies = (name) => {
  // console.log(name);
  let tokenArr = document.cookie.split(";");
  console.log(tokenArr);
  for (let i = 0; i < tokenArr.length; i++) {
    let subArr = tokenArr[i].split("=");
    // console.log(subArr[0]);
    if (subArr[0].trim() === name) {
      // console.log(subArr[1], "ram");
      return subArr[1];
    }
  }
};

const findUserId = async () => {
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
  return data;
  //   console.log(data);
};
// ***********************append the coupon data to the deal**************
const appendCoupon = (Data) => {
  //   console.log(Data);
  let container = document.querySelector("#deal");
  let main_div = document.createElement("div");
  let leftDiv = document.createElement("div");
  let image = document.createElement("img");
  image.setAttribute("src", Data.image);
  leftDiv.append(image);

  let name = document.createElement("p");
  name.textContent = Data.name;

  let price = document.createElement("span");
  price.textContent = `₹ ${Data.price}`;

  let stPrice = document.createElement("span");
  stPrice.textContent = Data.offPrice;
  stPrice.setAttribute("class", "grey");
  //   stPrice.style.textDecoration = "line-through";
  //   let ul = document.createElement(ul);

  let para1 = document.createElement("li");
  para1.textContent = Data.ph1;
  let para2 = document.createElement("li");
  para2.textContent = Data.ph2;
  let para3 = document.createElement("li");
  para3.textContent = Data.ph3;
  let order = document.createElement("p");
  order.textContent = `. Successful Order`;
  order.style.color = "green";

  let rightDiv = document.createElement("div");
  rightDiv.append(name, price, stPrice, para1, para2, para3, order);

  main_div.append(leftDiv, rightDiv);
  container.append(main_div);
};

//// ****************************** append the product to the body*****************
const appendProduct = async (Data) => {
  try {
    let container = document.querySelector("#shopping");
    console.log(Data);
    let response1 = await fetch(
      `https://paytm-mall-clone.herokuapp.com/userAddress?q=${Data._id}`
    );
    let address = await response1.json();
    console.log(address);
    //****************   append the data to the body */
    let main_div = document.createElement("div");
    let image_div = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", Data.image);

    let details_div = document.createElement("div");

    let name = document.createElement("h4");
    name.textContent = Data.brand;

    let desc = document.createElement("p");
    desc.style.color = "grey";
    desc.textContent = Data.name;

    let o_price = document.createElement("span");
    o_price.setAttribute("class", "price");
    o_price.textContent = ` ₹ ${Data.price}`;

    let s_price = document.createElement("span");
    s_price.style.color = "grey";
    s_price.style.textDecoration = "line-through";
    s_price.textContent = ` ₹${Data.stPrice}`;

    let size = document.createElement("span");
    size.innerText = `size :${Data.size}`;
    size.style.marginLeft = "10px";

    let user = document.createElement("h5");
    user.textContent = address.first_name;
    let number = document.createElement("p");
    number.textContent = address.mobile_no;
    let add = document.createElement("p");
    add.textContent = address.address1;
    let zip = document.createElement("p");
    zip.te = address.zipcode;
    let date = document.createElement("p");
    date.textContent = address.updatedAt;

    let success = document.createElement("p");
    success.textContent = ".Order successful";
    success.style.color = "green";
    success.style.fontWeight = "bold";

    image_div.append(image);
    details_div.append(
      name,
      desc,
      o_price,
      s_price,
      size,
      user,
      number,
      add,
      zip,
      date,
      success
    );
    main_div.append(image_div, details_div);
    container.append(main_div);
    //********************* end the append */
  } catch (error) {
    console.log(error.message);
  }
};

//***************************** fetching coupon */
const fetchCoupon = async (id) => {
  try {
    // console.log(id);
    let res = await fetch(`https://paytm-mall-clone.herokuapp.com/userBuyCoupon/${id}`);
    let data = await res.json();
    document.querySelector("#deal").textContent = "";
    data.forEach(async (el) => {
      let coupon = el.couponId;
      let response = await fetch(`https://paytm-mall-clone.herokuapp.com/coupon?q=${coupon}`);
      let Data = await response.json();
      appendCoupon(Data);
    });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const fetchUserProduct = async (id) => {
  try {
    let res = await fetch(`https://paytm-mall-clone.herokuapp.com/userBuyProduct/${id}`);
    let data = await res.json();
    // console.log(data);
    document.querySelector("#shopping").textContent = "";
    data.forEach(async (el) => {
      let product = el.productId;
      let response = await fetch(`https://paytm-mall-clone.herokuapp.com/fashion?q=${product}`);
      let Data = await response.json();

      appendProduct(Data);
    });
  } catch (error) {
    console.log(error);
  }
};

const control = async () => {
  try {
    let data = await findUserId();
    console.log(data, "data");
    fetchCoupon(data.id);

    fetchUserProduct(data.id);
  } catch (error) {
    console.log(error);
  }
};
control();

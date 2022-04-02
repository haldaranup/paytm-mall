document.querySelector("#form_ship").addEventListener("submit", shipping);
var paytm_Arr = JSON.parse(localStorage.getItem("address")) || [];

//********************cokies*********************************** */
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

async function shipping(event) {
  event.preventDefault();
  var fName = document.querySelector("#fname").value;
  var lName = document.querySelector("#lname").value;
  var add1 = document.querySelector("#add1").value;
  var add2 = document.querySelector("#add2").value;
  var country = document.querySelector("#country").value;
  var zcode = document.querySelector("#zcode").value;
  var num = document.querySelector("#num").value;

  console.log(fName, lName, add1, add2, country, zcode, num);
  if (
    fName != "" &&
    lName != "" &&
    add1 != "" &&
    country != "" &&
    zcode != "" &&
    num != ""
  ) {
    try {
      let data = await disPlayName();
      let id = data.id;
      //********* */
      let res = await fetchData(`https://paytm-mall-clone.herokuapp.com/userCartProduct/${id}`);
      //   console.log(res);
      res.map(async (el) => {
        try {
          let userAddress = {
            productId: el.productId,
            first_name: fName,
            last_name: lName,
            address1: add1,
            country: country,
            zipcode: zcode,
            mobile_no: num,
          };
          userAddress = JSON.stringify(userAddress);
          let res = await fetch("https://paytm-mall-clone.herokuapp.com/userAddress", {
            method: "POST",
            body: userAddress,
            headers: {
              "Content-Type": "application/json",
            },
          });
          let data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }

    window.location.href = "/paymentTwo.html";
  }
}

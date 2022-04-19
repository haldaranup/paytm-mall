///*********************************************************************************** */

const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const appendData = async (parent, start, end) => {
  try {
    let url = "https://paytm-mall-clone.herokuapp.com/couponHome";
    let data = await fetchData(url);
    for (let i = start; i <= end; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "col");
      // div.setAttribute("class", "click");
      div.addEventListener("click", () => {
        // localStorage.setItem("coupon", JSON.stringify(data[i].name));

        document.cookie = "couponName=" + data[i].name;
        window.location.href = "./product.html";
      });

      let image = document.createElement("img");
      image.setAttribute("class", "rounded-circle");
      image.setAttribute("class", "img-fluid");
      image.setAttribute("src", data[i].image);

      let name = document.createElement("p");
      name.setAttribute("class", "text-center");
      name.innerText = data[i].name;
      div.append(image, name);
      parent.append(div);
    }
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
let carouseOne = document.getElementById("carouseOne");
appendData(carouseOne, 0, 9);
let carouseTwo = document.getElementById("carouseTwo");
appendData(carouseTwo, 10, 19);
let carouseThree = document.getElementById("carouseThree");
appendData(carouseThree, 20, 29);
let carouseFour = document.getElementById("carouseFour");
appendData(carouseFour, 30, 39);
let carouseFive = document.getElementById("carouseFive");
appendData(carouseFive, 40, 49);
let carouseSix = document.getElementById("carouseSix");
appendData(carouseSix, 50, 59);

const appendDataSpecial = async (parent, start, end) => {
  try {
    let url = "https://paytm-mall-clone.herokuapp.com/couponHome";
    let data = await fetchData(url);
    for (let i = start; i <= end; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "col");
      // div.setAttribute("class", "click");
      div.addEventListener("click", () => {
        // localStorage.setItem("coupon", JSON.stringify(data[i].name));
        console.log(data[i].name);
        document.cookie = "couponName=" + data[i].name;
        window.location.href = "./product.html";
      });

      let image = document.createElement("img");
      image.setAttribute("class", "rounded-circle");
      image.setAttribute("class", "img-fluid");
      image.setAttribute("src", data[i].image);

      let name = document.createElement("h3");
      name.setAttribute("class", "bold1");
      name.innerText = data[i].name;
      div.append(image, name);
      parent.append(div);
    }
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

let carouseSeven = document.getElementById("carouseSeven");
appendDataSpecial(carouseSeven, 64, 67);
let carouseEight = document.getElementById("carouseEight");
appendDataSpecial(carouseEight, 67, 70);
let carouseNine = document.getElementById("carouseNine");
appendDataSpecial(carouseNine, 71, 74);
let carouseTen = document.getElementById("carouseTen");
appendDataSpecial(carouseTen, 72, 75);

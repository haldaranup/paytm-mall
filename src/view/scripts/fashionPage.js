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

//************************ check authentication for user *************************** */
const disPlayName = async () => {
  let subArr = cookies("token");
  console.log("token", subArr);
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
};

// ***************************** append data to the body**********************

const appendData = async (products) => {
  // console.log(products, "products");
  let parent = document.getElementById("product");
  parent.textContent = "";

  products.map((el) => {
    // if (el.type == value) {
    let div = document.createElement("div");
    div.setAttribute("class", "child");

    let image = document.createElement("img");
    image.setAttribute("src", el.image);

    let subChild = document.createElement("div");
    subChild.setAttribute("class", "subChild");
    let name = document.createElement("h4");
    name.textContent = el.brand;

    let desc = document.createElement("p");
    desc.setAttribute("class", "grey");
    desc.textContent = el.name;

    let o_price = document.createElement("span");
    o_price.setAttribute("class", "price");
    o_price.textContent = ` ₹ ${el.price}`;

    let s_price = document.createElement("span");
    s_price.setAttribute("class", "grey");
    s_price.setAttribute("class", "line-through");
    s_price.textContent = el.stPrice;

    let size = document.createElement("span");
    size.setAttribute("class", "price");
    size.style.marginLeft = "10px";
    size.textContent = `size :${el.size}`;

    let button = document.createElement("button");
    button.setAttribute("class", "btn");
    button.textContent = "Add to Cart";
    button.addEventListener("click", async () => {
      try {
        let user = await disPlayName();
        if (!user.name) {
          window.location.href = "/qrsign.html";
        } else {
          let user = await disPlayName();
          let productCart = {
            userId: user.id,
            productId: el._id,
          };
          productCart = JSON.stringify(productCart);
          let res = await fetch("https://paytm-mall-clone.herokuapp.com/userCartProduct", {
            method: "POST",
            body: productCart,
            headers: {
              "Content-Type": "application/json",
            },
          });
          let data = await res.json();
          // console.log(data);
          window.location.href = "/cartPage.html";
        }
      } catch (error) {
        console.log(error.message);
      }
    });
    subChild.append(name, desc, o_price, s_price, size, button);
    div.append(image, subChild);
    parent.append(div);
    // }
  });
};

// let fashionData = JSON.parse(localStorage.getItem("allFashionData"));

const callAppend = async () => {
  try {
    let itemName = cookies("fashion");
    // console.log("fashion", itemName);
    let products = await fetchData(`https://paytm-mall-clone.herokuapp.com/fashion/${itemName}`);
    // console.log("products", products);
    appendData(products);
  } catch (error) {
    console.log(error);
  }
};
callAppend();

const sort = async () => {
  let itemName = cookies("fashion");
  let fashionData = await fetchData(
    `https://paytm-mall-clone.herokuapp.com/fashion/${itemName}`
  );
  let sortValue = document.getElementById("select").value;
  console.log(sortValue);
  let filterValue = document.getElementById("brand").value;
  let updateData;
  const filterfunction = (prod) => {
    if (filterValue == "Adidas") {
      return (prod.brand = "Adidas");
    } else if (filterValue == "Reebok") {
      return (prod.brand = "Reebok");
    } else {
      return true;
    }
  };

  if (sortValue != "") {
    updateData = fashionData.filter(filterfunction).sort((a, b) => {
      if (sortValue == "asse") {
        return a.price - b.price;
      } else if (sortValue == "desce") {
        return b.price - a.price;
      } else {
        return fashionData;
      }
    });
  } else {
    updateData = fashionData.filter(filterfunction);
  }

  appendData(updateData);
};

const filter = async () => {
  let itemName = cookies("fashion");
  // console.log(itemName)
  let fashionData = await fetchData(
    `https://paytm-mall-clone.herokuapp.com/fashion/${itemName}`
  );
  let sortValue = document.getElementById("select").value;
  let filterValue = document.getElementById("brand").value;
  console.log(filterValue);
  let updateData;
  const filterfunction = (prod) => {
    if (filterValue == "Adidas") {
      return prod.brand == "Adidas";
    } else if (filterValue == "Reebok") {
      return prod.brand == "Reebok";
    } else {
      return true;
    }
  };

  if (sortValue != "") {
    updateData = fashionData.filter(filterfunction).sort((a, b) => {
      if (sortValue == "asse") {
        return a.price - b.price;
      } else if (sortValue == "desce") {
        return b.price - a.price;
      } else {
        return fashionData;
      }
    });
  } else {
    updateData = fashionData.filter(filterfunction);
  }

  appendData(updateData);
};

// sort and filter

const login = async () => {
  try {
    let user_data = {
      email: document.querySelector(".email").value,
      password: document.querySelector(".password").value,
    };
    // console.log(user_data)

    let user_data_json = JSON.stringify(user_data);

    let res = await fetch("https://paytm-mall-clone.herokuapp.com/login", {
      method: "POST",
      body: user_data_json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    if (data.errors) {
      console.log("false");
      alert("please register if you are a new user");
      window.location.href = "register.html";
    } else if (data.message) {
      alert(`${data.message} , enter your email address`);
      window.location.href = "register.html";
    } else {
      // localStorage.setItem("token", JSON.stringify(data.token));
      document.cookie = "token=" + data.token;
      document.cookie = "site=paytmmall";
      window.location.href = "index.html";
      console.log(data.token);
    }
    data = data.token;
    console.log(data);
  } catch (err) {
    console.log("err", err);
  }
};

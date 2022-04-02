const signin = async (event) => {
  event.preventDefault();

  try {
    let user_data = {
      name: document.querySelector(".name").value,
      email: document.querySelector(".email").value,
      password: document.querySelector(".password").value,
    };
    console.log(user_data);
    if (
      user_data.name != "" &&
      user_data.email != "" &&
      user_data.password != ""
    ) {
      user_data = JSON.stringify(user_data);

      let res = await fetch("https://paytm-mall-clone.herokuapp.com/register", {
        method: "POST",
        body: user_data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (data.errors || data.errors) {
        console.log("false");
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
    } else {
      alert("enter valid details");
    }
  } catch (err) {
    console.log("err", err);
  }
};
// document.getElementById(
//   "google",
//   addEventListener("click", () => {
//     window.location.href = "http://localhost:5901/auth/google";
//   })
// );
document.querySelector("form").addEventListener("submit", signin);

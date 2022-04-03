const cookies = (name) => {
  let tokenArr = document.cookie.split(";");
  // console.log(tokenArr);
  for (let i = 0; i < tokenArr.length; i++) {
    let subArr = tokenArr[i].split("=");
    // console.log(subArr);
    if (subArr[0].trim() == name) {
      //   console.log(subArr[1]);
      return subArr[1];
    }
  }
};
export { cookies };

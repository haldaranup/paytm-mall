function navbar() {
  return `
  <div class="topNavStyle"></div>
    <div id="mainLogo">
      <a href="index.html"><img src="logo/mainLogo.png" alt="" /></a>
    </div>
  
    <div id="navDetails" >
      <div id="navLeft">
        <div id="category">
          <img src="logo/menu.png" alt="" /><a href="">
            <p>Shop By Category</p>
          </a>
        </div>
        <div id="test">
          <input
            id="searchBar"
            type="text"
            placeholder="Search for a Product, Brand or Category"
          /><img src="logo/search.png" alt="" />
        </div>
      </div>
  
      <div id="userOptions" class="hidden" >
        <div id="order">
          <img id="orderImg" src="logo/to-do-list.png" alt="" /><p class="mt-10 " >My
            Orders</p>
        </div>
  
        <div id="cart">
          
            <img id="orderImg" src="logo/bag.png" alt="" /><p class="mt-10" id="totalPrice">Cart Page</P>
        </div>
        <div id="user"><img id="orderImg" src="logo/user-profile.png" alt="" /><p class="mt-10" id="u-name">Login/SignUp</p></div>
      </div>
    </div>
    <img src="logo/menu.png" class="none" alt="" id=""click1>`;
}

export { navbar };

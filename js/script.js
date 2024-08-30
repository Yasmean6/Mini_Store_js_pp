$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      }
  }
  });
})
// -------------- DEFINE PRODUCTS------------

let productsDom = document.querySelector(".products");

// -------------------Display Products -------------
let drowProductsUI;
(drowProductsUI = function (products = []) {
  let productsUI = products
    .map((item) => {
      return `
            <div class="product-item shadow-sm">
              <img src= ${item.imgURL} class="img-fluid product-item-img">
              <div class="product-item-desc p-3">
                <span class="d-block font-weight-bold">Product : ${item.product}</span>
                <span class="d-block font-weight-bold">Price : ${item.price}</span>
                <span class="d-block font-weight-bold">Category : ${item.category}</span>
              </div>
              <div class="product-item-actions">
                <button class="btn btn-dark" id="cart-btn-${item.id}" onClick="addedToCart(${item.id})"><i class="fa-solid fa-cart-shopping pr-2"></i>Add to cart</button>
                <i class="fa-solid fa-heart" onClick="addedToFevorite(${item.id})"  style="color: ${(item.liked )? "#c1121f":""}" ></i>
              </div>
            </div>
        `;
    })
    .join("");
  productsDom.innerHTML = productsUI;
})(JSON.parse(localStorage.getItem("products")));

// ------------ CHECK LOGIN WHEN USER CLICKED ON CARD -------------

let carts_productsDom = document.querySelector(".carts_products");
let carts_products = document.querySelector(".carts_products div");
let carts_badge = document.querySelector("#user_info .badge");

let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItem.length) {
  addedItem.map((item) => {
    carts_products.innerHTML += `
<p class="home-products d-flex justify-content-between align-items-center mr-auto flex-row pl-2">
  <span>${item.product}</span>
  <span class="d-flex align-items-center">
    <i class="fa-solid fa-plus px-3" onClick="increaseQTY(${item.id})"></i>
    <span class="qty-num">${item.qty}</span>
    <i class="fa-solid fa-minus px-3" onClick="decreaseQTY(${item.id})"></i>
  </span>
</p>`
  });
  carts_badge.innerHTML = addedItem.length;
}

let allItems = [...addedItem]; 


function addedToCart(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    let items = allItems.find((i) => i.id === choosenItem.id);
    let btn = document.getElementById(`cart-btn-${id}`);

    if (items) {
      // إذا كان العنصر موجودًا بالفعل في العربة
      allItems = allItems.filter((item) => item.id !== id); // إزالة العنصر من العربة
      btn.classList.remove("btn-remove");
      btn.classList.add("btn-dark");
      btn.innerHTML = '<i class="fa-solid fa-cart-shopping pr-2"></i>Add to cart';
    } else {
      // إضافة العنصر إلى العربة
      choosenItem.qty = 1;
      allItems.push(choosenItem);
      btn.classList.remove("btn-dark");
      btn.classList.add("btn-remove");
      btn.innerHTML = '<i class="fa-solid fa-circle-xmark pr-2"></i>Remove from cart';
      btn.style.width = '200px'; // تغيير العرض حسب الحاجة
      btn.style.padding = '5px 0'; // تعديل الحشو
    }

    renderCartItems();
    localStorage.setItem("productsInCart", JSON.stringify(allItems));
  } else {
    window.location = "../login.html";
  }
}


function increaseQTY(id) {
  let item = allItems.find((i) => i.id === id);
  if (item) {
    item.qty += 1;
  }
  renderCartItems();
  localStorage.setItem("productsInCart", JSON.stringify(allItems));
}

function decreaseQTY(id) {
  let itemIndex = allItems.findIndex((i) => i.id === id);
  if (itemIndex !== -1) {
    let item = allItems[itemIndex];
    item.qty -= 1;
    
    if (item.qty === 0) {
      allItems.splice(itemIndex, 1);
    }
  }
  renderCartItems();
  localStorage.setItem("productsInCart", JSON.stringify(allItems));
}

function renderCartItems() {
  carts_products.innerHTML = "";
  allItems.forEach((item) => {
    carts_products.innerHTML += `
<p class="home-products d-flex justify-content-between align-items-center mr-auto flex-row pl-2">
  <span>${item.product}</span>
  <span class="d-flex align-items-center">
    <i class="fa-solid fa-plus px-3" onClick="increaseQTY(${item.id})"></i>
    <span class="qty-num">${item.qty}</span>
    <i class="fa-solid fa-minus px-3" onClick="decreaseQTY(${item.id})"></i>
  </span>
</p>`;
  });
  carts_badge.innerHTML = allItems.length;
}


// -------------------- Show Cart Menu -------------
function showProducts() {
  if (carts_products.innerHTML != "") {
    if (carts_productsDom.style.display == "block") {
      carts_productsDom.style.display = "none";
    } else {
      carts_productsDom.style.display = "block";
    }
  }
}
// --------------------------

let searchInput = document.getElementById("search");
  let size_filter = document.querySelector(".size-filter");

  searchInput.addEventListener("keyup", function (e) {
    let products = JSON.parse(localStorage.getItem("products"));
    let filter = size_filter.value;

    if (filter === "1") {
      searchByName(e.target.value, products);
    } else if (filter === "2") {
      searchByCategory(e.target.value, products);
    }

    if (e.target.value.trim() === "") {
      drowProductsUI(products);
    }
  });

  function searchByName(product, myArray) {
    let arr = myArray.filter((item) => item.product.indexOf(product) !== -1);
    console.log(arr);
    drowProductsUI(arr);
  }

  function searchByCategory(category, myArray) {
    let arr = myArray.filter((item) => item.category.indexOf(category) !== -1);
    console.log(arr);
    drowProductsUI(arr);
  }

// ----------------------------

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

//-------------- FAVORITE ---------------

let favoritesItems = localStorage.getItem("productsFevorite")
  ? JSON.parse(localStorage.getItem("productsFevorite"))
  : [];
function addedToFevorite(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    favoritesItems = [...favoritesItems, choosenItem];
    choosenItem.liked = true
    let uniqueProducts = getUniqueArr(favoritesItems,"id")
    localStorage.setItem("productsFevorite", JSON.stringify(uniqueProducts));

    // قم بتحديث الـ products في localStorage
    let allProducts = JSON.parse(localStorage.getItem("products"));
    let updatedProducts = allProducts.map((item) => 
      item.id === id ? { ...item, liked: true } : item
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // إعادة رسم واجهة المستخدم
    drowProductsUI(updatedProducts);
  } else {
    window.location = "../login.html";
  }
}



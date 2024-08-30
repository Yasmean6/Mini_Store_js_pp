let productsInCart = localStorage.getItem("productsInCart");
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
let totalPriceDom = document.querySelector(".totalPrice");

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 3,
      },
    },
  });
});

// ------------------ TOTAL PRICE-----------

// حساب إجمالي السعر
function calculateTotalPrice(products) {
  let total = products.reduce((acc, product) => {
    // تأكد من أن السعر والكمية هما أرقام صحيحة
    let price = parseFloat(product.price) || 0;
    let qty = parseInt(product.qty) || 0;

    return acc + price * qty;
  }, 0);
  return total;
}

// ------------------------------------

if (productsInCart) {
  let items = JSON.parse(productsInCart);
  drawCartProductsUI(items);
  updateTotalPrice(items);  // تحديث إجمالي السعر عند تحميل الصفحة
}

function drawCartProductsUI(products) {
  if (products.length === 0) {
    noProductsDom.innerHTML = "There is no items !!";
    totalPriceDom.innerHTML = "";  // إخفاء إجمالي السعر إذا كانت العربة فارغة
    return;
  }

  let productsUI = products
    .map((item) => {
      return `
            <div class="product-item shadow-sm">
              <img src= ${item.imgURL} class="img-fluid product-item-img">
              <div class="product-item-desc p-3">
                <span class="d-block font-weight-bold">Product : ${item.product}</span>
                <span class="d-block font-weight-bold">Category : ${item.category}</span>
                <span class="d-block font-weight-bold">Price : ${item.price}</span>
                <div class="quantity-controls d-flex justify-content-around pt-4">
                <button class="btn font-weight-bold d-inline-block" onClick="increaseQty(${item.id})" style="font-size:20px">+</button>
                <span class=" font-weight-bold btn btn-dark px-3 py-2">${item.qty}</span>
                <button class="btn font-weight-bold  d-inline-block px-3" onClick="decreaseQty(${item.id})" style="font-size:20px">-</button>
                </div>
              </div>
              <div class="product-item-actions">
                <button class="btn btn-danger d-block w-100" onClick="removeFromCart(${item.id})" style=" background-color: #c1121f;"><i class="fa-solid fa-circle-xmark pr-2"></i>Remove from cart</button>
              </div>
            </div>
        `;
    })
    .join("");

  productsDom.innerHTML = productsUI;
}

// زيادة الكمية
function increaseQty(id) {
  let items = JSON.parse(localStorage.getItem("productsInCart"));
  items = items.map(item => {
    if (item.id === id) {
      item.qty += 1;  // زيادة الكمية
    }
    return item;
  });

  localStorage.setItem("productsInCart", JSON.stringify(items));
  drawCartProductsUI(items);
  updateTotalPrice(items);  // تحديث إجمالي السعر
}

// تقليل الكمية
function decreaseQty(id) {
  let items = JSON.parse(localStorage.getItem("productsInCart"));
  items = items.map(item => {
    if (item.id === id && item.qty > 1) {
      item.qty -= 1;  // تقليل الكمية
    }
    return item;
  });

  localStorage.setItem("productsInCart", JSON.stringify(items));
  drawCartProductsUI(items);
  updateTotalPrice(items);  // تحديث إجمالي السعر
}

function removeFromCart(id) {
  let items = JSON.parse(localStorage.getItem("productsInCart"));
  let filteredItems = items.filter((item) => item.id !== id);

  localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
  drawCartProductsUI(filteredItems);
  updateTotalPrice(filteredItems);  // تحديث إجمالي السعر بعد حذف منتج
}

// تحديث عرض إجمالي السعر
function updateTotalPrice(products) {
  let total = calculateTotalPrice(products);
  totalPriceDom.innerHTML = `<p class="font-weight-bold total-Price-text">Total Price: <br><span class="total-Price-num">$${total.toFixed(2)}</span></p>`;
}

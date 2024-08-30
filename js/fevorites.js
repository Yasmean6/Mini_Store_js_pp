let productsInCart1 = localStorage.getItem("productsFevorite");
let productsDom1 = document.querySelector(".favoritesItems");
let noProductsDom1 = document.querySelector(".noProducts")
// ----------------


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


// --------------

if (productsInCart1) {
  let items = JSON.parse(productsInCart1);
  drowCartProductsUI1(items);
}

function drowCartProductsUI1(products) {

  if(JSON.parse(localStorage.getItem("productsFevorite")).length === 0){
    noProductsDom1.innerHTML = "There is no items !!"
  }

  let productsUI = products
    .map((item) => {
      return `
        <div class="product-item shadow-sm item" style="border-radius:30px">
      <img src= ${item.imgURL}  class="img-fluid product-item-img" style="border-top-left-radius:30px; border-top-right-radius:30px">
      <div class="row">
        <div class="product-item-desc p-3 ml-3">
          <span class="d-block font-weight-bold mb-3">Product : ${item.product}</span>
          <span class="d-block font-weight-bold">Category : ${item.category}</span>
        </div>
        <div class="product-item-actions mt-3 ml-1">
          <i class="fa-solid fa-heart text-danger px-3" onClick="removeFromCart1(${item.id})"></i>
        </div>
      </div>
    </div>
        `;
    }).join("")
    
  productsDom1.innerHTML = productsUI;
}


function removeFromCart1(id) {
  if (productsInCart1) {
    let items = JSON.parse(productsInCart1);
    let filterdItems = items.filter((item) => item.id !== id);
    // console.log(filterdItems)
    localStorage.setItem("productsInCart1", JSON.stringify(filterdItems));
    productsInCart1 = localStorage.getItem("productsInCart1")
    drowCartProductsUI1(filterdItems);
  }
}

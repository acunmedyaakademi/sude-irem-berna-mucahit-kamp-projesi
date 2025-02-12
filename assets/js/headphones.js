// const category = "headphones"

function init(){
  render();
  hamburgerMenuBtn.addEventListener('click', showHamburgerMenu);
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.addEventListener('click', showCart);
  cartDialog.addEventListener('click', (e) => {
    const cartContainer = document.querySelector('.cart-dialog-container');
    const isInsideCart = cartContainer.contains(e.target);
    const isPlusOrMinus = e.target.classList.contains('plus-icon') || e.target.classList.contains('minus-icon');
  
    if (!isInsideCart && !isPlusOrMinus) {
      cartDialog.close();
    }
  });
  hamburgerMenu.addEventListener('click', (e) => {
    if (!document.querySelector('.hamburgermenu-container').contains(e.target)) {
      hamburgerMenu.close();
    }
  });
}

async function getData() {  
  const category = window.location.href.split("/").at(-1).split(".")[0];
  const data = await fetch("../../data.json").then(r => r.json());
  renderCategories(data);
  return data.filter(x => x.category == category);
}

async function render() {
  const products = await getData();
  const productContainer = document.querySelector(".product-headphones");
  productContainer.innerHTML = products.map(product => {
    return `<div class="product-headphones-item">
      <div class="product-category-img">
        <img src="../${product.categoryImage.desktop}" alt="${product.name}">
      </div>
      <div class="product-headphones-text">
        ${product.isNew ? `<h4>New Product</h4>` : ""} 
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a 
          id="${product.slug}" 
          class="${product.slug} category-btns btn" 
          href="/assets/pages/product-detail.html#/${product.slug}">
          See Product
        </a>
      </div>
    </div>`
  }).join("");

  btnFunctionalities();
}

function renderCategories(categories){
  const categoriesContainer = document.querySelector('.categories');
  const categoryNames = new Set(categories.map(x => x.category));
  let categoryItems = [];
  for (const x of categoryNames) {
    categoryItems.push(categories.find(category => category.category === x));
  }
  console.log(categoryItems);
  categoriesContainer.innerHTML = categoryItems.map(x => 
    `
      <div class="category-item">
        <img class="category-img" src="..${x.categoryImage.svg}" alt="Speakers Img">
        <h3>${x.category.toUpperCase()}</h3>
        <a id="speakers-pages" href="../pages/${x.category}.html">Shop<img src="/assets/home/mobile/right.svg" alt=""></a>
      </div>
    `
  );
  hamburgerMenu.innerHTML = `
  <div class="hamburgermenu-container">
    ${categoryItems.map(x => 
      `
        <div class="category-item">
          <img class="category-img" src="..${x.categoryImage.svg}" alt="Speakers Img">
          <h3>${x.category.toUpperCase()}</h3>
          <a id="speakers-pages" href="../pages/${x.category}.html">Shop<img src="/assets/home/mobile/right.svg" alt=""></a>
        </div>
      `
    ).join("")}
  </div>
  `
}

function btnFunctionalities() {
  const cartBtn = document.querySelector(".cart-icon");
  const cartDialog = document.querySelector("#cart-dialog");

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartDialog.showModal();
  })
}

function showCart(e){
  e.preventDefault();
  cartDialog.showModal();
  renderCart();
}

function renderCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;
  let totalItems = 0;
  for (const item of cart) {
    totalPrice = totalPrice + (item.price * item.quantity);
    totalItems = totalItems + item.quantity;
  }
  cartDialog.innerHTML = `
    <div class="cart-dialog-container">
      <div class="cart-dialog-container-top">
        <h3>CART(<span>${totalItems}</span>)</h3>
        <button id="removeAllBtn">Remove all</button>
      </div>
      <div class="cart-items">
        ${cart.map(x => `
            <div class="cart-item">
              <div class="cart-item-wrapper">
                <img src="..${x.image}">
                <div class="cart-item-wrapper-text">
                  <h3>${(x.name)}</h3>
                  <p>$ ${(x.price) }</p>
                </div>
              </div>
              <div class="quantity-btn">
                <p class="minus-icon" data-name="${x.name}">-</p>
                <p class="quantity">${x.quantity}</p>
                <p class="plus-icon" data-name="${x.name}">+</p>
              </div>
            </div>
          `)}
      </div>
      <div class="total-price">
        <p>TOTAL</p>
        <p class="price">$ ${totalPrice}</p>
      </div>
      <a href="checkout.html" class="btn">CHECKOUT</a>
    </div>
  `
  const minusIcons = document.querySelectorAll('.minus-icon');
  for (const minusIcon of minusIcons) {
    minusIcon.addEventListener('click', (e) => {
      const selectedItem = cart.findIndex(x => x.name === e.target.dataset.name);
      if(cart[selectedItem].quantity === 1){
        cart.splice(selectedItem, 1);
        localStorage.cart = JSON.stringify(cart);
        renderCart();
      } else{
        cart[selectedItem].quantity = cart[selectedItem].quantity - 1;
        localStorage.cart = JSON.stringify(cart);
        renderCart();
      }
    })
  }

  const plusIcons = document.querySelectorAll('.plus-icon');
  for (const plusIcon of plusIcons) {
    plusIcon.addEventListener('click', (e) => {
      const selectedItem = cart.findIndex(x => x.name === e.target.dataset.name);
      cart[selectedItem].quantity = cart[selectedItem].quantity + 1;
      localStorage.cart = JSON.stringify(cart);
      renderCart();
    })
  }

  removeAllBtn.addEventListener('click', () => {
    if(confirm('Silmek istediğinize emin misiniz?')){
      localStorage.cart = JSON.stringify([]);
      cartDialog.close();
    }
  })
}

function showHamburgerMenu(e){
  e.preventDefault();
  hamburgerMenu.showModal();
}

init();




async function getData() {
  const data = await fetch("../../data.json").then((r) => r.json());
  renderCategories(data);
  const product = location.href.split("#")[1].slice(1);
  const selectedProduct = data.find((x) => x.slug === product);
  renderProduct(selectedProduct);
}

function init() {
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", showCart);
  goBackBtn.addEventListener("click", goBack);
  getData();
  cartDialog.addEventListener("click", (e) => {
    const cartContainer = document.querySelector(".cart-dialog-container");
    const isInsideCart = cartContainer.contains(e.target);
    const isPlusOrMinus =
      e.target.classList.contains("plus-icon") ||
      e.target.classList.contains("minus-icon");

    if (!isInsideCart && !isPlusOrMinus) {
      cartDialog.close();
    }
  });
  hamburgerMenuBtn.addEventListener('click', showHamburgerMenu);
  hamburgerMenu.addEventListener('click', (e) => {
    if (!document.querySelector('.hamburgermenu-container').contains(e.target)) {
      hamburgerMenu.close();
    }
  });
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
  ).join('');
  hamburgerMenu.innerHTML = `
  <div class="hamburgermenu-container">
    ${categoryItems.map(
    (x) =>
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

function renderProduct(product) {
  const productDetailItem = document.querySelector(".product-detail-item");
  productDetailItem.innerHTML = `
        <img class="icategory-page-preview__mobile" src="..${
          product.image.mobile
        }" alt="Product Img">
        <img src="..${product.image.desktop}" alt="">
        <div class="product-detail-text">
          ${product.isNew ? " <h4>New Product</h4> " : ""}
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <h5>$ ${product.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}</h5>
          <div class="product-detail-text__button">
            <div class="quantity">
              <button id="decreaseBtn">−</button>
              <span id="quantityBtn">1</span>
              <button id="increaseBtn">+</button>
          </div>
            <a id="addToCartBtn" class="btn" href="#">ADD TO CART</a>
          </div>
  `;

  increaseBtn.addEventListener('click', () => {
   let newQuantity = Number(quantityBtn.innerText) + 1;
   quantityBtn.innerText = newQuantity;
  });

  decreaseBtn.addEventListener('click', () => {
    if(Number(quantityBtn.innerText) !== 1) {
      let newQuantity = Number(quantityBtn.innerText) - 1;
      quantityBtn.innerText = newQuantity;
    }
  })
  
  addToCartBtn.addEventListener("click", (e) => addToCart(e, product));

  

  const productFeatures = document.querySelector(".product-features");
  productFeatures.innerHTML = `
        <div class="product-features-wrapper">
          <h2>Features</h2>
          <p class="product-features-text">
          ${product.features}
          </p>
        </div>
        <div class="product-features-box">
          <h2>In the box</h2>
          <div class="product-features-box__item">
            ${product.includes
              .map((x) => `<span><p>${x.quantity}x</p><p>${x.item}</p></span>`)
              .join("")}
          </div>
        </div>
  `;

  const productDetailImages = document.querySelector(".product-detail-images");
  productDetailImages.innerHTML = product.gallery
    .map(
      (x) => `
  <img class="detail-images-grid" src="..${x.desktop}" alt="1x">
  `
    )
    .join("");

  const productAlsoLike = document.querySelector(".product-also-like");
  productAlsoLike.innerHTML = `
    <div class="also-like-item">
      <h3>YOU MAY ALSO LIKE</h3>
      <div class="product-also-like-item-container">  
      ${product.others.map(x =>
        `
            <div class="product-also-like-item">
              <img class="alsolike-img__mobile" src="..${x.image.mobile}" alt="">
              <img class="alsolike-tablet"  src="..${x.image.tablet}" alt="">
              <img class="alsolike-desktop" src="..${x.image.desktop}" alt="">
              <h3>${x.name}</h3>
              <a id="productBtn" href="product-detail.html#/${x.slug}">SEE PRODUCT</a>
            </div>
        `
        )
      .join("")} 
      </div>
    </div>`;
  window.addEventListener("hashchange", function () {
    location.reload();
    window.scrollTo(0, 0);
  });
}

function addToCart(e, product) {
  e.preventDefault();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedProductIndex = cart.findIndex((x) => x.name === product.name);
  if (selectedProductIndex === -1) {
    cart.push({
      name: product.name,
      image: product.image.desktop,
      price: product.price,
      quantity: Number(quantityBtn.innerText),
    });
  } else {
    cart[selectedProductIndex].quantity += Number(quantityBtn.innerText);
  }
  localStorage.cart = JSON.stringify(cart);
  console.log(cart);
}

function goBack(e) {
  e.preventDefault();
  window.history.back();
}

function showCart(e) {
  e.preventDefault();
  cartDialog.showModal();
  renderCart();
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;
  let totalItems = 0;
  for (const item of cart) {
    totalPrice = totalPrice + item.price * item.quantity;
    totalItems = totalItems + item.quantity;
  }
  cartDialog.innerHTML = `
    <div class="cart-dialog-container">
      <div class="cart-dialog-container-top">
        <h3>CART(<span>${totalItems}</span>)</h3>
        <button id="removeAllBtn">Remove all</button>
      </div>
      <div class="cart-items">
        ${cart.map(
          (x) => `
            <div class="cart-item">
              <div class="cart-item-wrapper">
                <img src="..${x.image}">
                <div class="cart-item-wrapper-text">
                  <h3>${x.name}</h3>
                  <p>$ ${x.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
              <div class="quantity-btn">
                <p class="minus-icon" data-name="${x.name}">-</p>
                <p class="quantity">${x.quantity}</p>
                <p class="plus-icon" data-name="${x.name}">+</p>
              </div>
            </div>
          `
        )}
      </div>
      <div class="total-price">
        <p>TOTAL</p>
        <p class="price">$ ${totalPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
      </div>
      <a href="checkout.html" class="btn">CHECKOUT</a>
    </div>
  `;
  const minusIcons = document.querySelectorAll(".minus-icon");
  for (const minusIcon of minusIcons) {
    minusIcon.addEventListener("click", (e) => {
      const selectedItem = cart.findIndex(
        (x) => x.name === e.target.dataset.name
      );
      if (cart[selectedItem].quantity === 1) {
        cart.splice(selectedItem, 1);
        localStorage.cart = JSON.stringify(cart);
        renderCart();
      } else {
        cart[selectedItem].quantity = cart[selectedItem].quantity - 1;
        localStorage.cart = JSON.stringify(cart);
        renderCart();
      }
    });
  }

  const plusIcons = document.querySelectorAll(".plus-icon");
  for (const plusIcon of plusIcons) {
    plusIcon.addEventListener("click", (e) => {
      const selectedItem = cart.findIndex(
        (x) => x.name === e.target.dataset.name
      );
      cart[selectedItem].quantity = cart[selectedItem].quantity + 1;
      localStorage.cart = JSON.stringify(cart);
      renderCart();
    });
  }

  removeAllBtn.addEventListener("click", () => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      localStorage.cart = JSON.stringify([]);
      cartDialog.close();
    }
  });
}

function showHamburgerMenu(e) {
  e.preventDefault();
  hamburgerMenu.showModal();
}

init();

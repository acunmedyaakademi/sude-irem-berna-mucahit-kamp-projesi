async function getData() {
  const data = await fetch("../../data.json").then((r) => r.json());
  renderCategories(data);
  const product = location.href.split("#")[1].slice(1);
  const selectedProduct = data.find((x) => x.slug === product);
  renderProduct(selectedProduct);
}

function renderCategories(categories) {
  const categoriesContainer = document.querySelector(".categories");
  const categoryNames = new Set(categories.map((x) => x.category));
  let categoryItems = [];
  for (const x of categoryNames) {
    categoryItems.push(categories.find((category) => category.category === x));
  }
  categoriesContainer.innerHTML = categoryItems.map(
    (x) =>
      `
      <div class="category-item">
        <img class="category-img" src="..${x.categoryImage.svg}" alt="Speakers Img">
        <h3>${x.category}</h3>
        <a id="speakers-pages" href="../pages/${x.category}.html">Shop<img src="/assets/home/mobile/right.svg" alt=""></a>
      </div>
    `
  );
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
          <h5>$ ${product.price}</h5>
          <div class="product-detail-text__button">
            <div class="quantity">
              <button id="decreaseBtn">−</button>
              <span id="quantityBtn">1</span>
              <button id="increaseBtn">+</button>
          </div>
            <a id="addToCartBtn" class="btn" href="#">ADD TO CART</a>
          </div>
  `;

  increaseBtn.addEventListener("click", () => {
    let newQuantity = Number(quantityBtn.innerText) + 1;
    quantityBtn.innerText = newQuantity;
  });

  decreaseBtn.addEventListener("click", () => {
    if (Number(quantityBtn.innerText) !== 1) {
      let newQuantity = Number(quantityBtn.innerText) - 1;
      quantityBtn.innerText = newQuantity;
    }
  });

  addToCartBtn.addEventListener("click", (e) => addToCart(e, product));

  const productFeatures = document.querySelector(".product-features");
  productFeatures.innerHTML = `
        <div class="product-features-text">
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
  productDetailImages.innerHTML = product.gallery.map(
    (x) => `
  <img class="detail-images-grid" src="..${x.desktop}" alt="1x">
  `
  );

  const productAlsoLike = document.querySelector(".product-also-like");
  productAlsoLike.innerHTML = `
   <h3>YOU MAY ALSO LIKE</h3>
  ${product.others
    .map(
      (x) => `
           
     <div class="product-also-like-item">
          <img src="..${x.image.desktop}" alt="">
          <h3>${x.name}</h3>
          <a id="productBtn" href="product-detail.html#/${x.slug}">See Product</a>
        </div>
    `
    )
    .join("")}`
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
    cart[selectedProductIndex].quantity += 1;
  }
  localStorage.cart = JSON.stringify(cart);
  console.log(cart);
}

function goBack(e) {
  e.preventDefault();
  window.history.back();
}
goBackBtn.addEventListener("click", goBack);
getData();

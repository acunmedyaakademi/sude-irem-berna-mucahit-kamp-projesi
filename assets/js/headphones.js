// const category = "headphones"

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
        <h3>${x.category}</h3>
        <a id="speakers-pages" href="./${x.category}.html">Shop<img src="/assets/home/mobile/right.svg" alt=""></a>
      </div>
    `
  )
}

function btnFunctionalities() {
  const cartBtn = document.querySelector(".cart-icon");
  const cartDialog = document.querySelector("#cart-dialog");

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartDialog.showModal();
  })
}

render();

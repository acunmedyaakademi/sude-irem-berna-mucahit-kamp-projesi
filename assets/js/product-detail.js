async function getData() {
  const data = await fetch('../../data.json').then(r => r.json());
  renderCategories(data);
  const product = location.href.split("#")[1].slice(1);
  const selectedProduct = data.find(x => x.slug === product);
  renderProduct(selectedProduct);
}

function renderCategories(categories){
  const categoriesContainer = document.querySelector('.categories');
  const categoryNames = new Set(categories.map(x => x.category));
  let categoryItems = [];
  for (const x of categoryNames) {
    categoryItems.push(categories.find(category => category.category === x));
  }
  categoriesContainer.innerHTML = categoryItems.map(x => 
    `
      <div class="category-item">
        <img class="category-img" src="..${x.categoryImage.svg}" alt="Speakers Img">
        <h3>${x.category}</h3>
        <a id="speakers-pages" href="../pages/${x.category}.html">Shop<img src="/assets/home/mobile/right.svg" alt=""></a>
      </div>
    `
  )
}

function renderProduct(product){

  addToCart(e, product);
}

function addToCart(e, product){
  e.preventDefault();
  let cart = JSON.parse(localStorage.cart) || [];
  const selectedProductIndex = cart.findIndex(x => x.id === product.id);
  if(selectedProductIndex === -1){
    cart.push({
      name: product.name,
      image: product.image.desktop,
      price: product.price,
      quantity: 1
    });
  } else{
    cart[selectedProductIndex].quantity = cart[selectedProductIndex].quantity + 1;
  }
  localStorage.cart = JSON.stringify(cart);
}

getData();

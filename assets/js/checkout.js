function init(){
  renderSummary();
  eMoney.payment.addEventListener('click', selectPaymentMethod);
  cash.payment.addEventListener('click', selectPaymentMethod);
}

function renderSummary(){
  const cart = JSON.parse(localStorage.cart) || [];
  let totalPrice = 0;
  const shippingPrice = 50;
  for (const item of cart) {
    totalPrice = totalPrice + item.price;
  }
  const vat = totalPrice * 0.25;
  const checkoutSummary = document.querySelector('.checkout-summary');
  checkoutSummary.innerHTML = `
          <h3>SUMMARY</h3>
          <div class="checkout-item-container">
            ${cart.map(x => `
              <div class="checkout-item">
                <div class="checkout-item-wrapper">
                  <img src="..${x.image}">
                  <div class="checkout-product-detail">
                    <h4>${x.name}</h4>
                    <p>$${x.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
                <p class="quantity">x${x.quantity}</p>
              </div>`)}
          </div>
          <div class="checkout-details">
            <div class="checkout-details-item">
              <p>TOTAL</p>
              <p class="price">$ ${totalPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
            <div class="checkout-details-item">
              <p>SHIPPING</p>
              <p class="price">$ ${shippingPrice}</p>
            </div>
            <div class="checkout-details-item">
              <p>VAT (INCLUDED)</p>
              <p class="price">$ ${vat.toFixed(0).toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
            <div class="checkout-details-item total">
              <p>GRAND TOTAL</p>
              <p class="price">$ ${(shippingPrice + totalPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
            <a href="#" class="btn" id="payBtn">CONTINUE & PAY</a>
          </div>`
  payBtn.addEventListener('click', completeOrder);
}

function selectPaymentMethod(){
  const paymentMethod = document.querySelector('.payment-method');
  if(eMoney.payment.checked){
    paymentMethod.innerHTML = `<div class="e-money-details">
                <div class="e-money-details-item">
                  <p>e-Money Number</p>
                  <input type="number" placeholder="238521993">
                </div>
                <div class="e-money-details-item">
                  <p>e-Money Pin</p>
                  <input type="number" placeholder="6891">
                </div>
              </div> `
  } else if(cash.payment.checked){
    paymentMethod.innerHTML = `<div class="cash-on-delivery">
                <img src="../shared/desktop/delivery-icon.svg">
                <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
              </div>`
  }
}

function completeOrder(e){
  e.preventDefault();
  const inputs = document.querySelectorAll('.checkout-input');
  let hasEmptyInput = false;
  for (const input of inputs) {
    input.addEventListener('input', () => {
      const inputName = input.dataset.input;
      const emptyInput = document.querySelector(`.${inputName}`);
      emptyInput.classList.remove('error');
    })
    if(input.value.trim() === ''){
      const inputName = input.dataset.input;
      const emptyInput = document.querySelector(`.${inputName}`);
      emptyInput.classList.add('error');
      hasEmptyInput = true;
    } else if(input.dataset.input === 'email-input' && !input.value.includes('@')){
      document.querySelector('.email-error-text').innerText = 'Wrong format';
      const inputName = input.dataset.input;
      const emptyInput = document.querySelector(`.${inputName}`);
      emptyInput.classList.add('error');
      hasEmptyInput = true;
    }
  }
  if(hasEmptyInput) return;
  orderCompletedDialog.showModal();
  renderOrders();
  backToHomeBtn.addEventListener('click', () => {
    localStorage.cart = [];
  })
}

function renderOrders(){
  const cart = JSON.parse(localStorage.cart) || [];
  let totalPrice = 0;
  const shippingPrice = 50;
  for (const item of cart) {
    totalPrice = totalPrice + item.price;
  }
  const orderItemsContainer = document.querySelector('.order-details-top');
  orderItemsContainer.innerHTML = `
    <div class="checkout-items">
      <div class="checkout-item">
        <div class="checkout-item-wrapper">
            <img src="..${cart[0].image}" alt="">
            <div class="checkout-product-detail">
              <h4>${cart[0].name}</h4>
              <p>$ ${cart[0].price.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        <p class="quantity">x${cart[0].quantity}</p>
      </div>
    </div>
    <span class="divider"></span>
    <p class="more-items" id="viewMoreBtn">and <span>${cart.length - 1}</span> other item(s)</p>
  `
  viewMoreBtn.addEventListener('click', viewMore);
  const totalOrderPrice = document.querySelector('.order-details-total');
  totalOrderPrice.innerHTML = `
    <p>GRAND TOTAL</p>
    <p class="price">$ ${(shippingPrice + totalPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
  `
}

function viewMore(){
  const cart = JSON.parse(localStorage.cart) || [];
  const orderItemsContainer = document.querySelector('.order-details-top');
  orderItemsContainer.innerHTML = `
    <div class="checkout-items">
      ${cart.map(x => `
          <div class="checkout-item">
            <div class="checkout-item-wrapper">
                <img src="..${x.image}" alt="">
                <div class="checkout-product-detail">
                  <h4>${x.name}</h4>
                  <p>$ ${x.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            <p class="quantity">x${x.quantity}</p>
          </div>
        `)}
    </div>
    <span class="divider"></span>
    <p class="more-items" id="viewMoreBtn">View less</p>
  `
  viewMoreBtn.addEventListener('click', renderOrders);
}

init();


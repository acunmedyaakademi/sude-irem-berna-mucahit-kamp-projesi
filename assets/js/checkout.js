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


eMoney.payment.addEventListener('click', selectPaymentMethod);
cash.payment.addEventListener('click', selectPaymentMethod);
payBtn.addEventListener('click', )


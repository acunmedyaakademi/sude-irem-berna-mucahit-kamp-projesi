// const headphonespages = document.querySelector("#headphones-pages");
// const speakerspages = document.querySelector("#speakers-pages");
// const earphonespages = document.querySelector("#earphones-pages");

// if (headphonespages) {
//     headphonespages.addEventListener("click", function () {
//       console.log("Headphones link tıklandı"); 
//         window.location.href = "/assets/pages/headphones.html";
//     });
// }

// if (speakerspages) {
//     speakerspages.addEventListener("click", function () {
//       console.log("speakers link tıklandı"); 
//         window.location.href = "/assets/pages/speakers.html";
//     });
// }

// if (earphonespages) {
//     earphonespages.addEventListener("click", function () {
//       console.log("earphones link tıklandı"); 
//         window.location.href = "/assets/pages/earphones.html";
//     });
// }




const productDetail = document.querySelector('#seeProductBtn');

productDetail.addEventListener('click', handleClickDetail);

function handleClickDetail() {
  window.location.href = "./assets/pages/product-detail.html"
}







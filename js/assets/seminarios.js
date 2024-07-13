import { seminarioDB } from "./login.js";
import { openWasap } from "../main.js";

const descriptionCard = document.getElementById("descriptionCardA");
const semPrices = document.getElementById("pricesSeminarios");
const schedSem = document.getElementById("scheduleSeminarios");

console.log(seminarioDB);

if (descriptionCard) {
  descriptionCard.innerHTML = `
        <h2>${seminarioDB.title}</h2>
        <div class="courses__description--tittle">
          <img src="${seminarioDB.thumbnail}" alt="" />
        </div>
        <p class="seminario-p">${seminarioDB.description}</p>
    `;
}

if (semPrices) {
  semPrices.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	<div class="price-container">
		<p id="long0"><span>Seminario: <span>$ ${seminarioDB.totalPrice}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>${seminarioDB.optionNamePrice}:</span> <span>$ ${seminarioDB.optionprice}</span></p>
	</div>
	
	<div class="btn-container">
	
		<button class="btn" id="semWasapBtn">Escribinos</button>
	</div>
	<a class="courses__description--test" href="./test-de-nivel.html">Test de nivel gratuito!</a>
</div>
	`;

  const button = document.getElementById("semWasapBtn");
  if (button) {
    button.addEventListener("click", () => openWasap());
  }
}

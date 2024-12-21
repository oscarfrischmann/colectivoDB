import * as login from "./login.js";
import { openWasap } from "../main.js";

const priceIND = document.getElementById("prices-ind");
const individualPrices = await login.priceIndDB();
priceIND.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	
	<div class="price-container">
		<p id="long0"><span>Pago por hora: <span>$ ${individualPrices.priceInd}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>Pack 8 horas:</span> <span>$ ${individualPrices.pricePack}</span></p>
	</div>
	
	<div class="btn-container">
	
		<button class="btn" id="individualsWasapBtn">Escribinos</button>
	</div>
	<span class="courses__description--test">Escribinos para solicitar un test de nivel!</span>
</div>
	`;

const button = document.getElementById("individualsWasapBtn");
if (button) {
  button.addEventListener("click", () => openWasap());
}

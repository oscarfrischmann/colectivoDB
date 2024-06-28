import * as login from "./login.js";
import { openWasap } from "../main.js";
const monthlyPayTalleres = login.pricesDBtalleres.monthly;
const biMonthlyPayTalleres = login.pricesDBtalleres.course;

const price = document.getElementById("pricesTalleres");
price.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	
	<div class="price-container">
		<p id="long0"><span>Pago mensual: <span>$ ${monthlyPayTalleres}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>Pago bimensual:</span> <span>$ ${biMonthlyPayTalleres}</span></p>
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

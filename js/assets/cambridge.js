import * as login from "./login.js";
import { openWasap } from "../main.js";

const cambridgePrices = await login.priceCamb();
const priceCamb = document.getElementById("pricesCamb");
priceCamb.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	
	<div class="price-container">
		<p id="long0"><span>Pago mensual: <span>$ ${cambridgePrices.monthlyCamb}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>Pago curso completo:</span> <span>$ ${cambridgePrices.courseCamb}</span></p>
	</div>
	
	<div class="btn-container">
	
		<button class="btn" id="individualsWasapBtn">Escribinos</button>
	</div>
	
</div>
	`;

const cambridgeSchedule = await login.getCambSchedule();
const button = document.getElementById("individualsWasapBtn");
if (button) {
  button.addEventListener("click", () => openWasap());
}
const schedule = document.getElementById("scheduleCamb");
cambridgeSchedule.cambSchedule.forEach((courses, i) => {
  schedule.innerHTML += `
	<div class="price-container">
	<span class="sc1">${courses.name} </span>
	<span class="sc2">${courses.date} </span>
	<ruby class="sc3">${courses.time}<rt>${courses.day}</rt> </ruby>
	</div>
	`;
});

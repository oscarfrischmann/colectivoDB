import { getSeminario } from "./login.js";
import { openWasap } from "../main.js";

const descriptionCard = document.getElementById("descriptionCardA");
const semPrices = document.getElementById("pricesSeminarios");
const schedSem = document.querySelector("#scheduleSeminarios div");
const seminario = await getSeminario();

if (descriptionCard) {
  descriptionCard.innerHTML = `
        <h2>${seminario.title}</h2>
        <div class="courses__description--tittle">
          <img src="${seminario.thumbnail}" style="box-shadow: 2px 2px 10px; border-radius: 3px" alt="Imagen relativa al tipo de seminario" />
        </div>
        <p class="seminario-p">${seminario.description}</p>
    `;
}

if (semPrices) {
  semPrices.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	<div class="price-container">
		<p id="long0"><span>Seminario: <span>$ ${seminario.totalPrice}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>${seminario.optionNamePrice}:</span> <span>$ ${seminario.optionprice}</span></p>
	</div>
	
	<div class="btn-container">
	
		<button class="btn" id="semWasapBtn">Escribinos</button>
	</div>
	<a class="courses__description--test" href="./test-de-nivel.html">Test de nivel gratuito!</a>
</div>
	`;

  if (schedSem) {
    schedSem.innerHTML = `
    <p class="sem_duration">${seminario.duration}</p>
    <p class="sem_day">${seminario.day}</p>
    <p class="sem_hour">${seminario.hour}</p>
    `;
  }

  const button = document.getElementById("semWasapBtn");
  if (button) {
    button.addEventListener("click", () => openWasap());
  }
}

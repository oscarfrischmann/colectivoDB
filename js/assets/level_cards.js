import { openWasap } from "../main.js";
import * as login from "./login.js";

console.log(login.getNewGeneralPricesDB);
const coursesArr = [];
const descriptionsBeguiner = [
  "Aprendé Inglés desde cero.",
  "Hablá desde el primer dia.",
  "Grupos reducidos.",
  "Material de estudio y práctica incluido.",
];
const descriptionsInter = [
  "Mejorá tu nivel de inglés.",
  "Foco en la comunicación.",
  "Grupos reducidos.",
  "Material de estudio y práctica incluido.",
];
const descriptionsAdv = [
  "Perfeccioná tu inglés.",
  "Desarrollá habilidades profesionales de conversación.",
  "Grupos reducidos.",
  "Material de estudio y práctica incluido.",
];

class Level {
  constructor(tittle, level, names, description) {
    this.tittle = tittle;
    this.level = level;
    this.names = names;
    this.description = description;
  }
}

coursesArr.push(
  new Level("nivel", "principiante", "a1/a2", descriptionsBeguiner)
);
coursesArr.push(new Level("nivel", "intermedio", "b1/b2", descriptionsInter));
coursesArr.push(new Level("nivel", "avanzado", "c1/c2", descriptionsAdv));

console.log(coursesArr);

const cardContainer = document.getElementById("cardContainer");
const price1 = login.getNewGeneralPricesDB.valueOne;
console.log(price1);
const price = document.getElementById("prices");
price.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	
	<div class="price-container">
		<p id="long0"><span>${login.getNewGeneralPricesDB.typeOne}:</span> <span> ${login.getNewGeneralPricesDB.valueOne}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>${login.getNewGeneralPricesDB.typeTwo}:</span> <span>${login.getNewGeneralPricesDB.valueTwo}</span></p>
	</div>
	
	<div class="btn-container">
	
		<button class="btn" id="individualsWasapBtn">Escribinos</button>
	</div>
	<span class="courses__description--test"><a href="./test-de-nivel.html">Test de nivel</a></span>
</div>
	`;
console.log(login.courseScheduleDB2);
const schedule = document.getElementById("coursesSchedule");
login.courseScheduleDB2.coursesSchedule.forEach((courses, i) => {
  schedule.innerHTML += `
	<div class="price-container">
	<span class="sc1">${courses.name} </span>
	<span class="sc2">${courses.date} </span>
	<ruby class="sc3">${courses.time}<rt>${courses.day}</rt> </ruby>
	</div>
	`;
});
const button = document.getElementById("individualsWasapBtn");
if (button) {
  button.addEventListener("click", () => openWasap());
}

const coursesDescriptionCard = document.querySelector("#descriptionCardA ul");
console.log(coursesDescriptionCard);

if (coursesDescriptionCard) {
  coursesDescriptionCard.innerHTML = "";
  login.coursesDescription.description.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text.li;
    coursesDescriptionCard.appendChild(li);
  });
}

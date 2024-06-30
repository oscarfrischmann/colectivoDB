import * as login from './login.js';
import { openWasap } from '../main.js';
const monthlyPayTalleres = login.pricesDBtalleres.monthly;
const biMonthlyPayTalleres = login.pricesDBtalleres.course;

const price = document.getElementById('pricesTalleres');
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
	
</div>
	`;

const button = document.getElementById('individualsWasapBtn');
if (button) {
	button.addEventListener('click', () => openWasap());
}
const schedule = document.getElementById('coursesSchedule');
login.talleresScheduleDB.talleresCoursesSchedule.forEach((courses, i) => {
	schedule.innerHTML += `
	<div class="price-container">
	<span class="sc1">${courses.name} </span>
	<span class="sc2">${courses.date} </span>
	<ruby class="sc3">${courses.time}<rt>${courses.day}</rt> </ruby>
	</div>
	`;
});

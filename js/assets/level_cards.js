// import { courseScheduleDB, pricesDB } from "./login.js";
import { openWasap } from "../main.js";
import * as login from "./login.js";

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

//! Cards Deleted by client
// coursesArr.forEach((e, i) => {
// 	const card = document.createElement('div');
// 	card.classList.add(`card${i}`);
// 	card.classList.add(`display-none`);

// 	const cardTittle = document.createElement('div');
// 	cardTittle.classList.add('card__tittle');
// 	const cardTittleOne = document.createElement('h4');
// 	cardTittleOne.classList.add('card__tittle--one');
// 	const cardTittleTwo = document.createElement('h5');
// 	cardTittleTwo.classList.add('card__tittle--two');
// 	const cardCourseNames = document.createElement('div');
// 	cardCourseNames.classList.add('card__course-names');
// 	const bubbleImg = document.createElement('img');
// 	bubbleImg.setAttribute('src', '../img/burbuja-rosa.png');
// 	const courseName = document.createElement('span');
// 	const courseDescriptionUList = document.createElement('ul');
// 	const cardImgBtn = document.createElement('div');
// 	cardImgBtn.classList.add('card__img-btn');
// 	const catImg = document.createElement('img');
// 	catImg.setAttribute('src', '../img/gatito.png');
// 	const cardButton = document.createElement('button');
// 	cardButton.classList.add('btn');
// 	const div = document.querySelectorAll('.courses__description--card');
// 	div[i].insertAdjacentElement('beforebegin', card);
// 	card.appendChild(cardTittle);
// 	cardTittle.appendChild(cardTittleOne).innerHTML = e.tittle;
// 	cardTittle.appendChild(cardTittleTwo).innerHTML = e.level;
// 	card.appendChild(cardCourseNames);
// 	cardCourseNames.appendChild(bubbleImg);
// 	cardCourseNames.appendChild(courseName).innerHTML = e.names;
// 	card.appendChild(courseDescriptionUList);
// 	e.description.forEach((el) => {
// 		const courseDescriptionItem = document.createElement('li');
// 		courseDescriptionUList.appendChild(courseDescriptionItem).innerHTML = el;
// 	});

// 	card.appendChild(cardImgBtn);
// 	cardImgBtn.appendChild(catImg);
// 	cardImgBtn.appendChild(cardButton).textContent = 'ver más';
// 	cardButton.setAttribute('id', `courseBtn${i}`);
// });
//!End card deleted

// const btn0 = document.getElementById('courseBtn0');
// // const btn1 = document.getElementById('courseBtn1');
// // const btn2 = document.getElementById('courseBtn2');

// function showCourseDescription(index, descriptionCard) {
// 	const card0 = document.getElementsByClassName(`card${index}`);
// 	card0[0].classList.add('opacity1');
// 	setTimeout(() => card0[0].classList.add('display-none'), 1000);
// 	const descriprionCardA = document.getElementById(descriptionCard);
// 	setTimeout(() => {
// 		descriprionCardA.classList.remove('display-none');
// 		descriprionCardA.classList.add('opacity0');
// 	}, 1000);
// }

// btn0.addEventListener('click', () => showCourseDescription('0', 'descriptionCardA'));
// btn1.addEventListener('click', () => showCourseDescription('1', 'descriptionCardB'));
// btn2.addEventListener('click', () => showCourseDescription('2', 'descriptionCardC'));

// const showPriceBtn = document.get('.courses__description--card .btn.precios');
// console.log(showPriceBtn);
// const hideDescriptionCard = document.querySelectorAll('.courses__description--card');
// const short = '1.15';
console.log(login.pricesDB);
let monthlyPay = login.pricesDB.monthly;
let coursePay = login.pricesDB.course;

const price = document.getElementById("prices");
price.innerHTML = `
<div class="courses__description--price">
<h2>Precios</h2>
	
	<div class="price-container">
		<p id="long0"><span>Pago mensual: <span>$ ${monthlyPay}</span></p>
	</div>
	<div class="price-container">
		<p id="long0"><span>Pago cuatrimestral:</span> <span>$ ${coursePay}</span></p>
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
/* <div class="price-container">
			<p id="long0">
				<span>${course.name}: <span>$ ${course.date}</span> <span>${course.time}</span>
			</p>
		</div> */

// showPriceBtn.forEach((e, i) => {
// 	showPriceBtn[i].addEventListener('click', () => {
// 		// monthPriceShort = '8000';
// 		monthPriceLong = '11400';
// 		hideDescriptionCard[i].innerHTML = `
//         <div class="opacity0 courses__description--price">
//             <h2>Cursos<br><span>de inglés general</span></h2>
//             <img src="../img/colectivo-amarillo.png">
//             <p class="paragraph" id="paragraph${i}">Todos los cursos de Inglés general duran 4 meses con los siguientes precios por mes expresados en pesos argentinos.</p>
//             <div class="price-container">
//                 <p id="long${i}"><span>${long}</span>hs por semana: <span>${monthPriceLong}</span></p>
//                 <button id="showDiscountLong${i}">%</button>
//             </div>
//             <div class="checkbox">
//                 <span class="checkbox__span">Ver precio en USD</span>
//                 <input type="checkbox" id="showUsdPrices${i}">
//             </div>
//             <div class="btn-container">
//                 <button class="btn">Home</button>
//                 <button class="btn">Escribinos</button>
//             </div>
//         </div>
//             `;
// 		const paragraph = document.getElementById(`paragraph${i}`);
// 		const longCourse = document.getElementById(`long${i}`);
// 		const showDiscountLong = document.getElementById(`showDiscountLong${i}`);
// 		const showUsdPrices = document.getElementById(`showUsdPrices${i}`);
// 		const btn = document.querySelectorAll('.btn-container .btn');

// 		btn.forEach((e, i) => {
// 			if (i % 2 === 0) {
// 				btn[i].addEventListener(
// 					'click',
// 					() => (window.location.href = '../index.html')
// 				);
// 			} else {
// 				btn[i].addEventListener('click', () => openWasap());
// 			}
// 		});

// 		const changePrices = function (monthly, quarterly, paragraphContent) {
// 			// let monthPriceShort = '31000';
// 			// let monthPriceLong = '37000';
// 			paragraph.textContent = paragraphContent;
// 			// shortCourse.innerHTML = `<span>${short}</span>hs por semana: <span>${monthly}</span>`;
// 			longCourse.innerHTML = `<span>${long}</span>hs por semana: <span>${quarterly}</span>`;
// 			return true;
// 		};
// 		// showDiscountShort.addEventListener('click', () => {
// 		//     if (!showUsdPrices.checked && paragraph.textContent !== 'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.') {
// 		//         changePrices(31000, 37000, 'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.');
// 		//     } else if (!showUsdPrices.checked && paragraph.textContent === 'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.') {
// 		//         changePrices(8000, 9500, 'Todos los cursos de Inglés general duran 4 meses con los siguientes precios por mes expresados en pesos argentinos.')
// 		//     } else if (showUsdPrices.checked && paragraph.textContent !== 'Estos son los precios en dolares para quien quiera pagar por cuatrimestre.') {
// 		//         changePrices(110, 150, 'Estos son los precios en dolares para quien quiera pagar por cuatrimestre.')
// 		//     } else {
// 		//         changePrices(35, 45, 'Este precio es en dolares estadounidenses y pago menusal')
// 		//     }
// 		// })

// 		showDiscountLong.addEventListener('click', () => {
// 			if (
// 				!showUsdPrices.checked &&
// 				paragraph.textContent !==
// 					'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.'
// 			) {
// 				changePrices(
// 					31000,
// 					46000,
// 					'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.'
// 				);
// 			} else if (
// 				!showUsdPrices.checked &&
// 				paragraph.textContent ===
// 					'Este precio es para los que pagan el cuatrimestre completo en pesos argentinos.'
// 			) {
// 				changePrices(
// 					8000,
// 					11400,
// 					'Todos los cursos de Inglés general duran 4 meses con los siguientes precios por mes expresados en pesos argentinos.'
// 				);
// 			} else if (
// 				showUsdPrices.checked &&
// 				paragraph.textContent !==
// 					'Estos son los precios en dolares para quien quiera pagar por cuatrimestre.'
// 			) {
// 				changePrices(
// 					110,
// 					150,
// 					'Estos son los precios en dolares para quien quiera pagar por cuatrimestre.'
// 				);
// 			} else {
// 				changePrices(
// 					35,
// 					45,
// 					'Este precio es en dolares estadounidenses y pago menusal'
// 				);
// 			}
// 		});
// 		showUsdPrices.addEventListener('click', () => {
// 			if (showUsdPrices.checked) {
// 				console.log('checked');
// 				changePrices(
// 					35,
// 					45,
// 					'Este precio es en dolares estadounidenses y pago menusal'
// 				);
// 			} else {
// 				console.log('not checked');
// 				changePrices(
// 					8000,
// 					9500,
// 					'Todos los cursos de Inglés general duran 4 meses con los siguientes precios por mes expresados en pesos argentinos.'
// 				);
// 			}
// 		});
// 	});
// });

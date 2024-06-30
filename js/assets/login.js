import { sweetAlertSucces, sweetAlertError } from '../main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	doc,
	setDoc,
	deleteDoc,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

const firebaseConfig = {
	apiKey: 'AIzaSyAtQccyF0CBM-f9kRhY15B4E7tCpqLCmDs',
	authDomain: 'colectivo-de-idiomas.firebaseapp.com',
	projectId: 'colectivo-de-idiomas',
	storageBucket: 'colectivo-de-idiomas.appspot.com',
	messagingSenderId: '21235746434',
	appId: '1:21235746434:web:54c3b1e041f3fb0d94169b',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//SIGN IN
const login = document.getElementById('googleLogIn');
const logout = document.getElementById('googleLogOut');

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
let user;
let prevUser;
console.log(user);
onAuthStateChanged(auth, (user) => {
	if (user != null) {
		console.log('User Logged In');
		prevUser = user;
		console.log(user);
	} else {
		console.log('No User Logged In');
	}
});
if (login && logout) {
	login.addEventListener('click', async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				user = result.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				console.log(error);
			});
	});
	logout.addEventListener('click', () => {
		signOut(auth)
			.then(() => {
				console.log('Signed Out succesfully');
			})
			.catch((error) => {
				console.log('We couldn´t sign you Out', error);
			});
	});
}

//PRECIOS CURSOS DE INGLES GENERAL
const pricesFormDB = document.getElementById('pricesFormDB');
async function publishGeneralCoursesPricesDB(e) {
	e.preventDefault();
	try {
		const prices = {
			monthly: pricesFormDB['monthlyPay'].value,
			course: pricesFormDB['coursePay'].value,
		};
		await setDoc(doc(db, 'prices', 'generalCourses'), prices);
		await sweetAlertSucces('Precios de Cursos generales PUBLICADOS!');
		return prices;
	} catch (err) {
		sweetAlertError();
		throw new Error('puclishCoursePricesDB', err);
	}
}
if (pricesFormDB) {
	pricesFormDB.addEventListener('submit', await publishGeneralCoursesPricesDB);
}
console.log('Desde LOGIN');
//GET Precios Cursos generales en página
async function getPrices() {
	try {
		const pricesCol = doc(db, 'prices', 'generalCourses');
		const pricesSnapshot = await getDoc(pricesCol);
		const pricesList = pricesSnapshot.data();
		return pricesList;
	} catch (err) {
		throw new Error('get Docs', err);
	}
}
export const pricesDB = await getPrices();

//AGREGAR CURSOS DE INGLES GENERAL
const coursesScheduleDataDB2 = { coursesSchedule: [] };
const coursesForm = document.getElementById('coursesScheduleDB');
const addButton = document.getElementById('add');
if (addButton) {
	addButton.addEventListener('click', (e) => {
		e.preventDefault();
		const course = {
			name: coursesForm['name'].value,
			date: coursesForm['date'].value,
			day: coursesForm['day'].value,
			time: coursesForm['time'].value,
		};
		coursesScheduleDataDB2.coursesSchedule.push(course);
		console.log(coursesScheduleDataDB2);
		const showCourses = document.createElement('div');
		coursesForm.insertAdjacentElement('afterend', showCourses);
		coursesScheduleDataDB2.coursesSchedule.forEach((course) => {
			showCourses.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
			console.log(course);
		});
	});
}
//PUBLICAR CURSOS DE INGLES GENERAL
const publishSchedButton = document.getElementById('publishSchedButton');
if (publishSchedButton) {
	publishSchedButton.addEventListener('click', async (e) => {
		e.preventDefault();
		try {
			await setDoc(doc(db, 'coursesSchedule', 'coursesSchedule'), coursesScheduleDataDB2);
			await sweetAlertSucces('Cursos generales PUBLICADOS!');
		} catch (err) {
			sweetAlertError('ERROR!');
			throw new Error('publish courses', err);
		}
	});
}

async function getCoursesSchedule() {
	try {
		const courseSshedulesCol = doc(db, 'coursesSchedule', 'coursesSchedule');
		const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);
		const courseSshedulesList = courseSshedulesSnapshot.data();
		return courseSshedulesList;
	} catch (err) {
		throw new Error('get CoursesShedule', err);
	}
}
export const courseScheduleDB2 = await getCoursesSchedule();

//*Clases INDIVIDUALES
const individualCourseForm = document.getElementById('individualCourse');
if (individualCourseForm) {
	individualCourseForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		try {
			const priceInd = {
				priceInd: individualCourseForm['individual'].value,
				pricePack: individualCourseForm['pack8'].value,
			};
			await setDoc(doc(db, 'prices', 'individualPrice'), priceInd);
			sweetAlertSucces('Precio Clases Individuales PUBLICADO!');
			return priceInd;
		} catch (err) {
			sweetAlertError('ERROR!');
			throw new Error('clases individuales', err);
		}
	});
}

const priceIndDB = async () => {
	try {
		const newIndPriceDB = doc(db, 'prices', 'individualPrice');
		const newIndPriceSnap = await getDoc(newIndPriceDB);
		const newPriceDB = newIndPriceSnap.data();
		return newPriceDB;
	} catch (err) {
		throw new Error('get individual price', err);
	}
};

export const newPriceIndDB = await priceIndDB();
console.log(newPriceIndDB);

//*CAMBRIDGE
//*test
const cambScheduleDataDB2 = { cambSchedule: [] };
const cambForm = document.getElementById('cambScheduleDB');
const addCambButton = document.getElementById('addCamb');
if (addCambButton) {
	addCambButton.addEventListener('click', (e) => {
		e.preventDefault();
		const course = {
			name: cambForm['name'].value,
			date: cambForm['date'].value,
			day: cambForm['day'].value,
			time: cambForm['time'].value,
		};
		cambScheduleDataDB2.cambSchedule.push(course);
		console.log(cambScheduleDataDB2);
		const showcamb = document.createElement('span');
		cambForm.insertAdjacentElement('afterend', showcamb);
		cambScheduleDataDB2.cambSchedule.forEach((course) => {
			showcamb.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
			console.log(course);
		});
	});
}
//*publicar cursos preparacion examenes
const publishSchedButtonCamb = document.getElementById('publishSchedButtonCamb');
if (publishSchedButtonCamb) {
	publishSchedButtonCamb.addEventListener('click', async (e) => {
		e.preventDefault();
		try {
			await setDoc(doc(db, 'coursesSchedule', 'coursesScheduleCamb'), cambScheduleDataDB2);
			await sweetalert2.fire({
				title: ' Cursos Cambridge PUBLICADOS!',
				background: '#93E9BE',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				width: 'fit-content',
				timer: 3000,
				timerProgressBar: true,
			});
		} catch (err) {
			sweetalert2.fire({
				title: 'ERROR!',
				background: ' #DB231C',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				width: 'fit-content',
				timer: 3000,
				timerProgressBar: true,
			});
			throw new Error('publish camb courses', err);
		}
	});
}

async function getCambSchedule() {
	try {
		const courseSshedulesCol = doc(db, 'coursesSchedule', 'coursesScheduleCamb');
		const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);

		const courseSshedulesList = courseSshedulesSnapshot.data();
		return courseSshedulesList;
	} catch (err) {
		throw new Error('get CoursesShedule', err);
	}
}

export const cambScheduleDB2 = await getCambSchedule();

//*talleres conversation
const pricesFormDBtalleres = document.getElementById('pricesFormDBtalleres');
async function publishGeneralCoursesPricesDBtalleres(e) {
	e.preventDefault();
	try {
		const prices = {
			monthly: Number(pricesFormDBtalleres['monthlyPayTalleres'].value),
			course: Number(pricesFormDBtalleres['coursePayTalleres'].value),
		};
		await setDoc(doc(db, 'prices', 'conversation'), prices);
		await sweetAlertSucces('Precios de tallers de conversacion PUBLICADOS!');
		return prices;
	} catch (err) {
		sweetAlertError('ERROR!');
		throw new Error('puclishCoursePricesDBtalleres', err);
	}
}
if (pricesFormDBtalleres) {
	pricesFormDBtalleres.addEventListener('submit', await publishGeneralCoursesPricesDBtalleres);
}
async function getPricesTalleres() {
	try {
		const pricesTalleres = doc(db, 'prices', 'conversation');
		const pricesSnapshot = await getDoc(pricesTalleres);
		const pricesList = pricesSnapshot.data();
		return pricesList;
	} catch (err) {
		throw new Error('get Docs', err);
	}
}

export const pricesDBtalleres = await getPricesTalleres();
console.log(pricesDBtalleres);

//*agregar horarios talleres de conversacion

const talleresScheduleDataDB2 = { talleresCoursesSchedule: [] };
const talleresForm = document.getElementById('talleresForm');
const addTalleresButton = document.getElementById('addTalleresButton');
console.log(addTalleresButton);
if (addTalleresButton) {
	addTalleresButton.addEventListener('click', (e) => {
		e.preventDefault();
		const course = {
			name: talleresForm['nameTaller'].value,
			date: talleresForm['dateTaller'].value,
			day: talleresForm['dayTaller'].value,
			time: talleresForm['timeTaller'].value,
		};
		console.log(course);
		talleresScheduleDataDB2.talleresCoursesSchedule.push(course);
		console.log(talleresScheduleDataDB2);
		const showTalleres = document.createElement('div');
		talleresForm.insertAdjacentElement('afterend', showTalleres);
		talleresScheduleDataDB2.talleresCoursesSchedule.forEach((course) => {
			showTalleres.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
			console.log(course);
		});
	});
}
//*publicar talleres de conversacion
const publishTalleresCoursesDB = document.getElementById('publishTalleresCoursesDB');
if (publishTalleresCoursesDB) {
	publishTalleresCoursesDB.addEventListener('click', async (e) => {
		e.preventDefault();
		try {
			await setDoc(doc(db, 'coursesSchedule', 'talleresSchedule'), talleresScheduleDataDB2);
			await sweetAlertSucces('talleres de conversacion PUBLICADOS!');
		} catch (err) {
			sweetAlertError('ERROR!');
			throw new Error('publish talleres error', err);
		}
	});
}

async function getTalleresSchedule() {
	try {
		const courseSshedulesCol = doc(db, 'coursesSchedule', 'talleresSchedule');
		const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);
		const courseSshedulesList = courseSshedulesSnapshot.data();
		return courseSshedulesList;
	} catch (err) {
		throw new Error('get CoursesShedule', err);
	}
}

export const talleresScheduleDB = await getTalleresSchedule();
console.log(talleresScheduleDB);

//TESTS de NIVEL

async function getTests() {
	try {
		return await getDocs(collection(db, 'tests'));
	} catch (err) {
		console.log('Error al traer los tests', err);
	}
}
async function renderTests() {
	let oneTest = document.createElement('div');
	const DBtests = await getTests();
	DBtests.forEach((data) => {
		const test = data.data();
		console.log(test);
		oneTest.innerHTML += `
    <div>
    <p>nombre: ${test.nombre}</p> 
    <p>email: ${test.email}</p> 
    <p>puntos: ${test.puntos}</p> 
    </div>
    `;
	});
	tests.appendChild(oneTest);
}
const getTestBtn = document.getElementById('getTestsBtn');
if (getTestBtn) {
	getTestBtn.addEventListener('click', renderTests);
}

const tests = document.getElementById('tests');
if (tests && prevUser) renderTests();

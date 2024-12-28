import { sweetAlertSucces, sweetAlertError } from "../main.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyAtQccyF0CBM-f9kRhY15B4E7tCpqLCmDs",
  authDomain: "colectivo-de-idiomas.firebaseapp.com",
  projectId: "colectivo-de-idiomas",
  storageBucket: "colectivo-de-idiomas.appspot.com",
  messagingSenderId: "21235746434",
  appId: "1:21235746434:web:54c3b1e041f3fb0d94169b",
  measurementId: "G-HDBEWMH17C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const storageRef = ref(storage);
const analytics = getAnalytics(app);

//SIGN IN
const login = document.getElementById("googleLogIn");
const logout = document.getElementById("googleLogOut");
const main = document.querySelector(".login__main");

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
let user;
let prevUser;
if (login && main) {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log(`User ${user.displayName} Logged In`);
      main.classList.remove("display-none");
      login.classList.add("display-none");
      prevUser = user;
    } else {
      console.log(`User ${user.displayName} Logged Out`);
      if (main) {
        main.classList.toggle("display-none");
      }
    }
  });
}
if (login && logout) {
  login.addEventListener("click", async () => {
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
  logout.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out succesfully");
        login.classList.remove("display-none");
      })
      .catch((error) => {
        sweetAlertError("We couldn´t sign you Out", error);
      });
  });
}
// newPricesFormDB (nuevo precios cursos de ingles general)

const generalCoursesData = document.getElementById("newPricesFormDB");
if (generalCoursesData) {
  generalCoursesData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const generalCoursesDataForm = {
      typeOne: generalCoursesData["payTypeOne"].value,
      valueOne: generalCoursesData["payValueOne"].value,
      typeTwo: generalCoursesData["payTypeTwo"].value,
      valueTwo: generalCoursesData["payValueTwo"].value,
    };
    try {
      for (let [key, value] of Object.entries(generalCoursesDataForm)) {
        if (value === "") {
          delete generalCoursesDataForm[key];
        } else if (value == "none") {
          generalCoursesDataForm[key] = "";
        } else {
          generalCoursesDataForm[key] = value;
        }
      }

      await setDoc(doc(db, "blob", "preciosBlob"), generalCoursesDataForm, {
        merge: true,
      });
      alert("newprices OK");
    } catch (error) {
      console.log(error, "New price NOT good");
    }
  });
}

export async function getNewGeneralPrices() {
  try {
    const newPrices = doc(db, "blob", "preciosBlob");
    const newPricesSnapshot = await getDoc(newPrices);
    const newPricesDB = newPricesSnapshot.data();
    return newPricesDB;
  } catch (error) {
    sweetAlertError("Error!");
    console.log(error);
  }
}

//AGREGAR CURSOS DE INGLES GENERAL
const coursesScheduleDataDB2 = { coursesSchedule: [] };
const coursesForm = document.getElementById("coursesScheduleDB");
const addButton = document.getElementById("add");
if (addButton) {
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const course = {
      name: coursesForm["name"].value,
      date: coursesForm["date"].value,
      day: coursesForm["day"].value,
      time: coursesForm["time"].value,
    };
    coursesScheduleDataDB2.coursesSchedule.push(course);
    const showCourses = document.createElement("div");
    coursesForm.insertAdjacentElement("afterend", showCourses);
    coursesScheduleDataDB2.coursesSchedule.forEach((course) => {
      showCourses.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
    });
  });
}
//PUBLICAR CURSOS DE INGLES GENERAL
const publishSchedButton = document.getElementById("publishSchedButton");
if (publishSchedButton) {
  publishSchedButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "coursesSchedule", "coursesSchedule"),
        coursesScheduleDataDB2
      );
      await sweetAlertSucces("Cursos generales PUBLICADOS!");
    } catch (err) {
      sweetAlertError("ERROR!");
      throw new Error("publish courses", err);
    }
  });
}

export async function getCoursesSchedule() {
  try {
    const courseSshedulesCol = doc(db, "coursesSchedule", "coursesSchedule");
    const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);
    const courseSshedulesList = courseSshedulesSnapshot.data();
    return courseSshedulesList;
  } catch (err) {
    throw new Error("get CoursesShedule", err);
  }
}
// export const courseScheduleDB2 = await getCoursesSchedule();

//descripcion Cursos de inglés general.
const descriptionGeneralCoursesData = { description: [] };
const descriptionGeneralCourses = document.getElementById(
  "descriptionGeneralCoursesFORM"
);
const addCoursesDataBtn = document.getElementById("addText");

if (addCoursesDataBtn) {
  addCoursesDataBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const descriptionData = {
      li: descriptionGeneralCourses["text"].value,
    };

    // Add new description to the array
    descriptionGeneralCoursesData.description.push(descriptionData);

    // Clear the content of the showDescription div
    let showDescription = document.getElementById("showDescription");
    if (!showDescription) {
      showDescription = document.createElement("div");
      showDescription.id = "showDescription";
      descriptionGeneralCourses.insertAdjacentElement(
        "afterend",
        showDescription
      );
    }
    showDescription.innerHTML = ""; // Clear old content

    // Display all items in the array in order
    for (let i = 0; i < descriptionGeneralCoursesData.description.length; i++) {
      const item = document.createElement("p");
      item.textContent = descriptionGeneralCoursesData.description[i].li;
      showDescription.appendChild(item);
    }
  });
}
const publishCoursesDescriptionBtn = document.getElementById(
  "publishDescriptionButton"
);
if (publishCoursesDescriptionBtn) {
  publishCoursesDescriptionBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "courses", "description"),
        descriptionGeneralCoursesData
      );
      await sweetAlertSucces("Descripcion de cursas publicada");
    } catch (error) {
      sweetAlertError("ERROR!");
    }
  });
}

export async function getCoursesDescription() {
  try {
    const coursesDescriptionCall = await getDoc(
      doc(db, "courses", "description")
    );
    const coursesDescription = await coursesDescriptionCall.data();
    return coursesDescription;
  } catch (error) {
    console.log(error, "Error leyendo db en descripcion de cursos");
  }
}
// export const coursesDescription = await getCoursesDescription();

//*Clases INDIVIDUALES
const individualCourseForm = document.getElementById("individualCourse");
if (individualCourseForm) {
  individualCourseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const priceInd = {
        priceInd: individualCourseForm["individual"].value,
        pricePack: individualCourseForm["pack8"].value,
      };
      await setDoc(doc(db, "prices", "individualPrice"), priceInd);
      sweetAlertSucces("Precio Clases Individuales PUBLICADO!");
      return priceInd;
    } catch (err) {
      sweetAlertError("ERROR!");
      throw new Error("clases individuales", err);
    }
  });
}

export const priceIndDB = async () => {
  try {
    const newIndPriceDB = doc(db, "prices", "individualPrice");
    const newIndPriceSnap = await getDoc(newIndPriceDB);
    const newPriceDB = newIndPriceSnap.data();
    return newPriceDB;
  } catch (err) {
    throw new Error("get individual price", err);
  }
};

// export const newPriceIndDB = await priceIndDB();

//*CAMBRIDGE
//prices
const pricesCamb = document.getElementById("pricesFormDBexamenes");
if (pricesCamb) {
  pricesCamb.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const priceCamb = {
        monthlyCamb: pricesCamb["monthlyCamb"].value,
        courseCamb: pricesCamb["courseCamb"].value,
      };
      await setDoc(doc(db, "prices", "cambridgePrice"), priceCamb);
      sweetAlertSucces("Precio Exámenes Cambridge PUBLICADO!");
      return priceCamb;
    } catch (err) {
      sweetAlertError("ERROR!");
      throw new Error("exámenes cambridge", err);
    }
  });
}
export const priceCamb = async () => {
  try {
    const newCambPRiceDB = doc(db, "prices", "cambridgePrice");
    const newCambPriceSnap = await getDoc(newCambPRiceDB);
    const newPriceDB = newCambPriceSnap.data();
    return newPriceDB;
  } catch (err) {
    throw new Error("get cambridge price", err);
  }
};

// export const newPriceCambDB = await priceCamb();

const cambScheduleDataDB2 = { cambSchedule: [] };
const cambForm = document.getElementById("cambScheduleDB");
const addCambButton = document.getElementById("addCamb");
if (addCambButton) {
  addCambButton.addEventListener("click", (e) => {
    e.preventDefault();
    const course = {
      name: cambForm["nameCamb"].value,
      date: cambForm["dateCamb"].value,
      day: cambForm["dayCamb"].value,
      time: cambForm["timeCamb"].value,
    };
    cambScheduleDataDB2.cambSchedule.push(course);
    const showcamb = document.createElement("span");
    cambForm.insertAdjacentElement("afterend", showcamb);
    cambScheduleDataDB2.cambSchedule.forEach((course) => {
      showcamb.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
    });
  });
}
//*publicar cursos preparacion examenes
const publishSchedButtonCamb = document.getElementById(
  "publishSchedButtonCamb"
);
if (publishSchedButtonCamb) {
  publishSchedButtonCamb.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "coursesSchedule", "coursesScheduleCamb"),
        cambScheduleDataDB2
      );
      await sweetAlertSucces("Cursos Cambridge PUBLICADOS!");
    } catch (err) {
      sweetAlertError("Error al publicar los cursos Cambridge");
      throw new Error("publish camb courses", err);
    }
  });
}

export async function getCambSchedule() {
  try {
    const courseSshedulesCol = doc(
      db,
      "coursesSchedule",
      "coursesScheduleCamb"
    );
    const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);

    const courseSshedulesList = courseSshedulesSnapshot.data();
    return courseSshedulesList;
  } catch (err) {
    throw new Error("get CoursesShedule", err);
  }
}

// export const cambScheduleDB2 = await getCambSchedule();

//*talleres conversation
const pricesFormDBtalleres = document.getElementById("pricesFormDBtalleres");
async function publishGeneralCoursesPricesDBtalleres(e) {
  e.preventDefault();
  try {
    const prices = {
      monthly: Number(pricesFormDBtalleres["monthlyPayTalleres"].value),
      course: Number(pricesFormDBtalleres["coursePayTalleres"].value),
    };
    await setDoc(doc(db, "prices", "conversation"), prices);
    await sweetAlertSucces("Precios de tallers de conversacion PUBLICADOS!");
    return prices;
  } catch (err) {
    sweetAlertError("ERROR!");
    throw new Error("puclishCoursePricesDBtalleres", err);
  }
}
if (pricesFormDBtalleres) {
  pricesFormDBtalleres.addEventListener(
    "submit",
    await publishGeneralCoursesPricesDBtalleres
  );
}
export async function getPricesTalleres() {
  try {
    const pricesTalleres = doc(db, "prices", "conversation");
    const pricesSnapshot = await getDoc(pricesTalleres);
    const pricesList = pricesSnapshot.data();
    return pricesList;
  } catch (err) {
    throw new Error("get Docs", err);
  }
}

//*agregar horarios talleres de conversacion

const talleresScheduleDataDB2 = { talleresCoursesSchedule: [] };
const talleresForm = document.getElementById("talleresForm");
const addTalleresButton = document.getElementById("addTalleresButton");
if (addTalleresButton) {
  addTalleresButton.addEventListener("click", (e) => {
    e.preventDefault();
    const course = {
      name: talleresForm["nameTaller"].value,
      date: talleresForm["dateTaller"].value,
      day: talleresForm["dayTaller"].value,
      time: talleresForm["timeTaller"].value,
    };
    talleresScheduleDataDB2.talleresCoursesSchedule.push(course);
    const showTalleres = document.createElement("div");
    talleresForm.insertAdjacentElement("afterend", showTalleres);
    talleresScheduleDataDB2.talleresCoursesSchedule.forEach((course) => {
      showTalleres.innerHTML = `
    ${course.name} | ${course.date} | ${course.day} | ${course.time}
      `;
    });
  });
}
//*publicar talleres de conversacion
const publishTalleresCoursesDB = document.getElementById(
  "publishTalleresCoursesDB"
);
if (publishTalleresCoursesDB) {
  publishTalleresCoursesDB.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "coursesSchedule", "talleresSchedule"),
        talleresScheduleDataDB2
      );
      await sweetAlertSucces("talleres de conversacion PUBLICADOS!");
    } catch (err) {
      sweetAlertError("ERROR!");
      throw new Error("publish talleres error", err);
    }
  });
}

export async function getTalleresSchedule() {
  try {
    const courseSshedulesCol = doc(db, "coursesSchedule", "talleresSchedule");
    const courseSshedulesSnapshot = await getDoc(courseSshedulesCol);
    const courseSshedulesList = courseSshedulesSnapshot.data();
    return courseSshedulesList;
  } catch (err) {
    throw new Error("get CoursesShedule", err);
  }
}

//TESTS de NIVEL
if (
  document.title === "Colectivo Login" ||
  document.title === "English Level Assessment Test"
) {
  const dateTime = luxon.DateTime;
  async function getTests() {
    try {
      return await getDocs(collection(db, "tests"));
    } catch (err) {
      sweetAlertError("Error al traer los tests");
    }
  }
  async function renderTests() {
    let oneTest = document.createElement("div");
    const DBtests = await getTests();
    if (DBtests.empty) {
      sweetAlertError("No hay tests");
    }

    DBtests.forEach((data) => {
      const test = data.data();
      console.log(data);
      oneTest.innerHTML += `
      <div class="deleteTestButton" id="${data.id}">
        <h3>${dateTime
          .fromISO(data.id)
          .toLocaleString(dateTime.DATETIME_MED)}</h3>
        <p>${test.nombre}</p> 
        <a href="mailto:${test.email}"> ${test.email}</a> 
        <p>Puntos: ${test.puntos}</p> 
        <button data-id="${data.id}" class="delete_button">X</button>
      </div>
      `;
    });
    await tests.appendChild(oneTest);
    // Delete Test by one
    const deleteButtons = document.querySelectorAll(".deleteTestButton button");
    for (let btn of deleteButtons) {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        await deleteDoc(doc(db, "tests", dataset.id));
        for (const child of oneTest.children) {
          if (child.id === dataset.id) {
            child.style.display = "none";
          } // Logs the id of each child (e.g., "data.id")
        }
      });
    }
  }
  const getTestBtn = document.getElementById("getTestsBtn");
  if (getTestBtn) {
    getTestBtn.addEventListener("click", renderTests);
  }
}

// const tests = document.getElementById("tests");
// if (tests && prevUser) renderTests();

//SEMINARIOS

//UPLOAD IMAGES
const uploadImages = async (HtMLform, fileInput, DBdirectory) => {
  const formU = document.getElementById(`${HtMLform}`);

  if (formU) {
    formU.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = document.getElementById(`${fileInput}`).files;
      for (let i = 0; i < file.length; i++) {
        const fileRef = ref(storage, `${DBdirectory}/${file[i].name}`);
        uploadBytes(fileRef, file[i])
          .then((snapshot) => {})
          .catch((error) => {
            console.log("Upload failed:", error);
          });
      }
      alert(`Uploaded for ${DBdirectory}!`);
    });
  }
};

uploadImages("seminarioImgForm", "seminarioImgs", "seminario");
const imgLinks = [];

const showImages = (DBdirectory, imgsContainer, button, URLinput, form) => {
  const listRef = ref(storage, `${DBdirectory}`);
  const HTMLimgsContainer = document.getElementById(`${imgsContainer}`);
  const showImgsButton = document.getElementById(`${button}`);
  if (showImgsButton) {
    showImgsButton.addEventListener("click", async () => {
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, `${DBdirectory}/${itemRef.name}`))
              .then((url) => {
                imgLinks.push(url);
                HTMLimgsContainer.innerHTML += `
            <div>
              <img src=${url} style="width: 200px;" class="mb-3" id=${itemRef.name}>
							<span>${itemRef.name}</span>
              <button id="${DBdirectory}-${itemRef.name}" class=" ${DBdirectory}" disabled>Usar</button>
						</div>
      `;
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      useImageButtons(DBdirectory, form, URLinput);
      console.log(imgLinks);
    });
  }
};
const seminariosForm = document.getElementById("seminarioForm");
if (seminariosForm) {
  seminariosForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const seminario = {
      title: seminariosForm["seminarioTitle"].value,
      description: seminariosForm["seminariodescription"].value,
      totalPrice: seminariosForm["seminarioTotalPrice"].value,
      optionNamePrice: seminariosForm["seminarioNamePrice"].value,
      optionprice: seminariosForm["seminarioOptionPrice"].value,
      thumbnail: seminariosForm["seminarioImg"].value,
      day: seminariosForm["semDay"].value,
      hour: seminariosForm["semHour"].value,
      duration: seminariosForm["semDur"].value,
    };
    try {
      for (let [key, value] of Object.entries(seminario)) {
        if (value === "") {
          delete seminario[key];
        } else if (value == "none") {
          seminario[key] = "";
        } else {
          seminario[key] = value;
        }
      }
      await updateDoc(doc(db, "seminarios", "seminario"), seminario, {
        merge: true,
      });
      alert("Seminario cargado! OK!");
    } catch (err) {
      console.log(err, "set seminario ERROR");
      alert("set seminario ERROR");
    }
  });
}

showImages(
  "seminario",
  "seminarioImgContainer",
  "showEminarioImages",
  "seminarioImg",
  seminariosForm
);
async function useImageButtons(DBdirectory, form, URLinput) {
  setTimeout(() => {
    const use = document.querySelectorAll(`.${DBdirectory}`);
    use.forEach((button, i) => {
      if (button.id.includes(" ")) {
        button.id = button.id.split(" ").join("");
      } else {
        button.id = button.id;
      }
      button.removeAttribute("disabled");
      button.addEventListener("click", (event) => {
        const img = imgLinks[i];
        form[URLinput].value = img;
      });
    });
  }, 2500);
}

//GET SEMINARIO
export async function getSeminario() {
  try {
    const seminario = doc(db, "seminarios", "seminario");
    const seminarioSnapshot = await getDoc(seminario);
    const seminarioDB = seminarioSnapshot.data();
    return seminarioDB;
  } catch (err) {
    throw new Error("get CoursesShedule", err);
  }
}

//  const seminarioDB = await getSeminario();

// precios DOLAR

const preciosUSD = document.getElementById("dolarForm");
if (preciosUSD) {
  preciosUSD.addEventListener("submit", async (e) => {
    e.preventDefault();
    const preciosDolar = {
      general: preciosUSD["generalUSD"].value,
      cambridge: preciosUSD["cambUSD"].value,
      seminario: preciosUSD["seminariosUSD"].value,
      taller: preciosUSD["tallerUSD"].value,
      ind: preciosUSD["indUSD"].value,
    };
    try {
      for (let [key, value] of Object.entries(preciosDolar)) {
        if (value === "") {
          delete preciosDolar[key];
        } else if (value == "none") {
          preciosDolar[key] = "";
        } else if (value === "0") {
          preciosDolar[key] = "---";
        } else {
          preciosDolar[key] = value;
        }
      }
      await updateDoc(doc(db, "prices", "dolares"), preciosDolar, {
        merge: true,
      });
      alert("Precios DOLAR OK!!!! cargados");
    } catch (err) {
      alert("Precios DOLAR ERROR!!!!!!");
      console.log(err);
    }
  });
}

async function getPreciosDolar() {
  try {
    const preciosDolar = doc(db, "prices", "dolares");
    const dolarSNAP = await getDoc(preciosDolar);
    const preciosDolarDB = dolarSNAP.data();
    return preciosDolarDB;
  } catch (err) {
    throw new Error("get preciosDolar", err);
  }
}

export const preciosDolarDB = await getPreciosDolar();

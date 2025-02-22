const navMenu = [
  "home",
  "quiénes somos",
  "cursos",
  "precios",
  "enlaces",
  "Trabaja con nosotros",
];
const moreCoursesDropdown = [
  "cursos de inglés general",
  "preparación de exámenes",
  "talleres de conversación",
  "seminarios temáticos",
  "clases individuales",
];
const navLinks = [
  "../../index.html",
  "../../index.html#aboutUs",
  "#",
  "./precios-cursos-de-ingles.html",
  "./enlaces-utiles.html",
];
const navLinksHome = [
  "/index.html",
  "/index.html#aboutUs",
  "#",
  "/pages/precios-cursos-de-ingles.html",
  "/pages/enlaces-utiles.html",
  "/pages/trabaja-con-nosotros.html",
];
const dropdownContainer = document.getElementById("dropdownContainer");
const dropdownIcon = document.getElementById("dropdownIcon");

dropdownIcon.addEventListener("click", () => {
  dropdownContainer.classList.toggle("dropdown__active");
});

navMenu.forEach((e, i) => {
  const a = document.createElement("a");
  const li = document.createElement("li");
  li.appendChild(a);
  const ul = document.querySelector(".dropdown__list");
  a.textContent = e;
  ul.appendChild(li);
  if (document.querySelector(".tittle__main.general")) {
    a.setAttribute("href", navLinks[i]);
    if (a.textContent === "cursos") {
      li.setAttribute("id", "coursesDropdown");
      a.setAttribute("href", "#");
    }
  } else {
    a.setAttribute("href", navLinksHome[i]);
    if (a.textContent === "cursos") {
      li.setAttribute("id", "coursesDropdown");
      a.setAttribute("href", "#");
    }
  }
});

const coursesDropdown = document.getElementById("coursesDropdown");
coursesDropdown.addEventListener("click", () => {
  const control = document.querySelectorAll(".dropdown__list--more");
  if (control.length > 0) {
    const ulToRemove = document.querySelector(".dropdown__list ul");
    console.log(ulToRemove);
    const dropdownList = document.querySelector(".dropdown__list");
    dropdownList.removeChild(ulToRemove);
    dropdownList.classList.add("dropdown__list");
    dropdownList.classList.remove("dropdown__list-open");
  } else {
    const dropdownList = document.querySelector(".dropdown__list");
    dropdownList.classList.add("dropdown__list-open");
    const moreCoursesUL = document.createElement("ul");
    coursesDropdown.insertAdjacentElement("afterend", moreCoursesUL);
    moreCoursesDropdown.forEach((e, i) => {
      const moreCoursesItem = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = e;

      if (document.querySelector(".tittle__main.general")) {
        link.setAttribute("href", `../../index.html#div${i}`);
        console.log("if");
      } else {
        link.setAttribute("href", `./index.html#div${i}`);
        console.log("else");
      }

      moreCoursesUL.appendChild(moreCoursesItem);
      moreCoursesItem.appendChild(link);
      moreCoursesItem.classList.add("dropdown__list--more");
    });
  }
});
//* navbar tablet/desktop
if (window.innerWidth >= 1296) {
  const navContainer = document.createElement("div");
  navContainer.className = "nav-container";
  const nav = document.getElementsByTagName("nav");
  const navList = document.createElement("ul");
  nav[0].appendChild(navContainer);
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1300) {
      navContainer.removeChild(navList);
    } else {
      navContainer.appendChild(navList);
    }
  });
  navContainer.appendChild(navList);

  navMenu.forEach((e, i) => {
    const title = document.title;
    if (e != "cursos") {
      const a = document.createElement("a");
      const liNav = document.createElement("li");
      navList.appendChild(liNav);
      liNav.appendChild(a);
      a.innerText = e;
      a.setAttribute("href", navLinksHome[i]);
    } else {
      const a = document.createElement("a");
      const liNav = document.createElement("li");
      navList.appendChild(liNav);
      liNav.appendChild(a);
      a.innerText = e;
      a.setAttribute("href", "../index.html#coursesCardContainer2");
    }
  });
}

/* add favicon*/
const title = document.title;
const favicon = document.createElement("link");
favicon.rel = "icon";
title === "El colectivo de Idiomas || Aprender inglés online"
  ? (favicon.href = "./img/favicon-16x16.png")
  : (favicon.href = "../img/favicon-16x16.png");
document.head.appendChild(favicon);

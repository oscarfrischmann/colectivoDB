"use strict";
import sweetalert2 from "https://cdn.jsdelivr.net/npm/sweetalert2@11.11.1/+esm";
import * as login from "../js/assets/login.js";

export function openWasap() {
  window.open(
    " https://wa.me/5491132850921?text=Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20ingles.",
    "_blank"
  );
}

const button = document.getElementById("individualsWasapBtn");
if (button) {
  button.addEventListener("click", () => openWasap());
}

export async function sweetAlertSucces(curso) {
  sweetalert2.fire({
    title: curso,
    background: "#93E9BE",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    width: "fit-content",
    timer: 3000,
    timerProgressBar: true,
  });
}
export async function sweetAlertError(error) {
  sweetalert2.fire({
    title: error,
    background: " #DB231C",
    color: "white",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    width: "fit-content",
    timer: 3000,
    timerProgressBar: true,
  });
}

//*PopUp
if (document.title === "El colectivo de Idiomas || Aprender inglés online") {
  const popUp = await login.getPopUp();

  if (popUp.active) {
    const usersVersion = localStorage.getItem("visited");
    let visited = popUp.version.seconds.toString();
    console.log("popup active");

    if (visited !== usersVersion || usersVersion === null) {
      console.log("popUp", popUp);
      localStorage.setItem("visited", visited);

      sweetalert2
        .fire({
          imageUrl: `${popUp.img}`,
          imageWidth: "75%",
          title: `${popUp.title}`,
          text: `${popUp.text}`,
          showConfirmButton: popUp.okButtonNot,
          showCancelButton: true,
          cancelButtonText: `${popUp.cancelButton}`,
          confirmButtonText: `${popUp.okButton}`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.replace(`${popUp.redirect}`);
          } else {
            // window.location.href = "./index.html";
          }
        });
    } else {
      console.log("Ya visitaste la página");
    }
  } else {
    console.log("popup inactive");
  }
}

"use strict";
import sweetalert2 from "https://cdn.jsdelivr.net/npm/sweetalert2@11.11.1/+esm";

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
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    width: "fit-content",
    timer: 3000,
    timerProgressBar: true,
  });
}

if (document.title === "El colectivo de Idiomas || Aprender inglés online") {
  sweetalert2
    .fire({
      // title: `Excelent! respuestas correctas`,
      imageUrl: "./img/popUpColectivo.jpg",
      imageWidth: "75%",
      // text: "Ya completaste la parte escrita. Escribinos para completar la nivelación con una entrevista por Zoom",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Tal vez después",
      confirmButtonText: "Quiero!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        openWasap();
      } else {
        // window.location.href = "./index.html";
      }
    });
}

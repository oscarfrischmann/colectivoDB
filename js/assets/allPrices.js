import * as login from "./login.js";
import { openWasap } from "../main.js";

const table = document.getElementById("allPrices");
const promoBtn = document.getElementById("wasap");
const generalPrices = await login.getNewGeneralPrices();
const cambPrices = await login.priceCamb();
promoBtn.addEventListener("click", openWasap);
table.innerHTML = `
 <table>
            <tr>
                <th></th>
                <th>USD</th>
                <th>Pesos Argentinos</th>
            </tr>
            <tr>
                <td>Cursos de Inglés General (mensual)</td>
                <td>${login.preciosDolarDB.general}</td>
                <td>${generalPrices.valueOne}</td>
            </tr>
            <tr>
                <td>Preparacion de Exámenes Internacionales (mensual)</td>
                <td>${login.preciosDolarDB.cambridge}</td>
                <td>${cambPrices.monthlyCamb}</td>
            </tr>
            <tr>
                <td>Seminarios</td>
                <td>${login.preciosDolarDB.seminario}</td>
                <td>${login.seminarioDB.totalPrice}</td>
            </tr>
            <tr>
                <td>Taller de Conversación (mensual)</td>
                <td>${login.preciosDolarDB.taller}</td>
                <td>${login.pricesDBtalleres.monthly}</td>
            </tr>
            <tr>
                <td>Clases Individuales (Valor hora)</td>
                <td>${login.preciosDolarDB.ind}</td>
                <td>${login.newPriceIndDB.priceInd}</td>
            </tr>
        </table>
`;

import * as login from "./login.js";
import { openWasap } from "../main.js";

const table = document.getElementById("allPrices");
const promoBtn = document.getElementById("wasap");
const generalPrices = await login.getNewGeneralPrices();
const cambPrices = await login.priceCamb();
const semPrices = await login.getSeminario();
const tallPrices = await login.getPricesTalleres();
const indPrices = await login.priceIndDB();
const dolarPrices = await login.getPreciosDolar();
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
                <td>${dolarPrices.general}</td>
                <td>${generalPrices.valueOne}</td>
            </tr>
            <tr>
                <td>Preparacion de Exámenes Internacionales (mensual)</td>
                <td>${dolarPrices.cambridge}</td>
                <td>${cambPrices.monthlyCamb}</td>
            </tr>
            <tr>
                <td>Seminarios</td>
                <td>${dolarPrices.seminario}</td>
                <td>${semPrices.totalPrice}</td>
            </tr>
            <tr>
                <td>Taller de Conversación (mensual)</td>
                <td>${dolarPrices.taller}</td>
                <td>${tallPrices.monthly}</td>
            </tr>
            <tr>
                <td>Clases Individuales (Valor hora)</td>
                <td>${dolarPrices.ind}</td>
                <td>${indPrices.priceInd}</td>
            </tr>
        </table>
`;

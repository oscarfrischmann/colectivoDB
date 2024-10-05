import * as login from "./login.js";

const table = document.getElementById("allPrices");

table.innerHTML = `
 <table>
            <tr>
                <th></th>
                <th>USD</th>
                <th>Pesos Argentinos</th>
            </tr>
            <tr>
                <td>Cursos de Inglés General</td>
                <td>${login.preciosDolarDB.general}</td>
                <td>${login.pricesDB.monthly}</td>
            </tr>
            <tr>
                <td>Preparacion de Exámenes Internacionales</td>
                <td>${login.preciosDolarDB.cambridge}</td>
                <td>${login.newPriceCambDB.monthlyCamb}</td>
            </tr>
            <tr>
                <td>Seminarios</td>
                <td>${login.preciosDolarDB.seminario}</td>
                <td>${login.seminarioDB.totalPrice}</td>
            </tr>
            <tr>
                <td>Taller de Conversación</td>
                <td>${login.preciosDolarDB.taller}</td>
                <td>${login.pricesDBtalleres.course}</td>
            </tr>
            <tr>
                <td>Clases Individuales (Valor hora)</td>
                <td>${login.preciosDolarDB.ind}</td>
                <td>${login.newPriceIndDB.priceInd}</td>
            </tr>
        </table>
`;

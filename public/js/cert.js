import { loadHeaderFooter, getUserValue, getDateTime, getFormFields } from './utils.mjs';

loadHeaderFooter();
const user = await getUserValue();
// let inputUrl = 'http://localhost:3003/input/';
// let csrurl = 'http://localhost:3003/csr/';

const main = document.querySelector('main');
const pid = document.querySelector('#pid');
const pidValue = pid.value;

const button = document.getElementById('certsearch');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    let inputUrl = 'http://localhost:3009/cert/';

    const url = inputUrl + pidValue;

    // Delete the child nodes of the main element
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }


    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(record => {
        console.log(record);
        if (record.length > 0) {
            let previousProductId = null;
            for (const key in record) {
                const { PRODUCT_ID, BOM_PRODUCT_ID, BOS_SPECIFICATION_ID } = record[key];
                if (previousProductId === null || previousProductId !== PRODUCT_ID) {
                    const section = document.createElement('section');
                    const productIdHeading = document.createElement('h3');
                    productIdHeading.textContent = PRODUCT_ID;
                    section.appendChild(productIdHeading);
                    main.appendChild(section);
                    previousProductId = PRODUCT_ID;
                }
                const bomProduct = document.createElement('p');
                bomProduct.textContent = `${BOM_PRODUCT_ID}: ${BOS_SPECIFICATION_ID}`;
                main.lastChild.appendChild(bomProduct);
            }
        } else {
            const noRecordMessage = document.createElement('p');
            noRecordMessage.textContent = 'No records found.';
            main.appendChild(noRecordMessage);
        }


    });
}
);
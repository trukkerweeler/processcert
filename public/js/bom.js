import { loadHeaderFooter, getUserValue, getDateTime, getFormFields } from './utils.mjs';

loadHeaderFooter();
const user = await getUserValue();
let inputUrl = 'http://localhost:3003/input/';
let csrurl = 'http://localhost:3003/csr/';

const main = document.querySelector('main');
const iid = document.querySelector('#pid');
const caidValue = iid.value;

const editbutton = document.getElementById('editaction');
const collectBtn = document.getElementById('collectBtn');
const closebutton = document.getElementById('closeaction');

const button = document.getElementById('bomsearch');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    let inputUrl = 'http://localhost:3009/bom/';

    const pid = document.querySelector('#pid');    
    let pidValue = pid.value;
    if (pidValue.length === 0) {
        alert('Please enter a product ID');
    }

    const url = inputUrl + pidValue;

    // Delete the child nodes of the main element
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(record => {
        if (record.length === 0) {
            alert('No record found');
        }
        else {
            // create header for BOM
            const bomHeader = document.createElement('h2');
            bomHeader.innerHTML = 'Bill of Materials';
            main.appendChild(bomHeader);
            for (const key in record) {
                const boms = document.createElement('p');
                boms.innerHTML = `${key}: ${record[key]['BOM_PRODUCT_ID']}`;
                main.appendChild(boms);
            }
        }
        // console.log(record);
    })


const modal = document.querySelector('[data-modal]');

// open modal on edit button click
editbutton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.showModal();
});

// close modal on cancel button click
const cancel = document.querySelector('[data-close-modal]');
cancel.addEventListener('click', () => {
    modal.close();
});

// save the form data to the database from the modal
const save = document.querySelector('#modalsave');
save.addEventListener('click', async (event) => {
    event.preventDefault();
    const cid = document.querySelector('#newtext');
    const pid = document.querySelector('#pid');
    const dataJson = {};
    dataJson['BOM_PRODUCT_ID'] = cid.value;
    dataJson['PRODUCT_ID'] = pid.value;
    try {
        const response = await fetch(inputUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJson)
        });
        if (response.ok) {
            // alert('Record added successfully');
            modal.close();
        }
    } catch (error) {
        console.error('Error:', error);
    }
    // click the search button to refresh the page
    button.click();

});
});

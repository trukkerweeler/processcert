import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();

const url = 'http://localhost:3009/bos/';

let myRequestDate = new Date();
myRequestDate.setDate(myRequestDate.getDate());
myRequestDate = myRequestDate.toISOString().slice(0, 10);

let myDueDateDefault = new Date();
myDueDateDefault.setDate(myDueDateDefault.getDate() + 14);
myDueDateDefault = myDueDateDefault.toISOString().slice(0, 10);

// Send a POST request
const form = document.querySelector('#bosbutton');
form.addEventListener('click', async (event) => {
    event.preventDefault();

    const form = document.querySelector('#entryform');
    // Iterate through passed parameters
    const data = new FormData(form);
    
    const dataJson = {};
    let myspecs = [];
    for (let field of data.keys()) {
        // console.log(field);
        if (field === 'PRODUCT_ID') {
            dataJson[field] = data.get(field);
        }
        else {
            myspecs.push(data.get(field));
        }
        
    }
    dataJson['BOS_SPECIFICATION'] = myspecs;
    
    // console.log(dataJson);

    try {
        // console.log(url, dataJson)
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(dataJson)
        });
        // console.log('Success:', JSON.stringify(dataJson));
        }
        catch (err) {
            console.log('Error:', err);
        }
    
    form.reset();
});

import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();

const url = 'http://localhost:3009/bos';

let myRequestDate = new Date();
myRequestDate.setDate(myRequestDate.getDate());
myRequestDate = myRequestDate.toISOString().slice(0, 10);

let myDueDateDefault = new Date();
myDueDateDefault.setDate(myDueDateDefault.getDate() + 14);
myDueDateDefault = myDueDateDefault.toISOString().slice(0, 10);

// Send a POST request
const form = document.querySelector('#bosbutton');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    // array the values for the checked boxes
    const checkedValues = [];
    for (const checkbox of data.getAll('partspec')) {
        checkedValues.push(checkbox);
    }
    console.log(checkedValues);
    
    const dataJson = {};
    for (let field of data.keys()) {
        // console.log(field);
        
    }
    
    console.log(dataJson);

    try {
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

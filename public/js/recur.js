import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();
const url = 'http://localhost:3003/recur';

// Send a POST request
const form = document.querySelector('#entryform');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nextId = await fetch(url + '/nextId', { method: 'GET' })
    .then(response => response.json())
    .then (data => {
        JSON.stringify(data);
        return data;
    })
    console.log(nextId);
    // const requestDate = new Date();
    // requestDate.setDate(requestDate.getDate())
    // let myRequestDate = requestDate.toISOString().slice(0, 19).replace('T', ' ');
    // console.log(myRequestDate);
    
    
    const dataJson = {
        RECUR_ID: nextId,
        STATUS: 'A',
    };
    for (let field of data.keys()) {
        const uppercasing = ['REQUEST_BY', 'ASSIGNED_TO', 'SUBJECT'];
        if ( uppercasing.includes(field)){
            dataJson[field] = data.get(field).toUpperCase();
        } else {
            dataJson[field] = data.get(field);
        }
    }
    // console.log(dataJson);

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(dataJson)
        });
        console.log('Success:', JSON.stringify(dataJson));
        }
        catch (err) {
            console.log('Error:', err);
        }
    
    form.reset();
});





























// const btnRecurs = document.querySelector('#btnRecurs');
// btnRecurs.addEventListener('click', async () => {
//     // submit form to API
//     const form = document.querySelector('#entryform');
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);
//     // data['rid'] = fetch('routes/recur.js').then(response => response.json()).then(data => data.rid);
//     const nextId = await fetch(url + '/nextId', { method: 'GET' })
//     data['rid'] = nextId;
//     data['state'] = 'A';
//     console.log(data);

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         // display results
    //         const results = document.querySelector('#results');
    //         results.innerHTML = '';
    //         for (let i = 0; i < data.length; i++) {
    //             const p = document.createElement('p');
    //             p.textContent = data[i];
    //             results.appendChild(p);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
// });


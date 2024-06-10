import { loadHeaderFooter, getUserValue, getDateTime, getFormFields, getProcessAlias } from './utils.mjs';

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
    // read json file
    
    // create dictionary from json
    const descriptions = JSON.parse(await fetch('json/spec-descriptions.json')
    .then(response => response.text()));
    // console.log(descriptions);


    // Delete the child nodes of the main element
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    const cop_div = document.createElement('div');
    cop_div.setAttribute('id', 'cop');


    const cop_header = document.createElement('h2');
    cop_header.textContent = 'Certificate of Processing';
    cop_div.appendChild(cop_header);
    let cert_array = [];

    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(async record => {
        if (record.length > 0) {
            let previousProductId = null;
            for (const key in record) {
                const { PRODUCT_ID, BOM_PRODUCT_ID, BOS_SPECIFICATION_ID } = record[key];
                try {
                    let processdescription = descriptions[BOS_SPECIFICATION_ID].description;
                    let processgroup = descriptions[BOS_SPECIFICATION_ID].group;
                    // console.log(processdescription + ' ' + processgroup);
                    cert_array.push({ PRODUCT_ID, BOM_PRODUCT_ID, BOS_SPECIFICATION_ID, processdescription, processgroup });
                } catch {
                    let processdescription = 'No description found for ' + BOS_SPECIFICATION_ID;
                    console.log(processdescription);
                }
            }
        }
        let uniqueprocessgroups = [...new Set(cert_array.map(item => item.processgroup))];
        // console.log(uniqueprocessgroups);
        for (const group of uniqueprocessgroups) {
            // console.log(group);
            let needHeader = true;
            for (const cert of cert_array) {
                if (cert.processgroup === group && cert.BOM_PRODUCT_ID.length > 0) {
                    // add h3 element for each group the first time
                    if (needHeader) {
                        let process_h3 = document.createElement('h3');
                        process_h3.setAttribute('class', 'linespecgroup');
                        try {
                            let processAlias = await getProcessAlias(group);
                            process_h3.textContent = processAlias
                        } catch {
                            process_h3.textContent = group;
                        }
                        cop_div.appendChild(process_h3);
                        needHeader = false;
                    }

                    let process_p = document.createElement('p');
                    process_p.setAttribute('class', 'linespecdetails');
                    process_p.textContent = cert.BOM_PRODUCT_ID + ' ' + cert.processdescription;
                    cop_div.appendChild(process_p);
                }
            }
        }
        main.appendChild(cop_div);
    })
    .catch(error => console.error('Error:', error));

    
});

// const btnTraceFile = document.querySelector('#lots');
// btnTraceFile.addEventListener('click', async (event) => {
//     event.preventDefault();
//     console.log(trace.value);
//     // REad the file with filereader
//     const trace = document.querySelector('#trace');
//     const traceValue = trace.value;
//     const url = 'http://localhost:3009/trace/' + traceValue;



//     // // Read the chosen xml file
//     // const trace = document.querySelector('#trace');
//     // const traceValue = trace.value;
//     // const url = 'http://localhost:3009/trace/' + traceValue;
//     // console.log(url);
//     // fetch(url, { method: 'GET' })
//     // .then(response => response.json())
//     // .then(trace => {
//     //     console.log(trace);
//     // })

// });
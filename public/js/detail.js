import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();




const main = document.querySelector('main');
// const url = window.location.href;
// const id = url.split('=')[1];
// console.log(id);
const iid = document.querySelector('#iid');
const caidValue = iid.value;
// console.log(iid);
// const url = 'http://localhost:3003/input/' + iid;
// console.log(url);


const button = document.getElementById('detailsearch');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    const iid = document.querySelector('#iid');    
    let caidValue = iid.value;
    if (caidValue.length === 0) {
        alert('Please enter the Input ID');
    } else {
        // console.log(caidValue);
        // console.log(caidValue.length);
        while (caidValue.length < 7) {
            caidValue = '0' + caidValue;
        }
    }

    const url = 'http://localhost:3003/input/' + caidValue;
    // console.log(url);


    // Delete the child nodes of the main element
    while (main.firstChild) {
        // if (main.firstChild.nodeName === 'section') {
            main.removeChild(main.firstChild);
            // section.remove();
        // }
    }



    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(record => {
        // console.log(record);
        for (const key in record) {
            const detailSection = document.createElement('section');
            detailSection.setAttribute('class', 'section');
            const elemRpt = document.createElement('h1');
            const elemId = document.createElement('h2');
            
            const elemDesc = document.createElement('p');
            const elemIA = document.createElement('p');
            const elemIaDate = document.createElement('p');
            const elemCause = document.createElement('p');
            elemIaDate.setAttribute('class', 'actiondate');
            const elemCaDate = document.createElement('p');
            elemCaDate.setAttribute('class', 'actiondate2');
            const elemCC = document.createElement('p');
            const caDate = document.createElement('p');
            caDate.textContent = 'Issue Date:' + ' ' + record[key]['CORRECTIVE_DATE'].substring(0, 10);
            caDate.setAttribute('class', 'tbl');
            const caRef = document.createElement('p');
            caRef.textContent = 'Process:' + ' ' + record[key]['REFERENCE'];
            caRef.setAttribute('class', 'tbl');
            // const caClosed = document.createElement('p');
            // caClosed.textContent = 'Closed:' + record[key]['CLOSED'];
            const caClosedDate = document.createElement('p');
            if (record[key]['CLOSED_DATE'] === null) {
                caClosedDate.textContent = 'Closed Date:' + ' ' + '';
            } else
                caClosedDate.textContent = 'Closed Date:' + ' ' + record[key]['CLOSED_DATE'].substring(0, 10);
            caClosedDate.setAttribute('class', 'tbl');
            const caAssTo = document.createElement('p');
            caAssTo.textContent = 'Assigned To:' + ' ' + record[key]['ASSIGNED_TO'];
            caAssTo.setAttribute('class', 'tbl');
            const reqBy = document.createElement('p');
            reqBy.textContent = 'Request By:' + ' ' + record[key]['REQUEST_BY'];
            reqBy.setAttribute('class', 'tbl');
            const caType = document.createElement('p');
            caType.textContent = 'Type:' + ' ' + record[key]['TYPE'];
            caType.setAttribute('class', 'tbl');
           

            const ncTrendTitle = document.createElement('h3');
            const correctionTrendTitle = document.createElement('h3');
            const causeTitle = document.createElement('h3');
            const controlTextTitle = document.createElement('h3');
            const linebreak = document.createElement('br');

            elemRpt.textContent = 'Corrective Action Report';
            elemRpt.setAttribute('class', 'header');
            elemId.textContent = 'Corrective Id:' + record[key]['CORRECTIVE_ID'];
            elemId.setAttribute('class', 'header2');

            detailSection.appendChild(caDate);
            detailSection.appendChild(caAssTo);
            detailSection.appendChild(caClosedDate);
            detailSection.appendChild(caRef);
            // detailSection.appendChild(caClosed);
            detailSection.appendChild(reqBy); 

            ncTrendTitle.textContent = 'NC Trend';
            elemDesc.textContent = record[key]['NC_TREND'];
            correctionTrendTitle.textContent = 'Correction';
            if (record[key]['CORRECTION_DATE'] === null) {
                elemIaDate.textContent = 'Correction date:' + ' ' + 'Not yet';
            } else
                elemIaDate.textContent = 'Correction date:' + ' ' + record[key]['CORRECTION_DATE'].substring(0, 10);
            elemIA.textContent = record[key]['CORRECTION_TEXT'];
            causeTitle.textContent = 'Cause';
            elemCause.textContent = record[key]['CAUSE_TEXT'];
            controlTextTitle.textContent = 'Systemic Remedy';
            elemCaDate.textContent = 'Systemic date:' + ' ' + record[key]['CORRECTIVE_DATE'].substring(0, 10);
            elemCC.textContent = record[key]['CONTROL_TEXT'];

            main.appendChild(elemRpt);
            main.appendChild(elemId);
            // main.appendChild(detailTable);
            main.appendChild(detailSection);

            // detailSection.appendChild(linebreak);
            detailSection.appendChild(ncTrendTitle);
            detailSection.appendChild(elemDesc);
            detailSection.appendChild(correctionTrendTitle);
            detailSection.appendChild(elemIA);
            detailSection.appendChild(elemIaDate);

            detailSection.appendChild(causeTitle);
            detailSection.appendChild(elemCause);
            // detailSection.appendChild(causeTitle);


            detailSection.appendChild(controlTextTitle);
            detailSection.appendChild(elemCaDate);
            detailSection.appendChild(elemCC);
            // elemId.appendChild(elemDesc);
            main.appendChild(detailSection);
        }
    });
});

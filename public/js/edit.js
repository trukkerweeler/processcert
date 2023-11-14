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


const button = document.getElementById('actiondetailsearch');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    const iid = document.querySelector('#iid');    
    let aidValue = iid.value;
    if (aidValue.length === 0) {
        alert('Please enter the Input ID');
    } else {
        // console.log(aidValue);
        // console.log(aidValue.length);
        while (aidValue.length < 7) {
            aidValue = '0' + aidValue;
        }
    }

    const url = 'http://localhost:3003/input/' + aidValue;
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
        console.log(record);
        for (const key in record) {
            const detailSection = document.createElement('section');
            detailSection.setAttribute('class', 'section');
            const elemRpt = document.createElement('h1');
            const elemId = document.createElement('h2');
            
            const elemDesc = document.createElement('p');
            const elemIA = document.createElement('p');
            const elemIaDate = document.createElement('p');
            const elemResponse = document.createElement('p');
            elemIaDate.setAttribute('class', 'actiondate');
            const elemCaDate = document.createElement('p');
            elemCaDate.setAttribute('class', 'actiondate2');
            const elemCC = document.createElement('p');
            const aiDate = document.createElement('p');
            aiDate.textContent = 'Request Date:' + ' ' + record[key]['INPUT_DATE'].substring(0, 10);
            aiDate.setAttribute('class', 'tbl');
            const caRef = document.createElement('p');
            caRef.textContent = 'Project:' + ' ' + record[key]['PROJECT_ID'] + ' - ' + record[key]['NAME'];
            caRef.setAttribute('class', 'tbl');
            const aiClosedDate = document.createElement('p');
            if (record[key]['CLOSED_DATE'] === null) {
                aiClosedDate.textContent = 'Closed Date:' + ' ' + '';
            } else
                aiClosedDate.textContent = 'Closed Date:' + ' ' + record[key]['CLOSED_DATE'].substring(0, 10);
            aiClosedDate.setAttribute('class', 'tbl');
            const caAssTo = document.createElement('p');
            caAssTo.textContent = 'Assigned To:' + ' ' + record[key]['ASSIGNED_TO'];
            caAssTo.setAttribute('class', 'tbl');
            const reqBy = document.createElement('p');
            reqBy.textContent = 'Request By:' + ' ' + record[key]['PEOPLE_ID'];
            reqBy.setAttribute('class', 'tbl');
            const caType = document.createElement('p');
            caType.textContent = 'Type:' + ' ' + record[key]['TYPE'];
            caType.setAttribute('class', 'tbl');
           

            const ncTrendTitle = document.createElement('h3');
            const followupTitle = document.createElement('h3');
            const responseTitle = document.createElement('h3');
            const controlTextTitle = document.createElement('h3');
            const linebreak = document.createElement('br');

            elemRpt.textContent = 'Action Item Edit';
            elemRpt.setAttribute('class', 'header');
            elemId.textContent = 'Action Id: ' + record[key]['INPUT_ID'];
            elemId.setAttribute('class', 'header2');

            detailSection.appendChild(aiDate);
            detailSection.appendChild(caAssTo);
            detailSection.appendChild(aiClosedDate);
            detailSection.appendChild(caRef);
            detailSection.appendChild(reqBy); 

            ncTrendTitle.textContent = 'Action:';
            elemDesc.textContent = record[key]['INPUT_TEXT'];
            followupTitle.textContent = 'Follow Up:';
            elemIA.textContent = record[key]['CORRECTION_TEXT'];
            responseTitle.textContent = 'Response:';
            elemResponse.textContent = record[key]['RESPONSE_TEXT'];

            main.appendChild(elemRpt);
            main.appendChild(elemId);
            main.appendChild(detailSection);

            // detailSection.appendChild(linebreak);
            detailSection.appendChild(ncTrendTitle);
            detailSection.appendChild(elemDesc);
            detailSection.appendChild(followupTitle);
            detailSection.appendChild(elemIA);
            detailSection.appendChild(elemIaDate);

            detailSection.appendChild(responseTitle);
            detailSection.appendChild(elemResponse);


            detailSection.appendChild(controlTextTitle);
            detailSection.appendChild(elemCaDate);
            detailSection.appendChild(elemCC);
            main.appendChild(detailSection);
        }
    });
});

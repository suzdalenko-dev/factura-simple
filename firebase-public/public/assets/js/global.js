let currentUrl = window.location.href;
let HTTP_URL   = 'https://simplefactura.pythonanywhere.com/';
if(currentUrl.includes('127.0.0.1')){
    HTTP_URL = 'http://127.0.0.1:8000/';
}

/* register and login */
async function registerRequest(url, formData){
    try {
        let uri = HTTP_URL+url;
        let response = await fetch(uri, {method:'POST', body: formData});
        let data = await response.json();
        if(data && data.status == 'error'){
            alert(data.message);
        }
        if(!data){
            alert('Error al traer datos.. '+url);
        }
        return data;
    } catch (error) {
        alert('Error 1 '+error)
        console.error('There was a problem with the fetch operation:', error);
    }
}

/* other queries */
async function postRequest(url, formData){
    try {
        formData.append('company_id', window.localStorage.getItem('company_id'));
        formData.append('email', window.localStorage.getItem('email'));
        formData.append('cif', window.localStorage.getItem('cif'));
        formData.append('uid', window.localStorage.getItem('uid'));
        formData.append('password', window.localStorage.getItem('password'));
        
        let uri = HTTP_URL+url;
        let response = await fetch(uri, {method:'POST', body: formData});
        let data = await response.json();
        if(data && data.status == 'error'){
            setTimeout(() => {
                alert(data.message);
            }, 1000);
        }
        return data;
    } catch (error) {
        alert('Error 1 '+error)
        console.error('There was a problem with the fetch operation:', error);
    }
}

function formatDateInvoice() {
    let miDate = new Date();
    const day = String(miDate.getDate()).padStart(2, '0'); 
    const month = String(miDate.getMonth() + 1).padStart(2, '0');
    const year = miDate.getFullYear(); 
    return `${day}/${month}/${year}`;
}

function globalCurrentDate(){
    let currentDate = new Date();
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    let year = currentDate.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

let IVAS_LIST = [
    {'title': 21, 'percentage': ' 21 % '},
    {'title': 10, 'percentage': ' 10 % '},
    {'title': 4, 'percentage': ' 4 % '},
    {'title': 0, 'percentage': ' 0 % '},
    {'title': '0EXENTO', 'percentage': ' 0 EXENTO '},
];

let INVOICES_LIST = [
    {name_factura: 'FACTURA', title: 'Factura Ordinaria', letter: 'O'},
    {name_factura: 'FACTURA RECTIFICATIVA', title: 'Factura Rectificativa', letter: 'R'},
    {name_factura: 'FACTURA ABONO', title: 'Factura Abono', letter: 'A'},
];
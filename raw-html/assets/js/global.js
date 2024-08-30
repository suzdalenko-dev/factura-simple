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
            alert(data.message)
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


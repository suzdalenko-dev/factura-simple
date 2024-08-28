let currentUrl = window.location.href;
let HTTP_URL   = 'https://simplefactura.pythonanywhere.com/';
if(currentUrl.includes('127.0.0.1')){
    HTTP_URL = 'http://127.0.0.1:8000/';
}

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

async function postRequest(url, formData){
    try {
        formData.append('id', window.localStorage.getItem('id'));
        formData.append('uid', window.localStorage.getItem('uid'));

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

async function getRequest(url) {
    
}
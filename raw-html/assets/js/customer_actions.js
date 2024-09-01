function saveNewCustomer(event, client_id){
    event.preventDefault();
    let inputCifCliente   = document.getElementById('inputCifCliente').value.trim();         if(!inputCifCliente) { alert('CIF NIF'); return; }
    let inputRazonCliente = document.getElementById('inputRazonCliente').value.trim();       if(!inputRazonCliente) { alert('Razón o denominación social'); return; }
    let inputPersonName = document.getElementById('inputPersonName').value.trim();           if(!inputPersonName) { alert('Nombre y apellidos persona'); return; }

    let inputEmailCliente = document.getElementById('inputEmailCliente').value.trim();       if(!inputEmailCliente) { alert('Email'); return; }
    let inputPhoneCliente = document.getElementById('inputPhoneCliente').value.trim();       if(!inputPhoneCliente) { alert('Teléfono'); return; }

    let inputCountryCliente  = document.getElementById('inputCountryCliente').value.trim();  if(!inputCountryCliente) { alert('País'); return; }
    let inputProvincyCliente = document.getElementById('inputProvincyCliente').value.trim(); if(!inputProvincyCliente) { alert('Provincia'); return; }
    let inputZipCodeCliente  = document.getElementById('inputZipCodeCliente').value.trim();  if(!inputZipCodeCliente) { alert('Código postal'); return; }
    let inputCityCliente     = document.getElementById('inputCityCliente').value.trim();     if(!inputCityCliente) { alert('Cuidad'); return; }
    let inputAddressCliente  = document.getElementById('inputAddressCliente').value.trim();  if(!inputAddressCliente) { alert('Dirección'); return; }

    let idSaveNewCustomer = document.getElementById('idSaveNewCustomer')
        idSaveNewCustomer.innerHTML = '<i class="fas fa-save"></i> Guardando..';

    let formData = new FormData();
        formData.append('cif_nif', inputCifCliente);    
        formData.append('razon', inputRazonCliente);
        formData.append('person_name', inputPersonName);
        formData.append('emailcustomer', inputEmailCliente);
        formData.append('phone', inputPhoneCliente);

        formData.append('country', inputCountryCliente);
        formData.append('province', inputProvincyCliente);
        formData.append('zipcode', inputZipCodeCliente);
        formData.append('city', inputCityCliente);
        formData.append('address', inputAddressCliente);

    postRequest('default/put/cliente/'+client_id, formData).then(dataArticle => {
        try{
            DEFAULT_ENTITY = {name:'cliente', title:'Clientes'};
            defaultController('get', DEFAULT_ENTITY, 0);
        } catch (error) {
            alert('Error al grabar artículo '+error);
        }
    });

    setTimeout(() => {
        if(idSaveNewCustomer){
            idSaveNewCustomer.innerHTML = '<i class="fas fa-save"></i> Guardar';
        }
    }, 11000);   
}


function showCustomClient(clienteId){
    let formData = new FormData();
    postRequest('default/get/cliente/'+clienteId, formData).then(dataCliente => {
        try{
            let titleView = 'Cliente '+dataCliente.res[0].razon;
            crearAddArticleCustomInvoice({'name':'cliente', 'title':titleView}, dataCliente);
        } catch (error) {
            alert('Error al grabar artículo '+error);
        }
    });
}
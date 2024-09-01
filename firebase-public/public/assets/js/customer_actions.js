function saveNewCustomer(event){
    event.preventDefault();

    let inputCifCliente   = document.getElementById('inputCifCliente').value.trim();         if(!inputCifCliente) { alert('CIF NIF'); return; }
    let inputNameCliente  = document.getElementById('inputNameCliente').value.trim();        if(!inputNameCliente) { alert('Nombre'); return; }
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
        formData.append('name', inputNameCliente);
        formData.append('email', inputEmailCliente);
        formData.append('phone', inputPhoneCliente);

        formData.append('country', inputCountryCliente);
        formData.append('province', inputProvincyCliente);
        formData.append('zipcode', inputZipCodeCliente);
        formData.append('city', inputCityCliente);
        formData.append('address', inputAddressCliente);

    postRequest('default/put/cliente/0', formData).then(dataArticle => {
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
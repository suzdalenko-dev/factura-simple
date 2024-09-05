function checkCompanyData(dataCompany){
    if(dataCompany){
        let errorsCompany = '';                                                       
        // if(!dataCompany.id){ errorsCompany += 'ID empresa \n'; }
        if(!dataCompany.razon){ errorsCompany += 'Razón o denominación social \n';  }
        if(!dataCompany.person_name) {errorsCompany += 'Nombre de la persona vacío \n';}
        if(!dataCompany.cif){ errorsCompany += 'CIF empresa \n'; }
        if(!dataCompany.emailcompany){ errorsCompany += 'Email empresa \n'; }
        if(!dataCompany.country){ errorsCompany += 'País empresa \n'; }
        if(!dataCompany.province){ errorsCompany += 'Provincia empresa \n'; }
        if(!dataCompany.address){ errorsCompany += 'Dirección empresa \n'; }
        if(!dataCompany.zipcode){ errorsCompany += 'Código postal empresa \n'; }
        if(!dataCompany.tlf){ errorsCompany += 'Teléfono principal empresa \n'; }
        if(!dataCompany.tlf2){ errorsCompany += 'Segundo teléfono empresa \n'; }
        if(!dataCompany.price){ errorsCompany += 'Precio de hora de trabajo empresa \n'; }
        if(errorsCompany != ''){
            setTimeout(()=>{
                alert('Datos de la empresa incompletos: \n'+errorsCompany);
            }, 1000);
        }
    }
}

// listado completo de articulos o clientes
function crearTablaEntidadPrincipal(listData, entityData){             
    let currentHtmlEntity = '<span>'+entityData.name+'</span>';
    if('articulo' == entityData.name){
        /* Pestaña Articulos */
        let tableContent = '';
        let htmlTotalArticles = 'Total artículos 0';
        if(listData && listData.length > 0){
            htmlTotalArticles = `Total artículos ${listData.length}`;
            listData.forEach(i => {
                tableContent += `<tr>
                                    <td>${i.artcode}</td>
                                    <td><a onclick="showCustomArticle(${i.id})" href="#ShowArticle-${i.artcode}">${i.description}</a></td>
                                    <td>${i.price} €</td>
                                    <td>${i.iva} %</td>
                                    <td>${i.ivatype}</td>
                                </tr>`;
            });
        }
        currentHtmlEntity = `<div class="container-fluid">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-1">
                                        <h6 class="m-0 font-weight-bold text-primary">${htmlTotalArticles}</h6>
                                    </div>
                                    <div class="card-body">
                                        <div><!--  class=table-responsive -->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table class="table table-bordered dataTable">
                                                        <thead><tr><th>Número</th><th>Descripción</th><th>Precio unidad</th><th>IVA</th><th>Tipo</th></tr></thead>
                                                        <tbody>`+tableContent+`</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        
    } else if('cliente' == entityData.name){
        /* Pestaña Clientes */
        let tableContent = '';
        let htmlTotalClientes = 'Total clientes 0';
        if(listData && listData.length > 0){
            htmlTotalClientes = `Total clientes ${listData.length}`;
            listData.forEach(i => {
                tableContent += `<tr>
                                    <td>${i.clientcode}</td>
                                    <td><a onclick="showCustomClient(${i.id})" href="#ShowClient-${i.clientcode}">${i.cif_nif}</a></td>
                                    <td>${i.razon}</td>
                                    <td>${i.city}</td>
                                    <td>${i.phone}</td>
                                </tr>`;
            });
        }
        currentHtmlEntity = `<div class="container-fluid">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-1">
                                        <h6 class="m-0 font-weight-bold text-primary">${htmlTotalClientes}</h6>
                                    </div>
                                    <div class="card-body">
                                        <div><!--  class=table-responsive -->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table class="table table-bordered dataTable">
                                                        <thead><tr><th>Núm</th><th>CIF NIF</th><th>Razón o denominación social</th><th>Cuídad</th><th>Telefóno</th></tr></thead>
                                                        <tbody>`+tableContent+`</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    } else if('empresa' == entityData.name){
        /* "Pestaña Mi Empresa" */
        let companyName  = String(listData[0].razon) == 'null' ? '' : listData[0].razon;
        let person_name  = String(listData[0].person_name) == 'null' ? '' : listData[0].person_name;
        let emailCustom  = String(listData[0].emailcompany) == 'null' ? '' : listData[0].emailcompany;
        let companyCif   = String(listData[0].cif) == 'null' ? '' : listData[0].cif;
        let companyEmail = String(listData[0].email) == 'null' ? '' : listData[0].email;
        let paisName     = String(listData[0].country) == 'null' ? '' : listData[0].country;
        let provinceName = String(listData[0].province) == 'null' ? '' : listData[0].province;
        let zipcodeData  = String(listData[0].zipcode) == 'null' ? '' : listData[0].zipcode;
        let cityData     = String(listData[0].city) == 'null' ? '' : listData[0].city;
        let addressData  = String(listData[0].address) == 'null' ? '' : listData[0].address;
        let phone1       = String(listData[0].tlf) == 'null' ? '' : listData[0].tlf;
        let phone2       = String(listData[0].tlf2) == 'null' ? '' : listData[0].tlf2;
        let priceData    = String(listData[0].price) == 'null' ? '' : listData[0].price;

        currentHtmlEntity = `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Denominación</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Razón o denominación social</code></div>
                                                <input type="text" value="${companyName}" id="inputCompanyName">
                                                <div class="mt-2 mb-1 "><code>Nombre y apellidos persona</code></div>
                                                <input type="text" value="${person_name}" id="inputPersonName">
                                                <div class="mt-2 mb-1 "><code>Email cara cliente</code></div>
                                                <input type="text" value="${emailCustom}" id="inpuEmailCustom">
                                                <div class="mt-2 mb-1 "><code>CIF-NIF</code></div>
                                                <input type="text" value="${companyCif}" disabled>
                                                <div class="mt-2 mb-1 "><code>Email login</code></div>
                                                <input type="text" value="${companyEmail}" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Dirección</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>País</code></div>
                                                <input type="text" id="inputCountry" value="${paisName}">
                                                <div class="mt-2 mb-1 "><code>Provincia</code></div>
                                                <input type="text" id="inputProvincy" value="${provinceName}">
                                                <div class="mt-2 mb-1 "><code>Código postal</code></div>
                                                <input type="text" id="inputZipCode" value="${zipcodeData}">
                                                <div class="mt-2 mb-1 "><code>Cuidad</code></div>
                                                <input type="text" id="inputCity" value="${cityData}">
                                                <div class="mt-2 mb-1 "><code>Dirección</code></div>
                                                <input type="text" id="inputAddress" value="${addressData}">
                                                <div class="mt-2 mb-1 "><code>Teléfono principal</code></div>
                                                <input type="text" id="inputPhone1" value="${phone1}">
                                                <div class="mt-2 mb-1 "><code>Teléfono</code></div>
                                                <input type="text" id="inputPhone2" value="${phone2}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Precío</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Precio €/hora mano de obra</code></div>
                                                <input type="number" id="inputPriceHour" value="${priceData}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-facebook" onclick="saveDataCompany(event)" id="idSaveDataCompany"><i class="fas fa-save"></i> Guardar</a>
                            </div>`;
    }
    pageMainContent.innerHTML = currentHtmlEntity;
}


function addNewArticleNewCustomer(entity, datosEntidadConcreta){
    pageTitle.innerText = entity.title;
    let currentHtmlEntity = '<span>'+entity.name+'</span>'; 
    /* creating new ARTICLE */
    if(entity.name == 'articulo'){
        let articleId = 0; 
        let descriptionC = ''; 
        let ivaC         = ''; 
        let valorIva = 0; 
        let tipoIva = 'normal';
        let htmlIvas = '<select id="inputArticleIva">';
        IVAS_LIST.forEach(iva => { htmlIvas += `<option value="${iva.title}">${iva.percentage}</option>`; });
        htmlIvas += '</select>';

        if(datosEntidadConcreta && datosEntidadConcreta.res && datosEntidadConcreta.res[0] && datosEntidadConcreta.res[0].id > 0){
            articleId    = datosEntidadConcreta.res[0].id;
            descriptionC = datosEntidadConcreta.res[0].description;
            ivaC         = datosEntidadConcreta.res[0].price;
            valorIva     = datosEntidadConcreta.res[0].iva;        
            tipoIva      = datosEntidadConcreta.res[0].ivatype;    
            let selectedType = '';
            console.log(valorIva)
            console.log(tipoIva)
            htmlIvas = '<select id="inputArticleIva">';
            IVAS_LIST.forEach(iva => { // && tipoIva != 'norm'
                if(iva.title == valorIva && tipoIva == 'norm' ){ selectedType = 'selected'; }
                if(iva.title == valorIva && tipoIva == 'exento' ){ selectedType = 'selected'; }
                htmlIvas += `<option value="${iva.title}" ${selectedType}>${iva.percentage}</option>`;
                selectedType = '';
            });
            htmlIvas += '</select>';
        }
        // alert(valorIva) aqui me falta guardar update este articulo y luego, y que se muestre el tipo adecuado
        currentHtmlEntity = `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Descripción artículo</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Nombre</code></div>
                                                <input type="text" value="${descriptionC}" id="inputArticleName">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Datos de facturación</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Precío €/unidad</code></div>
                                                <input type="number" value="${ivaC}" id="inputArticlePrice">
                                                <div class="mt-2 mb-1 "><code>Porcentaje de IVA</code></div>
                                                ${htmlIvas}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-facebook" onclick="saveNewArticle(event, ${articleId})" id="idNewArticle"><i class="fas fa-save"></i> Guardar</a>
                            </div>`;
    }
    /* creating new CUSTOMER */
    if(entity.name == 'cliente'){
        let clientcodeB    = ''; let countryB  = '';
        let cifNifB        = ''; let provinceB = '';
        let razonB         = ''; let zipcodeB  = '';
        let person_nameB   = ''; let cityB     = '';
        let emailcustomerB = ''; let addressB  = '';
        let phoneB         = ''; let CLIENT_ID = 0;
        if(datosEntidadConcreta && datosEntidadConcreta.res && datosEntidadConcreta.res[0] && datosEntidadConcreta.res[0].id > 0){
            clientcodeB    = datosEntidadConcreta.res[0].clientcode;    countryB  = datosEntidadConcreta.res[0].country; 
            cifNifB        = datosEntidadConcreta.res[0].cif_nif;       provinceB = datosEntidadConcreta.res[0].province; 
            razonB         = datosEntidadConcreta.res[0].razon;         zipcodeB  = datosEntidadConcreta.res[0].zipcode; 
            person_nameB   = datosEntidadConcreta.res[0].person_name;   cityB     = datosEntidadConcreta.res[0].city; 
            emailcustomerB = datosEntidadConcreta.res[0].emailcustomer; addressB  = datosEntidadConcreta.res[0].address;
            phoneB         = datosEntidadConcreta.res[0].phone;         CLIENT_ID = datosEntidadConcreta.res[0].id; 
        }
        currentHtmlEntity = `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Denominación</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Codígo cliente</code></div>
                                                <input type="text" value="${clientcodeB}" disabled id="inputCodigoCLiente">
                                                <div class="mt-2 mb-1 "><code>CIF NIF</code></div>
                                                <input type="text" value="${cifNifB}" id="inputCifCliente">
                                                <div class="mt-2 mb-1 "><code>Razón o denominación social</code></div>
                                                <input type="text" value="${razonB}" id="inputRazonCliente">
                                                <div class="mt-2 mb-1 "><code>Nombre y apellidos persona</code></div>
                                                <input type="text" value="${person_nameB}" id="inputPersonName">
                                                <div class="mt-2 mb-1 "><code>Email</code></div>
                                                <input type="text" value="${emailcustomerB}" id="inputEmailCliente">
                                                <div class="mt-2 mb-1 "><code>Teléfono</code></div>
                                                <input type="text" id="inputPhoneCliente" value="${phoneB}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Dirección</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>País</code></div>
                                                <input type="text" id="inputCountryCliente" value="${countryB}">
                                                <div class="mt-2 mb-1 "><code>Provincia</code></div>
                                                <input type="text" id="inputProvincyCliente" value="${provinceB}">
                                                <div class="mt-2 mb-1 "><code>Código postal</code></div>
                                                <input type="text" id="inputZipCodeCliente" value="${zipcodeB}">
                                                <div class="mt-2 mb-1 "><code>Cuidad</code></div>
                                                <input type="text" id="inputCityCliente" value="${cityB}">
                                                <div class="mt-2 mb-1 "><code>Dirección</code></div>
                                                <input type="text" id="inputAddressCliente" value="${addressB}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-1">
                                                <h6 class="m-0 font-weight-bold text-primary">Vehículos 0</h6>
                                            </div>
                                            <div class="card-body">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-facebook" onclick="saveNewCustomer(event, ${CLIENT_ID})" id="idSaveNewCustomer"><i class="fas fa-save"></i> Guardar</a>
                            </div>`;
    }
    pageMainContent.innerHTML = currentHtmlEntity;
}
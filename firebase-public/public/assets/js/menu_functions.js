function checkCompanyData(dataCompany){
    if(dataCompany){
        let errorsCompany = '';
        if(!dataCompany.id){ errorsCompany += 'ID empresa \n'; }
        if(!dataCompany.description){ errorsCompany += 'Nombre empresa \n';  }
        if(!dataCompany.cif){ errorsCompany += 'CIF empresa \n'; }
        if(!dataCompany.emailcliente){ errorsCompany += 'Email empresa \n'; }
        if(!dataCompany.country){ errorsCompany += 'País empresa \n'; }
        if(!dataCompany.province){ errorsCompany += 'Provincia empresa \n'; }
        if(!dataCompany.address){ errorsCompany += 'Dirección empresa \n'; }
        if(!dataCompany.zipcode){ errorsCompany += 'Código postal empresa \n'; }
        if(!dataCompany.tlf){ errorsCompany += 'Teléfono principal empresa \n'; }
        if(!dataCompany.tlf2){ errorsCompany += 'Segundo teléfono empresa \n'; }
        if(!dataCompany.price_hour){ errorsCompany += 'Precio de hora de trabajo empresa \n'; }
        if(errorsCompany != ''){
            setTimeout(()=>{
             // alert('Datos de la empresa incompletos: \n'+errorsCompany);
            }, 1000)
        }
    }
}

function crearTablaEntidadPrincipal(listData, entityData){

    let currentHtmlEntity = '<span>'+entityData.name+'</span>';
    if('empresa' == entityData.name){
        console.log(listData[0])
        let companyName  = String(listData[0].description) == 'null' ? '' : listData[0].description;
        let emailCustom  = String(listData[0].emailcliente) == 'null' ? '' : listData[0].emailcliente;
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
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Denominación</h6>
                                </div>
                                <div class="card-body">
                                    <div class="mt-2 mb-2 "><code>Nombre</code></div>
                                    <input type="text" value="`+companyName+`" id="inputCompanyName">
                                    <div class="mt-2 mb-2 "><code>Email cara cliente</code></div>
                                    <input type="text" value="`+emailCustom+`" id="inpuEmailCustom">
                                    <div class="mt-0 mb-2 "><code>CIF</code></div>
                                    <input type="text" value="`+companyCif+`" disabled>
                                    <div class="mt-2 mb-2 "><code>Email login</code></div>
                                    <input type="text" value="`+companyEmail+`" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Dirección</h6>
                                </div>
                                <div class="card-body">
                                    <div class="mt-0 mb-2 "><code>País</code></div>
                                    <input type="text" id="inputCountry" value="`+paisName+`">
                                    <div class="mt-2 mb-2 "><code>Provincia</code></div>
                                    <input type="text" id="inputProvincy" value="`+provinceName+`">
                                    <div class="mt-2 mb-2 "><code>Código postal</code></div>
                                    <input type="text" id="inputZipCode" value="`+zipcodeData+`">
                                    <div class="mt-2 mb-2 "><code>Cuidad</code></div>
                                    <input type="text" id="inputCity" value="`+cityData+`">
                                    <div class="mt-2 mb-2 "><code>Dirección</code></div>
                                    <input type="text" id="inputAddress" value="`+addressData+`">
                                    <div class="mt-2 mb-2 "><code>Teléfono principal</code></div>
                                    <input type="text" id="inputPhone1" value="`+phone1+`">
                                    <div class="mt-2 mb-2 "><code>Teléfono</code></div>
                                    <input type="text" id="inputPhone2" value="`+phone2+`">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Precío</h6>
                                </div>
                                <div class="card-body">
                                    <div class="mt-2 mb-2 "><code>Precio €/hora mano de obra</code></div>
                                    <input type="number" id="inputPriceHour" value="`+priceData+`">
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="btn btn-facebook btn-block" onclick="saveDataCompany(event)" id="idSaveDataCompany"><i class="fas fa-save"></i> Guardar</a>
                </div>`;
    } else if('empresa' == entityData.name){

    } else if('empresa' == entityData.name){

    }

    pageMainContent.innerHTML = currentHtmlEntity;
}
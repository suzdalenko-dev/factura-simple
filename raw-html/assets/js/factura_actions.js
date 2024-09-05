async function traerDatosClientArtFacturas(){
    postRequest('default/get/cliente/0', new FormData()).then(listadoClientes => {  console.log(listadoClientes)
        if(listadoClientes.res.length == 0){
            alert('Para crear factura al menos tiene que tener 1 cliente creado previamente..');
        }
        LISTADO_CLIENTES_FACTURAS = [];
        LISTADO_CLIENTES_FACTURAS = listadoClientes.res;
    });
    postRequest('default/get/articulo/0', new FormData()).then(listadoArticles => {
        if(listadoArticles.res.length == 0){
            alert('Para crear factura al menos tiene que tener 1 cliente creado previamente..');
        }
        LISTADO_ARTICULOS_FACTURAS = [];
        LISTADO_ARTICULOS_FACTURAS = listadoArticles.res;
    });
    postRequest('default/get/empresa/0', new FormData()).then(empresaData => {
        if(empresaData.res.length == 0){
            alert('Para crear factura al menos tiene que tener 1 cliente creado previamente..');
        }
        EMPRESA_FACTURAS = {};
        EMPRESA_FACTURAS = empresaData.res[0];
        document.getElementById('precioManoObra').value = EMPRESA_FACTURAS.price;
    });
}

function showFormInvoiceCreation(){
    LINE_COUNTER = 0;
    /* traer listado de clientes y articulos */
    traerDatosClientArtFacturas();

    pageTitle.innerText = 'Crear Factura'
    let htmlTipeInvoice = '<select id="selectTypeInvoice">';
    INVOICES_LIST.forEach(invoiceLine => { htmlTipeInvoice += `<option value="${invoiceLine.letter}">${invoiceLine.title}</option>`; });
    htmlTipeInvoice += '</select>';
    let htmlSkeleton = `<div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-1">
                                            <h6 class="m-0 font-weight-bold text-primary">Tipo Factura</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="mt-0 mb-1 "><code>Tipo Ordinaria/Rectificativa/Abono</code></div>
                                            ${htmlTipeInvoice}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-1">
                                            <h6 class="m-0 font-weight-bold text-primary">Datos cliente y tipo de factura</h6>
                                        </div>
                                        <div class="card-body">
                                            
                                            <div class="mt-0 mb-0"><code>Cliente ID Desarrollo</code></div>
                                            <input type="text" id="clientIdDeveloper" disabled>

                                            <div class="mt-2 mb-1 "><code>Número cliente</code></div>
                                            <input type="text" id="clientNumber" disabled>
                                            <div class="mt-2 mb-1 "><code>NIF CIF cliente</code></div>
                                            <input type="text" id="inputNifCif" disabled>
                                            <div class="mt-2 mb-1 "><code>Razón o denominación social</code></div>
                                            <input type="text" id="autocomplete_input" placeholder="Nombre cliente" oninput="handleInputClient(event)">
                                            <div id="suggestions" class="suggestions-list"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-1">
                                            <h6 class="m-0 font-weight-bold text-primary">Datos vehículo</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="mt-0 mb-1 "><code>Matrícula</code></div>
                                            <input type="text" id="inputVehicleMatricula" value="">
                                            <div class="mt-2 mb-1 "><code>Marca/Modelo</code></div>
                                            <input type="text" id="inputVehicleMarca" value="">
                                            <div class="mt-2 mb-1 "><code>Kilómetros</code></div>
                                            <input type="text" id="inputVehicleKm" value="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                   <div class="card shadow mb-3">
                                        <div class="card-header py-1">
                                            <h6 class="m-0 font-weight-bold text-primary">Líneas de factura</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-1"><code>Codígo Art.</code></div>
                                                <div class="col-lg-5"><code>Descripción Art.</code></div>
                                                <div class="col-lg-1"><code>Cantidad</code></div>
                                                <div class="col-lg-1"><code>Precio</code></div>
                                                <div class="col-lg-1"><code>IVA</code></div>
                                                <div class="col-lg-1"><code>% Dto. </code></div>
                                                <div class="col-lg-1"><code>Importe</code></div>
                                                <div class="col-lg-1"></div>
                                            </div>
                                            <div id="divContrainerNewLines">
                                                <div class="row mt-1" id="deleteDivNumber0" data-line_counter="0">
                                                    <div class="col-lg-1"><input type="number" class="suzdal_none" id="idArt0"><input type="number" disabled="" id="numberArt0"></div>
                                                    <div class="col-lg-5">
                                                        <input type="text" id="descriptionArt0" oninput="handleInputDescription(0, event)">
                                                        <div id="suggestionsArticles0" class="suggestions-list"></div>    
                                                    </div>
                                                    <div class="col-lg-1"><input type="number" id="cantidadArt0" value="1"></div>
                                                    <div class="col-lg-1"><input type="number" id="precioArt0"></div>
                                                    <div class="col-lg-1" id="ivaArt0"><select><option value="21"> 21 % </option><option value="10"> 10 % </option><option value="4"> 4 % </option><option value="0"> 0 % </option><option value="0EXENTO"> 0 EXENTO </option></select></div>
                                                    <div class="col-lg-1"><input type="number" value="0" id="descuentoArt0"></div>
                                                    <div class="col-lg-1"><input type="number" disabled="" id="totalArt0"></div>
                                                    <div class="col-lg-1"><i class="fa fa-trash" aria-hidden="true" onclick="deleteThisDiv(0)"></i></div>
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-lg-1"><span class="simulate_link" onclick="idAddNewLine()"><i class="fa fa-plus" aria-hidden="true"></i> Linea</span></div>
                                            </div>
                                            <div class="row mt-1">
                                                <div class="col-lg-1"></div>
                                                <div class="col-lg-5"><input type="text" value="Mano de obra" disabled></div>
                                                <div class="col-lg-1"><input type="number" id="cantidadManoObra" value="1"></div>
                                                <div class="col-lg-1"><input type="number" id="precioManoObra"></div>
                                                <div class="col-lg-1"><select id="ivaManoObra"><option value="21"> 21 % </option><option value="10"> 10 % </option><option value="4"> 4 % </option><option value="0"> 0 % </option><option value="0EXENTO"> 0 EXENTO </option></select></div>
                                                <div class="col-lg-1"><input type="number" value="0" id="descuentoManoObra"></div>
                                                <div class="col-lg-1"><input type="number" disabled id="totalManoObra"></div>
                                                <div class="col-lg-1"></div>
                                            </div>
                                            <br>
                                            <div class="row mb-1"><div class="col-lg-10"></div><div class="col-lg-2"><code>Subtotal: 0</code></div></div>
                                            <div class="row mb-1"><div class="col-lg-10"></div><div class="col-lg-2"><code>IVA: 0</code></div></div> 
                                            <div class="row mb-1"><div class="col-lg-10"></div><div class="col-lg-2"><code>Total: 0</code></div></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-facebook" onclick="clickCreateInvoice()" id="idCreateInvoice"><i class="fas fa-save" aria-hidden="true"></i> Crear Factura</a>
                        </div>`;

    pageMainContent.innerHTML = htmlSkeleton;
}

function invoiceCalculate(){
    setTimeout(() => {
        let divContrainerNewLines = document.getElementById('divContrainerNewLines');
        let childDivs = divContrainerNewLines.children;
        Array.from(childDivs).forEach((childDiv, index) => {
            let numeroLinea = childDiv.dataset.line_counter;

            
           
        
        }); 
    }, 1000);
}

function deleteThisDiv(x){
    let divDelete = document.getElementById('deleteDivNumber'+x);
    if(divDelete) divDelete.remove();
}

function idAddNewLine(){
    LINE_COUNTER++;
    let divContrainerNewLines = document.getElementById('divContrainerNewLines');
    let tempDiv = document.createElement('div');
    let contenidoHTML = `<div class="row mt-1" id="deleteDivNumber${LINE_COUNTER}" data-line_counter="${LINE_COUNTER}">
                            <div class="col-lg-1"><input type="number" class="suzdal_none" id="idArt${LINE_COUNTER}"><input type="number" disabled id="numberArt${LINE_COUNTER}"></div>
                            <div class="col-lg-5">
                                <input type="text" id="descriptionArt${LINE_COUNTER}" oninput="handleInputDescription(${LINE_COUNTER}, event)">
                                <div id="suggestionsArticles${LINE_COUNTER}" class="suggestions-list"></div>    
                            </div>
                            <div class="col-lg-1"><input type="number" id="cantidadArt${LINE_COUNTER}" value="1"></div>
                            <div class="col-lg-1"><input type="number" id="precioArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1" id="ivaArt${LINE_COUNTER}"><select><option value="21"> 21 % </option><option value="10"> 10 % </option><option value="4"> 4 % </option><option value="0"> 0 % </option><option value="0EXENTO"> 0 EXENTO </option></select></div>
                            <div class="col-lg-1"><input type="number" value="0" id="descuentoArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><input type="number" disabled id="totalArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><i class="fa fa-trash" aria-hidden="true" onclick="deleteThisDiv(${LINE_COUNTER})"></i></div>
                        </div>`;
    tempDiv.innerHTML = contenidoHTML;
    let newElement = tempDiv.firstElementChild;
    divContrainerNewLines.appendChild(newElement);
};

function returnIvaType(num, ivatype, iva){
    let selectedType = '';
    let htmlIva = `<select id="inputArtIva${num}">`;
    IVAS_LIST.forEach(item => {
        if(ivatype == 'norm' && item.title == iva ){ selectedType = 'selected'; }
        if(ivatype == 'exento' && item.title == '0EXENTO') { selectedType = 'selected'; }
        htmlIva += `<option value="${item.title}" ${selectedType}>${item.percentage}</option>`;
        selectedType = '';
    });
    htmlIva += '</select>';
    return htmlIva;
}

function handleInputDescription(num, event){
    let query = event.target.value.toLowerCase();  
    let suggestionsArticles = document.getElementById('suggestionsArticles'+num);
    suggestionsArticles.innerHTML = '';
    if(query){
        let i = 0;
        let filteredOptions = LISTADO_ARTICULOS_FACTURAS.filter(option => option.description.toLowerCase().includes(query));
        if (filteredOptions.length > 0) {
            suggestionsArticles.style.display = 'block';
            for(y = 0; y < filteredOptions.length; y++){
                let option = filteredOptions[y];                       
                if(i < 11){
                    let suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion_item');
                    suggestionItem.textContent = option.description;
                    suggestionItem.addEventListener('click', function() {
                        document.getElementById('idArt'+num).value      = option.id;
                        document.getElementById('numberArt'+num).value  = option.artcode;
                        document.getElementById('precioArt'+num).value  = option.price;
                        document.getElementById('ivaArt'+num).innerHTML = returnIvaType(num, option.ivatype, option.iva);
                        suggestionsArticles.innerHTML                   = '';
                        suggestionsArticles.style.display               = 'none';
                        invoiceCalculate();
                    });
                    suggestionsArticles.appendChild(suggestionItem);
                } else {
                    break;
                }
                i++;
            };
        }
    }
}

function handleInputClient(event){
    let query = event.target.value.toLowerCase();   
    let suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    if (query) {
        let i = 0;
        let filteredOptions = LISTADO_CLIENTES_FACTURAS.filter(option => option.razon.toLowerCase().includes(query));
        if (filteredOptions.length > 0) {
            suggestionsContainer.style.display = 'block';
            for(y = 0; y < filteredOptions.length; y++){
                let option = filteredOptions[y];
                if(i < 11){
                    let suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion_item');
                    suggestionItem.textContent = option.razon;
                    suggestionItem.addEventListener('click', function() {
                        document.getElementById('clientIdDeveloper').value  = option.id;
                        document.getElementById('clientNumber').value       = option.clientcode;
                        document.getElementById('inputNifCif').value        = option.cif_nif;
                        document.getElementById('autocomplete_input').value = option.razon;
                        suggestionsContainer.innerHTML = '';
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                } else {
                    break;
                }
                i++;
            };
        }
    }
}

function clickCreateInvoice(){
    
}


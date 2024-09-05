let LISTADO_CLIENTES_FACTURAS = []
async function traerDatosClienteFacturas(){
    let url = 'default/get/cliente/0';
    let formData = new FormData();
    postRequest(url, formData).then(listadoClientes => {
        if(listadoClientes.res.length == 0){
            alert('Para crear factura al menos tiene que tener 1 cliente creado previamente..');
        }
        LISTADO_CLIENTES_FACTURAS = [];
        LISTADO_CLIENTES_FACTURAS = listadoClientes.res;
    });
}

function showFormInvoiceCreation(){
    LINE_COUNTER = 0;
    /* traer listado de clientes */
    traerDatosClienteFacturas();

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
                                            <div class="row">    
                                                <div class="col-lg-1"><input type="number" class="suzdal_none" id="idArt0"><input type="number" disabled id="numberArt0"></div>
                                                <div class="col-lg-5"><input type="text" id="descriptionArt0"></div>
                                                <div class="col-lg-1"><input type="number" id="cantidadArt0"></div>
                                                <div class="col-lg-1"><input type="number" id="precioArt0"></div>
                                                <div class="col-lg-1"><select id="ivaArt0"></select></div>
                                                <div class="col-lg-1"><input type="number" value="0" id="descuentoArt0"></div>
                                                <div class="col-lg-1"><input type="number" disabled id="totalArt0"></div>
                                                <div class="col-lg-1"></div>
                                            </div>
                                            <div id="divContrainerNewLines"></div>
                                            <div class="row mt-4">
                                                <div class="col-lg-1"><span class="simulate_link" onclick="idAddNewLine()"><i class="fa fa-plus" aria-hidden="true"></i> Añadir linea</span></div>
                                                <div class="col-lg-5"></div>
                                            </div>
                                            <div class="row"><div class="col-lg-10"></div><div class="col-lg-2"><code>Total: 0</code></div></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-facebook" onclick="clickCreateInvoice()" id="idCreateInvoice"><i class="fas fa-save" aria-hidden="true"></i> Crear Factura</a>
                        </div>`;

    pageMainContent.innerHTML = htmlSkeleton;
}

function deleteThisDiv(x){
    let divDelete = document.getElementById('deleteDivNumber'+x);
    if(divDelete) divDelete.remove();
}
/*
<script>
        // Obtener el contenedor con ID 'mDiv'
        const container = document.getElementById('mDiv');

        // Crear un nuevo elemento
        const newElement = document.createElement('span');
        newElement.textContent = 'Nuevo hijo';

        // Añadir el nuevo elemento al final de los hijos existentes
        container.appendChild(newElement);
    </script>
*/
function idAddNewLine(){
    LINE_COUNTER++;
    let divContrainerNewLines = document.getElementById('divContrainerNewLines');
    let tempDiv = document.createElement('div');
    let contenidoHTML = `<div class="row mt-1" id="deleteDivNumber${LINE_COUNTER}" data-line_counter="${LINE_COUNTER}">
                            <div class="col-lg-1"><input type="number" class="suzdal_none" id="idArt${LINE_COUNTER}"><input type="number" disabled id="numberArt${LINE_COUNTER}"></div>
                            <div class="col-lg-5"><input type="text" id="descriptionArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><input type="number" id="cantidadArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><input type="number" id="precioArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><select id="ivaArt${LINE_COUNTER}"></select></div>
                            <div class="col-lg-1"><input type="number" value="0" id="descuentoArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><input type="number" disabled id="totalArt${LINE_COUNTER}"></div>
                            <div class="col-lg-1"><i class="fa fa-trash" aria-hidden="true" onclick="deleteThisDiv(${LINE_COUNTER})"></i></div>
                        </div>`;
    tempDiv.innerHTML = contenidoHTML;
    let newElement = tempDiv.firstElementChild;
    divContrainerNewLines.appendChild(newElement);
};

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
    let divContrainerNewLines = document.getElementById('divContrainerNewLines');
    let childDivs = divContrainerNewLines.children;
    Array.from(childDivs).forEach((childDiv, index) => {
        let  dataValue = childDiv.dataset.line_counter;
        
        console.log('line_counter='+dataValue);
        console.log(child, index);
    
    }); 
}
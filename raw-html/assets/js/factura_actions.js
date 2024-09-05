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
    /* traer listado de clientes */
    traerDatosClienteFacturas()

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
                                            <div class="mt-2 mb-1 "><code>Marca</code></div>
                                            <input type="text" id="inputVehicleMarca" value="">
                                            <div class="mt-2 mb-1 "><code>Modelo</code></div>
                                            <input type="text" id="inputVehicleModelo" value="">
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
                                                <div class="col-lg-1"><code>Dto.</code></div>
                                                <div class="col-lg-1"><code>Importe</code></div>
                                                <div class="col-lg-1"></div>
                                            </div>
                                            <div class="row">    
                                                <div class="col-lg-1"><input type="number" class="suzdal_none"><input type="number" disabled></div>
                                                <div class="col-lg-5"><input type="text"></div>
                                                <div class="col-lg-1"><input type="number"></div>
                                                <div class="col-lg-1"><input type="number"></div>
                                                <div class="col-lg-1"><code>IVA</code></div>
                                                <div class="col-lg-1"><input type="number" value="0"></div>
                                                <div class="col-lg-1"><input type="number" disabled></div>
                                                <div class="col-lg-1"></div>
                                            </div>
                                            <div id="divContrainerNewLines"></div>
                                            <div class="row mt-4">
                                                <div class="col-lg-1"><a href="#" onclick="idAddNewLine()"><i class="fa fa-plus" aria-hidden="true"></i> Añadir linea</a></div>
                                                <div class="col-lg-5"></div>
                                            </div>
                                            <div class="row"><div class="col-lg-10"></div><div class="col-lg-2"><code>Total: </code></div></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-facebook btn-block" onclick="clickCreateInvoice()" id="idCreateInvoice"><i class="fas fa-save" aria-hidden="true"></i> Crear Factura</a>
                        </div>`;

    pageMainContent.innerHTML = htmlSkeleton;
}

function idAddNewLine(){
    let divContrainerNewLines = document.getElementById('divContrainerNewLines');
    let contenidoHTML = divContrainerNewLines.innerHTML;
        contenidoHTML += `<div class="row mt-1">
                            <div class="col-lg-1"<input type="number" class="suzdal_none"><input type="number" disabled></div>
                            <div class="col-lg-5"><input type="text"></div>
                            <div class="col-lg-1"><input type="number"></div>
                            <div class="col-lg-1"><input type="number"></div>
                            <div class="col-lg-1"><code>IVA</code></div>
                            <div class="col-lg-1"><input type="number" value="0"></div>
                            <div class="col-lg-1"><input type="number" disabled></div>
                            <div class="col-lg-1"><i class="fa fa-trash" aria-hidden="true"></i></div>
                        </div>`;
    divContrainerNewLines.innerHTML = contenidoHTML;
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

}
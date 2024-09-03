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
                                    <div class="col-lg-6">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-3">
                                                <h6 class="m-0 font-weight-bold text-primary">Datos cliente y tipo de factura</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Tipo Ordinaria/Rectificativa/Abono</code></div>
                                                ${htmlTipeInvoice}
                                                <div class="mt-3 mb-1 "><code>Cliente ID Desarrollo</code></div>
                                                <input type="text" id="clientIdDeveloper" disabled>
                                                <div class="mt-3 mb-1 "><code>NIF CIF cliente</code></div>
                                                <input type="text" id="inputNifCif" disabled>
                                                <div class="mt-3 mb-1 "><code>Razón o denominación social</code></div>
                                                <input type="text" id="autocomplete_input" placeholder="Nombre cliente" oninput="handleInputClient(event)">
                                                <div id="suggestions" class="suggestions-list"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card shadow mb-4">
                                            <div class="card-header py-3">
                                                <h6 class="m-0 font-weight-bold text-primary">Datos vehículo</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mt-0 mb-1 "><code>Matrícula</code></div>
                                                <input type="text" id="inputCountryCliente" value="">
                                                <div class="mt-3 mb-1 "><code>Marca</code></div>
                                                <input type="text" id="inputProvincyCliente" value="">
                                                <div class="mt-3 mb-1 "><code>Modelo</code></div>
                                                <input type="text" id="inputZipCodeCliente" value="">
                                                <div class="mt-3 mb-1 "><code>Kilómetros</code></div>
                                                <input type="text" id="inputCityCliente" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <a href="#" class="btn btn-facebook btn-block" onclick="clickCreateInvoice()" id="idCreateInvoice"><i class="fas fa-save" aria-hidden="true"></i> Crear Factura</a>
                        </div>`;

    pageMainContent.innerHTML = htmlSkeleton;
}


function handleInputClient(event){
    let query = event.target.value.toLowerCase();
    console.log(LISTADO_CLIENTES_FACTURAS)
   

    let suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    if (query) {
        let i = 0;
        let filteredOptions = LISTADO_CLIENTES_FACTURAS.filter(option => option.razon.toLowerCase().includes(query));
        if (filteredOptions.length > 0) {
            suggestionsContainer.style.display = 'block';
            filteredOptions.forEach(option => {
                if(i < 3){
                    let suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion_item');
                    suggestionItem.textContent = option.razon;
                    suggestionItem.addEventListener('click', function() {
                        document.getElementById('clientIdDeveloper').value  = option.id;
                        document.getElementById('inputNifCif').value        = option.cif_nif;
                        document.getElementById('autocomplete_input').value = option.razon;
                        suggestionsContainer.innerHTML = '';
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                }
                i++;
            });
        }
    }
}
function showHtmlRepors(){
    pageTitle.innerHTML = 'Informes';
    pageMainContent.innerHTML = `<div class="container-fluid">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-1">
                                            <h6 class="m-0 font-weight-bold text-primary">Total informes 4</h6>
                                        </div>
                                        <div class="card-body">
                                            <div><!--  class=table-responsive -->
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <table class="table table-bordered dataTable">
                                                            <thead><tr><th>Entidad</th><th>Nombre</th><th>Fecha desde</th><th>Fecha Hasta</th><th></th></tr></thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Factura</td>
                                                                    <td><a onclick="excelFileListEntity('facturas')" href="#ListInvoices">Listado facturas</a></td>
                                                                    <td><input type="date" id="default_from" /></td>
                                                                    <td><input type="date" id="default_to" /></td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Cliente</td>
                                                                    <td><a onclick="excelFileListEntity('clientes')" href="#ListClients">Listado clientes</a></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Artículo</td>
                                                                    <td><a onclick="excelFileListEntity('articulos')" href="#ListArticles">Listado artículos</a></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td> </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

}

function excelFileListEntity(current_entity){
    let formData = new FormData();
    let default_from = document.getElementById('default_from').value.trim();
    let default_to = document.getElementById('default_to').value.trim();
    if('facturas' == current_entity && default_from && default_to){ 
        formData.append('default_from', default_from);
        formData.append('default_to', default_to);
    }
    postRequest('reports/get/'+current_entity, formData).then(excelRes => {
        let excelUrl = excelRes.url
        window.open(HTTP_URL+excelUrl, '_blank')
    });
}
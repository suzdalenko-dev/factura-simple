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
                                                            <thead><tr><th>Entidad</th><th>Nombre</th><th>Fecha desde</th><th>Fecha Hasta</th><th>Desglose</th></tr></thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Factura</td>
                                                                    <td><a onclick="excelFileListEntity('facturas')" href="#ListInvoices">Listado facturas</a></td>
                                                                    <td><input type="date" /></td>
                                                                    <td><input type="date" /></td>
                                                                    <td><input type="checkbox" /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Cliente</td>
                                                                    <td><a onclick="excelFileListEntity('clientes')" href="#ListClients">Listado clientes</a></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Artículo</td>
                                                                    <td><a onclick="excelFileListEntity('articulos')" href="#ListArticles">Listado artículos</a></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
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
    postRequest('reports/get/'+current_entity, formData).then(excelRes => {
        console.log(excelRes)
    });
}
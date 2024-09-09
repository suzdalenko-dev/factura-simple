function showListInvoices(x){
    console.log(x)
    let currentHtmlEntity = '';
    let tableContent      = '';
        let htmlTotalClientes = 'Total Facturas 0';
        if(x.res && x.res.length > 0){
            htmlTotalClientes = `Total Facturas ${x.res.length}`;
            x.res.forEach(i => {
                tableContent += `<tr>
                                    <td>${i.fecha_expedicion}</td>
                                    <td><a onclick="showCustomInvoice(${i.id})" href="#showCustomInvoice-${i.serie_fact}">${i.serie_fact}</a></td>
                                    <td>${i.receptor_company_name}</td>
                                    <td>${i.subtotal}</td>
                                    <td>${i.importe_ivas}</td>
                                    <td>${i.total}</td>
                                    <td><a onclick="showCustomPDF(${i.id})" href="#showCustomPDF-${i.serie_fact}"><i class="fa-solid fa-file-pdf"></i></a></td>
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
                                                        <thead><tr><th>Fecha</th><th>Núm</th><th>Razón o denominación social</th><th>Subtotal</th><th>IVA</th><th>Total</th></tr></thead>
                                                        <tbody>`+tableContent+`</tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    pageMainContent.innerHTML = currentHtmlEntity;
}

function showCustomPDF(factura_id){
    postRequest('pdf/create/'+factura_id, new FormData()).then(r => {
        console.log(r.url)
        window.open(HTTP_URL+r.url, '_blank')
    });
}
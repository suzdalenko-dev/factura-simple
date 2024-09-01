function defaultController(action, entidad, id){
    pageTitle.innerText = entidad.title;
    let url = 'default/'+action+'/'+entidad.name+'/'+id;
    let formData = new FormData();
    
    postRequest(url, formData).then(data => {
        if(data && data.res){                                       
            crearTablaEntidadPrincipal(data.res, entidad)
            checkCompanyData(data.company)
        } else {
            alert('Error al traer datos 3 '+ entidad.name);
        }
    }).catch(error => {
        alert('Error al traer datos 2 ' + error)
        console.log('Error al traer datos 2 '+ entidad.name + error);
    });
}

defaultController(DEFAULT_ACTION, DEFAULT_ENTITY, 0);
// crearAddArticleCustomInvoice({'name':'cliente', 'title':'Crear Cliente'});
// crearAddArticleCustomInvoice({'name':'articulo', 'title':'Crear Artículo'});


/* button en left menu */
document.getElementById('facturaClick').addEventListener('click', () => {
    DEFAULT_ENTITY = {name:'factura', title:'Facturas'};
    defaultController('get', DEFAULT_ENTITY, 0);
});

document.getElementById('clienteClick').addEventListener('click', () => {
    DEFAULT_ENTITY = {name:'cliente', title:'Clientes'};
    defaultController('get', DEFAULT_ENTITY, 0);
});

document.getElementById('articuloClick').addEventListener('click', () => {
    DEFAULT_ENTITY = {name:'articulo', title:'Artículos'};
    defaultController('get', DEFAULT_ENTITY, 0);
});

document.getElementById('miEmpresaClick').addEventListener('click', () => {
    DEFAULT_ENTITY = {name:'empresa', title:'Mi Empresa'};
    defaultController('get', DEFAULT_ENTITY, 0);
});


/* botones +article, +customer +invoice */
document.getElementById('addArticleClick').addEventListener('click', () => {
    crearAddArticleCustomInvoice({'name':'articulo', 'title':'Crear Artículo'});
});

document.getElementById('addCustomerClick').addEventListener('click', () => {
    crearAddArticleCustomInvoice({'name':'cliente', 'title':'Crear Cliente'});
});

document.getElementById('addInvoiceClick').addEventListener('click', () => {
    crearAddArticleCustomInvoice({'name':'factura', 'title': 'Crear Factura'});
});



/* search input */
document.getElementById('searchInputId').addEventListener('input', () => {
    alert('En desarrollo..');
    document.getElementById('searchInputId').value = '';
});

document.getElementById('buttonIdSearch').addEventListener('click', () => {
    alert('En desarrollo..');
});
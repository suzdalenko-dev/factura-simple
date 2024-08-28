let DEFAULT_ACTION = 'get';
let DEFAULT_ENTITY = {name:'factura', title:'Facturas'};

let paginaTitulo = document.getElementById('paginaTitulo');
let tablaTitulo  = document.getElementById('tablaTitulo');

function defaultController(action, entidad, id){
    paginaTitulo.innerText = entidad.title;
    tablaTitulo.innerText  = 'Cargando..'; 
    let url = 'default/'+action+'/'+entidad.name+'/'+id;
    let formData = new FormData();
    
    postRequest(url, formData).then(data => {
        if(data && data.res){
            tablaTitulo.innerText = entidad.title+' '+data.res.length ;
            crearTablaEntidadPrincipal(data.res, entidad)
        } else {
            console.log('Error al traer datos '+ entity);
        }
        console.log(data.res)
    })
    .catch(error => {
        console.log('Error al traer datos 2 '+ entity + error);
    });
}

defaultController(DEFAULT_ACTION, DEFAULT_ENTITY, 0);

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

function crearTablaEntidadPrincipal(listData, entityData){
    
}
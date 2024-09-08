let DEFAULT_ACTION = 'get';
let DEFAULT_ENTITY = {name:'factura', title:'Facturas'};

    DEFAULT_ENTITY = {name:'empresa', title:'Mi Empresa'}; // borrar esto despues
    DEFAULT_ENTITY = {name:'articulo', title:'Artículos'};
    DEFAULT_ENTITY = {name:'cliente', title:'Clientes'};

let pageTitle       = document.getElementById('pageTitle');
let pageMainContent = document.getElementById('pageMainContent');

let LISTADO_CLIENTES_FACTURAS  = [];
let LISTADO_ARTICULOS_FACTURAS = [];
let EMPRESA_FACTURAS           = {};
let LINE_COUNTER               = 0;
let FACTURA_LINEAS             = {};
let DESGLOSE = [
    { iva:21, valor:0 },
    { iva:10, valor:0 },
    { iva:4, valor:0 },
    { iva:0, valor:0 },
    { iva:'0EXENTO', valor:0 },
]
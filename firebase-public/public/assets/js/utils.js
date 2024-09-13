let pageUrlD = window.location.href;


if(pageUrlD.includes('register')){
    setInterval(() => {
        document.title = 'Registrar una cuenta - Factura Simple '+globalCurrentDate();
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Software de gestión de las facturas y clientes para pequeño comercio, taller, autónomo '+globalCurrentDate());
        }
    }, 1000);
} else if (pageUrlD.includes('forgot-password')){
    setInterval(() => {
        document.title = '¿Ha olvidado su contraseña? - Factura Simple '+globalCurrentDate();
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Software de gestión de las facturas y clientes para pequeño comercio, taller, autónomo '+globalCurrentDate());
        }
    }, 1000);
} else if(pageUrlD.includes('dashboard')){
    setInterval(() => {
        document.title = 'Dashboard - Factura Simple '+globalCurrentDate();
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Software de gestión de las facturas y clientes para pequeño comercio, taller, autónomo '+globalCurrentDate());
        }
    }, 5000);
} else {

    document.title = 'Factura Simple '+globalCurrentDate();
    document.getElementById('date_time_id').innerHTML = globalCurrentDate()

    setInterval(() => {
        document.title = 'Factura Simple '+globalCurrentDate();
        document.getElementById('date_time_id').innerHTML = globalCurrentDate();
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Software de gestión de las facturas y clientes para pequeño comercio, taller, autónomo '+globalCurrentDate());
        }
    }, 1000);
}

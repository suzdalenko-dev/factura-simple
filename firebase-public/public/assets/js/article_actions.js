function saveNewArticle(event){
    event.preventDefault();

    let inputArticleName = document.getElementById('inputArticleName').value.trim();
    if(!inputArticleName) { alert('Nombre'); return; }
    let inpuArticlePrice = document.getElementById('inpuArticlePrice').value.trim();
    if(!inpuArticlePrice) {alert('Precío'); return; }
    let idNewArticle = document.getElementById('idNewArticle')
        idNewArticle.innerHTML = '<i class="fas fa-save"></i> Guardando..';

    let formData = new FormData();
        formData.append('description', inputArticleName);
        formData.append('price', inpuArticlePrice);

    postRequest('default/put/articulo/0', formData).then(dataArticle => {
        try{
            DEFAULT_ENTITY = {name:'articulo', title:'Artículos'};
            defaultController('get', DEFAULT_ENTITY, 0);
        } catch (error) {
            alert('Error al grabar artículo '+error);
        }
    });

    setTimeout(() => {
        if(idNewArticle){
            idNewArticle.innerHTML = '<i class="fas fa-save"></i> Guardar';
        }
    }, 11000);
}


function editArticleClick(article_obj){
    alert('En desarrollo..');
}

function deleteArticleClick(article_obj){
    alert('En desarrollo..');
}
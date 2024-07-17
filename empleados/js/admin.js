window.onload = init;

function init(){
    //btn Eliminar
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        
        window.location.href = "delete.html"
    });
    //btn Modificar
    document.querySelector('.btn-primary').addEventListener('click', function() {
        
        window.location.href = "modify.html"
    });
    //btn Obtener
    document.querySelector('.btn-info').addEventListener('click', function() {
        
        window.location.href = "get.html"
    });
    
    document.querySelector('.btn-reg').addEventListener('click', function() {
        
        window.location.href = "signin.html"
    }); 
}
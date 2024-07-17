window.onload = init;
var url = 'http://localhost:3000';
var headers = {};

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }
    else{
        window.location.href = "index.html";
    }
    //Entrar
    document.querySelector('.btn-primary').addEventListener('click', borrar);
    
}

function borrar(){
    var id = document.getElementById('input-id').value;
    
    axios({
        method: 'delete',
        url: url + '/user/delete/' + id
    }, headers).then(function(res) {
        console.log(res);
        alert("Usuario eliminado correctamente");
    }).catch(function(err){
        console.log(err);
    })
}
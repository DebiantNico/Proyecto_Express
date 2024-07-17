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
    //btn Buscar
    document.querySelector('.btn-primary').addEventListener('click', buscar);
}

function buscar(){
    var name = document.getElementById('input-name').value;
    
    axios({
        method: 'get',
        url: url + '/user/' + name 
    },headers).then(function(res) {
        console.log(res);
        displayuser(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayuser(user){
    var body = document.querySelector("body");
    body.innerHTML += 
    `<h3>ID del usuario: ${user[0].user_id}</h3>
     <h3>Nombre: ${user[0].user_name}</h3>
     <h3>Apellido: ${user[0].user_lastname}</h3>
     <h3>Número: ${user[0].user_number}</h3>
     <h3>Correo: ${user[0].user_mail}</h3>
     <h3>Dirección: ${user[0].user_address}</h3>`;
}
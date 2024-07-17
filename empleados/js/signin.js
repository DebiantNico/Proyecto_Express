window.onload = init;
var url = 'http://localhost:3000';

function init(){
    //boton de Registro
    document.querySelector('.btn-secondary').addEventListener('click', function() {

        window.location.href = "login.html"
    });
// boton de Entrar
    document.querySelector('.btn-primary').addEventListener('click', signin);
   
}

function signin(){
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var number = document.getElementById('input-number').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value; 
    var address = document.getElementById('input-address').value;

    axios({
        method: 'post',
        url: url + "/user/signin",
        data: {
            user_name: name,
            user_lastname: lastname,
            user_number: number,
            user_mail: mail, 
            user_password: pass,
            user_address: address
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })
}
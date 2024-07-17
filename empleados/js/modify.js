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
    //btn "Entrar"
    document.querySelector('.btn-primary').addEventListener('click', modify);
    
}


function modify(){
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var number = document.getElementById('input-number').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value; 
    var address = document.getElementById('input-address').value;

    axios({
        method: 'put',
        url: url + '/user/put/' + id,
        data: {
            user_id: id,
            user_name: name,
            user_lastname: lastname,
            user_number: number,
            user_mail: mail, 
            user_password: pass,
            user_address: address
        }
    }, headers).then(function(res) {
        console.log(res);
        alert("Usuario modificado correctamente");
        window.location.href = "admin.html";
    }).catch(function(err){
        console.log(err);
    })
}
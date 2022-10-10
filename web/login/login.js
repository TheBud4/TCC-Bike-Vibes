
async function logar(){
    var email = document.getElementById('email')
    var senha = document.getElementById('senha')
   fetch('http://localhost:3333/user',{
    method:'POST',
    body:email,senha
}).then(async (res)=>{
    var status = await res.text()
    if(status == 'OK'){
        location.href = '../Logado/Usuario/Main/main-page.html'
    }else{
        console.log(status);
        alert('nome ou senha incorretos')
    }
})
}


async function Cadastro(){
    var nome = document.getElementById('email').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var confirmacaosenha = document.getElementById('confirmacaosenha').value
    var data = {
        nome,
        email,
        senha,
        confirmacaosenha
    }
  var fetchRes = fetch('http://localhost:3333/user/register',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    body:JSON.stringify(data)
  });
  fetchRes.then(async (res)=>{
    var status = await res.text()
    if(status == 'OK'){
        location.href = '../Logado/Usuario/Main/main-page.html'
    }
    else{
        function warning(){ 
            const divAlert = document.querySelector('.alert')
                const message = `<span class='alert'>nome ou senha incorretos</span>`
                divAlert.innerHTML =  message 
                }
          warning()
          
         
    }
})
}


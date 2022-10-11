async function logar(){
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var data = {
        email,
        senha
    }
  var fetchRes = fetch('http://localhost:3333/user',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    body:JSON.stringify(data)});
  
  fetchRes.then(async (res)=>{
    var status = await res.text()
    if(status == 'OK'){
        location.href = '../Logado/Usuario/Main/main-page.html'
    }
    else{
        function warning(){ 
            const divContainer = document.querySelector('.container')
                const message = `<span class='alert'>nome ou senha incorretos</span>`
                divContainer.innerHTML = message 
                }
                warning()
                
    }
})
}



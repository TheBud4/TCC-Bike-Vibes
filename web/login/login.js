 function logar(){
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var data = {
        email,
        senha
    }
 fetch('http://localhost:3333/user',{
    method:'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    body:JSON.stringify(data)
  })
  .then( async (response)=>{
   var status =  response.json()
   await console.log(status);
   await  console.log(response.json);
  if(status == 'OK'){
     var usuario = res.json()
     await  localStorage.setItem("Usuario",usuario)
        location.href = '../Logado/Usuario/Main/main-page.html'
    }
    if (status == 'ADM') {
      location.href = '../Logado/Admin/Main/main.html'
    }
    if(status == 'NO'){
        function warning(){ 
            const divAlert = document.getElementById('alert')
                const message = `<span class='alert'>nome ou senha incorretos</span>`
                divAlert.innerHTML =  message 
                }
          warning()
    }
  })
}



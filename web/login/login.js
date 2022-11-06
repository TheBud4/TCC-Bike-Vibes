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
    body:JSON.stringify(data)
  });
  console.log(data);
  fetchRes.then(async (res)=>{
    var status = await res.text()
    if(status == 'OK'){
        location.href = '../Logado/Usuario/Main/main-page.html'
        
    }
    if (status == 'ADM') {
      location.href = '../Logado/Admin/Main/main.html'
    }
    if(status == 'NO'){
        function warning(){ 
            const divAlert = document.querySelector('.alert')
                const message = `<span class='alert'>nome ou senha incorretos</span>`
                divAlert.innerHTML =  message 
                }
          warning()
          
         
    }
})
}



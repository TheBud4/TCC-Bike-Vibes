
async function logar(){
var email = document.getElementById('email').value
var senha = document.getElementById('senha').value
var data = {
  email,
  senha
}
  const req = await fetch('http://localhost:3333/user',{
    method:'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
    body:JSON.stringify(data)
  }).then( async (res)=>{
   var data =  res.json()
    console.log(data);
  /*if(response == 'OK'){
     var usuario = res.json()
     localStorage.setItem("Usuario",usuario)
        location.href = '../Logado/Usuario/Main/main-page.html'
    }
    if (response == 'ADM') {
      location.href = '../Logado/Admin/Main/main.html'
    }
    if(response == 'NO'){
        function warning(){ 
            const divAlert = document.getElementById('alert')
                const message = ``
                divAlert.innerHTML =  message 
                }
          warning()
    }*/
  }).then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}



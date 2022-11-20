
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
   var data =  await res.json()
  if(!(!data)){
     localStorage.setItem("Usuario",JSON.stringify(data))
        location.href = '../Logado/Usuario/Main/main-page.html'
    }
    else if (data.Padm == 'ADM') {
      location.href = '../Logado/Admin/Main/main.html'
    }
    else if(!data){
        function warning(){ 
            const divAlert = document.getElementById('alert')
                const message = ``
                divAlert.innerHTML =  message 
                }
          warning()
    }
  })
}
logar();


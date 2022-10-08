
async function postUsuario(){
    const res = await fetch('http://localhost:3333/user')
    const users = await res.json()
    const status = await res.status()
    if(status = 201){
        window.location.href ='../Logado/Usuario/Main/main-page.html'
    }
   }



postUsuario()


async function getUsuario(){
 const res = await fetch('http://localhost:3333/user')
 const users = await res.json()
 console.log(users);
}
function submitLogin(){

    
    if (Padm = true){
        window.location.href('../Logado/Admin/main-page.html')

    }
else{
    window.location.href('../Logado/Usuario/Main/main-page.html')
}
}
getUsuario()
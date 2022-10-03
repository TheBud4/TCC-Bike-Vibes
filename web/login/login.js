
async function getUsuario(){
 const res = await fetch('http://localhost:3333/user')
 const users = await res.json()
 console.log(users);
}

getUsuario()
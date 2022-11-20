

const DIVinfo = document.querySelector('.informacoes')

async function getUsuario(){
 var data = JSON.parse(localStorage.getItem("Usuario"))
  
  console.log(data);
    if (!(!data)) {
      var HTMLuser = `
      <h2>Perfil de usuario</h2>
      <div class="items">
      <span class = "title">Nome</span>
      <span class = "field">${data.nome}</span>
      <span class = "title">E-mail</span>
      <span class = "field">${data.email}</span>
      <span class = "title">CPF</span>
      <span class = "field">${data.CPF}</span>
      <span class = "title">Telefone</span>
      <span class = "field">${data.telefone}</span>
      <span></span>
      </div>
      `
      DIVinfo.innerHTML = DIVinfo.innerHTML + HTMLuser

    } else {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Erro na obtenção do usuario</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    }
  }

 getUsuario()
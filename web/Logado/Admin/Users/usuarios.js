//Get dos usuarios

const divUsuarios = document.querySelector(".usuarios");
async function getUsuario() {
  const res = await fetch("http://localhost:3333/user/get");
  const users = await res.json();
  mostraUsuarios(users);
}
function mostraUsuarios(users) {
  users.forEach((usuario) => {
    const userHTML = `
      <div class="usuario">
    <img src="../../../assets/icons/person.svg" alt="">
      <div class="descricao">
      <span class = "nome">${usuario.nome}</span>
      <span class = "email">CPF: ${usuario.CPF}</span>
        <span class = "email">Email: ${usuario.email}</span>
        <span class = "telefone">Telefone: ${usuario.telefone}</span>
        <span class = "padm"> Adm: ${usuario.Padm}</span>
        <span class = "id"> Id do usuario: ${usuario.id}</span>
        </div>
        </div>
    </div>
      `;
    divUsuarios.innerHTML = divUsuarios.innerHTML + userHTML;
  });
}
getUsuario();

// add administrador

function addAdm() {
  var id = document.getElementById("id").value;
  let data = {
    id,
  };
  var fetchRes = fetch("http://localhost:3333/user/adm", {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  fetchRes.then(async (res) => {
    var status = await res.text();
    console.log(status);
    if (status == "OK") {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Administrador adicionado</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    } else {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Administrador não adicionado</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    }
  });
}

// excluir adm

function removeAdm() {
  var id = document.getElementById("idremove").value;
  let data = {
    id,
  };
  var fetchRes = fetch("http://localhost:3333/user/adm/remove", {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  fetchRes.then(async (res) => {
    var status = await res.text();
    console.log(status);
    if (status == "OK") {
      function warning() {
        const divAlert = document.querySelector(".message");
        const message = `<span class='alert'>Administrador removido</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    } else {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Administrador não removido</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    }
  });
}

//modal add admnistrador

function modalAddAdm() {
  const navbar = document.getElementById("modal");
  navbar.classList.toggle("modal-add-adm");
  navbar.classList.toggle("modal-add-adm-opened");
}

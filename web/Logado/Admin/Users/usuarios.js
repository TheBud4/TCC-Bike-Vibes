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
      <span class = "nome">${usuario.nome}</span>
        <img class="cpf" src="${usuario.CPF}" alt="">
        <div class="descricao">
        <span class = "email">${usuario.email}</span>
        <span class = "telefone">${usuario.telefone}</span>
        <span class = "padm"> Id do produto: ${usuario.Padm}</span>
        <span class = "id"> Id do produto: ${usuario.id}</span>
        </div>
        </div>
    </div>
      `;
    divUsuarios.innerHTML = divUsuarios.innerHTML + userHTML;
  });
}
getUsuario();

//modal add admnistrador

function modalAddAdm() {
  const navbar = document.getElementById("modal");
  navbar.classList.toggle("modal-add-adm");
  navbar.classList.toggle("modal-add-adm-opened");
}

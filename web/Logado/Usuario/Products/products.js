const divProdutos = document.querySelector(".produtos");
async function getProduto() {
  const res = await fetch("http://localhost:3333/bikes");
  const products = await res.json();
  mostraProdutos(products);
}
function mostraProdutos(products) {
  products.forEach((product) => {
    var modelo = product.modelo;
    var img = product.prodIMG;
    var nome = product.nome;
    var descricao = product.descricao;
    var preco = product.preco;
    var id = product.id
    const produtoHTML = `
      <div class="produto">
      <div class="modelos"><span class = "modelo">${modelo}</span></div>
      <div class="corpo">
        <img class="prodIMG" src="${img}" alt="">
        <div class="descricao">
        <span class = "nome">${nome}</span>
        <span class = "desc">${descricao}</span>
        </div>
        <div class="botaocomprar">
        <span class = "preco">R$ ${preco}</span>
      
        <button class="alugar"
         type="button"
          id="adicionar"
            onclick="AddCarrinho('${nome}','${preco}',${id})"> Reservar </button>
        </div>
        </div>
    </div>
      `;
    divProdutos.innerHTML = divProdutos.innerHTML + produtoHTML;
  });
}
var list = [];

//Adicionando ao carrinho

function AddCarrinho(nome, preco,id) {
  list.unshift({ nome, preco,id });
  setList(list);
}

//somando total
function getTotal(list) {
  var total = 0;
   var totalFinal = 0
  for (var key in list) {
   total = total + parseFloat(list[key].preco);
   totalFinal = total.toFixed(2)
  }
  localStorage.setItem("totalFinal", totalFinal);
   document.getElementById("total").innerHTML = totalFinal;
   
}

//criando a tabela



function setList(list) {
  var prodId = []
  var table =
    "<thead><tr><td>Nome</td><td>Preco</td></tr></thead><tbody>";
  for (var key in list) {
    table +=
      "<tr><td>" +
      list[key].nome +
      "</td><td>" +
      list[key].preco +
    '<button class="btn-delete" onclick="deleteData(' + key +');">Deletar</button></td></tr>';
    
    prodId += {'id':list[key].id};
    // console.log(list[key].id);
    // console.log(prodId);
  }
  console.log(prodId);
  table += "</tbody>";
  localStorage.setItem("idProduto",prodId)
  document.getElementById("listTable").innerHTML = table;
  getTotal(list);
}
//Deletando Item
function deleteData(id){
		if(id === list.length - 1){
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
}

// Efetuar Aluguel
function modalAbre(){
  const navbar = document.getElementById("modal");
  navbar.classList.toggle("modal-comprar");
  navbar.classList.toggle("modal-comprar-opened");
  }
function modalAluguel(){
  modalAbre();
  function getValorTotal(){
    var totalFinal = localStorage.getItem("totalFinal");
    let total = `
    <span>Total da compra: ${totalFinal}</span>
    `
   document.getElementById("total-final").innerHTML = total;
  }
  getValorTotal();
}

function confirmaAluguel(){
  modalAbre();
  var user = JSON.parse(localStorage.getItem("Usuario"))
  var id = JSON.parse(localStorage.getItem("idProduto"))
  var data = {
    user,
    id
  }
  console.log(data);
  /*var fetchRes = fetch("http://localhost:3333/user/alugar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  fetchRes.then(async (res) => {
    var status = await res.text();
    console.log(status);
    if (status == "OK") {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Produto criado com sucesso</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    } else {
      function warning() {
        const divAlert = document.querySelector(".alert");
        const message = `<span class='alert'>Produto não criado</span>`;
        divAlert.innerHTML = message;
      }
      warning();
    }
  });*/
}
setList();
getProduto();

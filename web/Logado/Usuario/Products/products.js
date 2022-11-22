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
var ids = []
//Adicionando ao carrinho

function AddCarrinho(nome, preco,id) {
  list.unshift({ nome, preco,id });
  setList(list);

  localStorage.setItem("ProdutoLista",JSON.stringify(list))
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
  var table =
    "<thead><tr><td>Nome</td><td>Preco</td></tr></thead><tbody>";
  for (var key in list) {
    table +=
      "<tr><td>" +
      list[key].nome +
      "</td><td>" +
      list[key].preco +
    '<button class="btn-delete" onclick="deleteData(' + key +');">Deletar</button></td></tr>';
  }

  table += "</tbody>";
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

async function confirmaAluguel(){
  modalAbre();
  var user = JSON.parse(localStorage.getItem("Usuario"))
  var product = JSON.parse(localStorage.getItem("ProdutoLista"))
  var totalFinal = localStorage.getItem("totalFinal");
  var produto = product.map(function(item){
    return item.nome;
 });
  var nota = new jsPDF({
    unit: 'cm',
    format: 'letter'
  })
nota.text('Obrigado pela preferencia!', 5, 5)
nota.text("Nome: " + user.nome,2,8)
nota.text("Email:" + user.email,2,9)
 nota.text("Telefone: " + user.telefone,2,10)
 nota.text("Cpf: " +user.CPF,2,11)
nota.text("Produtos Locados: ",2,12)

nota.text(produto,2,13)

nota.text("Total: " +  totalFinal,15,18)
nota.save('nota-fiscal.pdf')
}
setList();
getProduto();

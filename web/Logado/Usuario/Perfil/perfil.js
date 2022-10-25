

const divProdutos = document.querySelector('.informacoes')
async function getProduto(){
  const res = await fetch('http://localhost:3333/user')
  const usuario = await res.json()
  mostraUsuario(usuario)
 }
  function mostraUsuario(usuario){
    usuario.forEach(product => {
      const produtoHTML = `
      <div class="produto">
      <div class="modelos"><span class = modelo>${product.modelo}</span></div>
      <div class="corpo">
        <img class="prodIMG" src="${product.prodIMG}" alt="">
        <div class="descricao">
        <span class = nome>${product.nome}</span>
        <span class = desc>${product.descricao}</span>
        </div>
        <div class="botaocomprar">
          <button class="alugar" onclick="alugarBike()">Reservar</button>
        </div>
        </div>
    </div>
      `
      divProdutos.innerHTML = divProdutos.innerHTML + produtoHTML
    });
  }

  function alugarBike(){
    
  }
 getProduto()
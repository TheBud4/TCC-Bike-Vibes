const divProdutos = document.querySelector('.produtos')
async function getProduto(){
  const res = await fetch('http://localhost:3333/bikes')
  const products = await res.json()
  mostraProdutos(products)
 }
  function mostraProdutos(products){
    products.forEach(product => {
      const produtoHTML = `
      <a href="../login/login.html">
      <div class="produto">
      <img class="prodIMG" src="${product.prodIMG}" alt="bicicleta">
      <div class="corpo">
        <div class="descricao">
        <span class = "modelo">${product.modelo}</span>
        <span class = "nome">${product.nome}</span>
        <span class = "desc">${product.preco}</span>
        </div>
        </div>
    </div>
    </a>
      `
      divProdutos.innerHTML = divProdutos.innerHTML + produtoHTML
    });
  }

  function alugarBike(){
    
  }
 getProduto()
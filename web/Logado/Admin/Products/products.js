const divProdutos = document.querySelector('.produtos')
async function getProduto(){
  const res = await fetch('http://localhost:3333/bikes')
  const products = await res.json()
  mostraProdutos(products)
 }
  function mostraProdutos(products){
    products.forEach(product => {
      const produtoHTML = 
      `
      <div class="produto">
      <div class="modelos"><span class = modelo>${product.modelo}</span></div>
      <div class="corpo">
        <img class="prodIMG" src="${product.prodIMG}" alt="">
        <div class="descricao">
        <span class = "nome">${product.nome}</span>
        <span class = "desc">${product.descricao}</span>
        <span class = "id"> Id do produto: ${product.id}</span>
        </div>
        <div class="botaocomprar">
        <span class = "desc">${product.preco}</span>
        </div>
        </div>
    </div>
      `
      divProdutos.innerHTML = divProdutos.innerHTML + produtoHTML
    });
    
  }
  getProduto()
  function modalExcluirItem(){
    const navbar= document.getElementById("modal-excluir")
    navbar.classList.toggle("modal-excluir-produto")
    navbar.classList.toggle("modal-excluir-produto-opened")
  }
  function excluirBike(){
    var id = document.getElementById('id').value
    let data = {
      id
    }
    var fetchRes = fetch('http://localhost:3333/bikes/delete',{
    method:'DELETE',
    headers:{'Content-Type': 'application/json;charset=utf-8'
  },
  body:JSON.stringify(data)
})
fetchRes.then(async (res)=>{
  var status = await res.text()
  console.log(status);
  if(status == 'OK'){
    function warning(){ 
      const divAlert = document.querySelector('.alert')
          const message = `<span class='alert'>Produto deletado com sucesso</span>`
          divAlert.innerHTML =  message
          }
    warning()
  }
  else{
      function warning(){ 
          const divAlert = document.querySelector('.alert')
              const message = `<span class='alert'>Produto não deletado</span>`
              divAlert.innerHTML =  message
              }
        warning()
  }
})
}
  function editarBike(){
    
  }

  async function addProduto() {
    var nome = document.getElementById('nome').value
    var preco = document.getElementById('preco').value
    var modelo = document.getElementById('modelo').value
    var prodIMG = document.getElementById('prodIMG').value
    var descricao = document.getElementById('descricao').value
    var data = {
        nome,
        preco,
        modelo,
        prodIMG,
        descricao
    }
  var fetchRes = fetch('http://localhost:3333/bikes/criar',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    body:JSON.stringify(data)
  });
  fetchRes.then(async (res)=>{
    var status = await res.text()
    console.log(status);
    if(status == 'OK'){
      function warning(){ 
        const divAlert = document.querySelector('.alert')
            const message = `<span class='alert'>Produto criado com sucesso</span>`
            divAlert.innerHTML =  message 
            }
      warning()
    }
    else{
        function warning(){ 
            const divAlert = document.querySelector('.alert')
                const message = `<span class='alert'>Produto não criado</span>`
                divAlert.innerHTML =  message 
                }
          warning()
          
         
    }
})
  }
  function modalAddProduto() {
    const navbar= document.getElementById("modal")
    navbar.classList.toggle("modal-add-produto")
    navbar.classList.toggle("modal-add-produto-opened")
}

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
        <span class = nome>${product.nome}</span>
        <span class = desc>${product.descricao}</span>
        </div>
        <div class="botaocomprar">
          <button class="editar" onclick="editarBike()"><img src="../../../assets/icons/PNG/editar.png" alt="editar"></button>
          <button class="excluir" onclick="excluirBike()"><img src="../../../assets/icons/x.svg" alt="excluir" ></button>
        </div>
        </div>
    </div>
      `
      divProdutos.innerHTML = divProdutos.innerHTML + produtoHTML
    });
  }

  function editarBike(){
    
  }
  function excluirBike(){
    fetch('http://localhost:3333/bikes/:id',{
    method:'DELETE',
  })  	
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
 getProduto()
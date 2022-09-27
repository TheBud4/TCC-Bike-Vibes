import { PrismaClient } from "@prisma/client"
import  express  from "express"

const app = express()
app.use(express.json())
const prisma = new PrismaClient({
    log:['query']
  })

// USUARIO
app.get('/user', async (req,res)=>{
    const users = await prisma.usuario.findMany({
        select:{
            id:true,
            nome:true,
            CPF:true,
            RG:true,
            email:true,
            senha:true
        }
    })
    return res.json(users)
})
app.post('/user',(req,res)=>{
    
})
app.post('/user/bikes', async(req,res)=>{
    const users = await prisma.usuario.findMany({
        select:{
            id:true,
            nome:true,
            CPF:true,
            RG:true,
            email:true,
            senha:true
        }
    })
    return res.json(users)
})
//PRODUTOS
app.post('/bikes',async(req,res)=>{
  const body = req.body

  const produtos = await prisma.produtos.create({
    data:{
      nome: body.nome,
      descricao:body.descricao,
      prodIMG:body.prodIMG,
      modelo:body.modelo,
    }
  })
  return res.status(201).json(produtos)
})
app.get('/bikes',async(req,res)=>{
    const bikes = await prisma.produtos.findMany({
        select:{
            id:true,
            nome:true,
            descricao:true,
            prodIMG:true,
            modelo:true
        }
    })
    return res.json(bikes)
})

//FUNCIONARIO
app.get('/admin',(req,res)=>{

})
app.post('/admin',(req,res)=>{
  
})
app.listen(3333)
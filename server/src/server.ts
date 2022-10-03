import { PrismaClient,produtos,usuario} from "@prisma/client"
import  express  from "express"
import { body,validationResult } from "express-validator"
import cors from 'cors'


const app = express()

app.use(cors())

app.use(express.json())

const prisma = new PrismaClient()

// USUARIO
app.get('/user',[
    body("email").isEmail().withMessage("O e-mail precisa ser válido"),

], async (req: express.Request,res:express.Response)=>{
    const users = await prisma.usuario.findMany({
        select:{
            id:true,
            nome:true,
            CPF:true,
            email:true,
            senha:true,

        }
    })  
    return res.json(users)
})

app.post('/user',[
    body("email").isEmail().withMessage("O e-mail precisa ser válido"),
    body('senha').isLength({ min: 8 }).withMessage("A senha deve conter ao menos 8 caracteres"),
    body('confirmacaosenha').custom((value, { req }) => {
        if (value !== req.body.senha) {
          throw new Error('As senhas não coincidem');
        }
        return true;
      })

],async(req: express.Request,res:express.Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
    const body = req.body
    const usuario = await prisma.usuario.create({
        data:{
        nome: body.nome,
        senha:body.senha,
        CPF:body.CPF,
        email:body.email,
        Padm:false,
        }
      })
      return res.status(201).json(usuario)
  }});
  //carrinho

app.post('/user/bikes', async(req,res)=>{
    const historico = await prisma.produtos.findMany({
        select:{
            id:true,
            nome:true,
            descricao:true,
            prodIMG:true,
            modelo:true,
            criacao:true,
        }
    })
    return res.json(historico)
})

//historico de compras

app.post('/user/historico', async(req,res)=>{
    
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
            modelo:true,
            criacao:true
        }
    })
    return res.json(bikes)
})

//FUNCIONARIO

app.get('/admin',(req,res)=>{

})

app.listen(3333,() =>{
    console.log('Server ta on na porta 3333');
})
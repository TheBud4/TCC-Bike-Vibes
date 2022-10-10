import { PrismaClient} from "@prisma/client"
import  express  from "express"
import { body,validationResult } from "express-validator"
import cors from 'cors'
import { Session } from "express-session"
const app = express()

app.use(cors())

app.use(express.json())

const prisma = new PrismaClient()

// USUARIO
app.post('/user', async (req: express.Request,res:express.Response)=>{
    const body = req.body
    var Bemail:string = body.email
    var Bsenha:string = body.senha
    const user = await prisma.usuario.findFirst({
        select:{
            id:true,
            nome:true,
            CPF:true,
            email:true,
            senha:true,
        },
        where:{
            email:Bemail,
            senha:Bsenha
        }
    }) 
    if (!(!user)){
        let BDemail:string = user.email
        let BDsenha:string = user.senha
        if(Bemail == BDemail && Bsenha == BDsenha){
        console.log(user);
        return res.send('OK').status(200)
    }else{
        console.log(Bemail);
        console.log(Bsenha);
        return res.send('NO').status(400)

    }
    }
    else{
        res.send('404').status(404)
    }
        
})




app.post('/user/register',[
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
app.patch('/bikes', (req,res)=>{

})
app.delete('/bikes', async(req,res)=>{
    const body = req.body
    const bikes = await prisma.produtos.delete({
        where:{
        id:body.id,
        }
 })
 return res.status(200).json(bikes)
})




//FUNCIONARIO

app.get('/admin',(req,res)=>{

})

app.listen(3333,() =>{
    console.log('Server ta on na porta 3333');
})
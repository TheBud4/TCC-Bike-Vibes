import { PrismaClient} from "@prisma/client"
import  express  from "express"
import { body,validationResult } from "express-validator"
import cors from 'cors'



const app = express()

app.use(cors())

app.use(express.json())

const prisma = new PrismaClient()

// LOGIN

app.post('/user', async (req,res)=>{
    var Bemail= req.body.email
    var Bsenha= req.body.senha
    const user = await prisma.usuario.findFirst({
        select:{
            id:true,
            nome:true,
            CPF:true,
            email:true,
            senha:true,
            Padm:true
        },
        where:{
            email:Bemail,
            senha:Bsenha
        }
    }) 
    if (!(!user)){
        let BDemail:string = user.email
        let BDsenha:string = user.senha
        let BDadm:boolean = user.Padm
        if(Bemail == BDemail && Bsenha == BDsenha){
            if(BDadm == true){
        return res.send('ADM').status(200)
            }
        return res.send('OK').status(200).redirect('/user')
        
    }else{
        return res.send('NO').status(400)
    }
    }
    else{
        res.send('NO').status(404)
    }
        
})
app.get('/user', async (req,res)=>{
    let Bemail= req.body.email
    const usuario = await prisma.usuario.findFirst({
        select:{
        id:true,
        nome:true,
        senha:true,
        CPF:true,
        email:true,
        Padm:true,
        telefone:true
        },
        where:{
            email:Bemail
        }
      })
        return res.json(usuario)
})

//CADASTRO
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
    const x =  Math.floor(Math.random() * 1000000000 + 1)
    
    const usuario = await prisma.usuario.create({
        data:{
        nome: body.nome,
        senha:body.senha,
        email:body.email,
        CPF:x.toString(),
        Padm:false,
        telefone:'',
        }
      })
        return res.status(201).send('OK')
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

app.post('/bikes/criar',async(req,res)=>{
  const body = req.body

  const produtos = await prisma.produtos.create({
    data:{
      nome: body.nome, 
      descricao:body.descricao,
      prodIMG:body.prodIMG,
      modelo:body.modelo,
      preco:body.preco,
    }
  })
  return res.status(201).send('OK')
})

app.get('/bikes',async(req,res)=>{
    const bikes = await prisma.produtos.findMany({
        select:{
            id:true,
            nome:true,
            descricao:true,
            prodIMG:true,
            modelo:true,
            criacao:true,
            preco:true
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


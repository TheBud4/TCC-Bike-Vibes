import { PrismaClient } from "@prisma/client";
import express from "express";
import { body, validationResult } from "express-validator";
import cors from "cors";
import bodyParser from "express"

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
const prisma = new PrismaClient();

// LOGIN

app.post("/user", async (req, res) => {
  var Bemail = req.body.email;
  var Bsenha = req.body.senha;
  
  const user = await prisma.usuario.findFirst({
    select: {
      id: true,
      nome: true,
      CPF: true,
      email: true,
      senha: true,
      Padm: true,
    },
    where: {
      email: Bemail,
      senha: Bsenha,
    },
  });
  if (!(!user)) {
    let BDadm: boolean = user.Padm;
      if (BDadm == true) {
        return res.json({
          "Padm": true,
        });
      }
      return res.json(user)
    }else{
    }
  });

//listagem de usuarios

app.get("/user/get", async (req, res) => {
  const usuario = await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      senha: true,
      CPF: true,
      email: true,
      Padm: true,
      telefone: true,
    }
  });
  return res.json(usuario).status(400);
});

//CADASTRO
app.post(
  "/user/register",
  [
    body("email").isEmail().withMessage("O e-mail precisa ser válido"),
    body("senha")
      .isLength({ min: 8 })
      .withMessage("A senha deve conter ao menos 8 caracteres"),
    body("confirmacaosenha").custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error("As senhas não coincidem");
      }
      return true;
    }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const body = req.body;
      const x = Math.floor(Math.random() * 1000000000 + 1);

      const usuario = await prisma.usuario.create({
        data: {
          nome: body.nome,
          senha: body.senha,
          email: body.email,
          CPF: x.toString(),
          Padm: false,
          telefone: "",
        },
      });
      return res.status(201).send("OK");
    }
  }
);

//Definir usuario adm

app.patch("/user/adm", async (req, res) => {
  const body = req.body
  const Cid = parseFloat(body.id)

  
  await prisma.usuario.update({
    where: {
      id: Cid,
    },
    data: {
      Padm:true,
    },
 })
   return res.send('OK')
});

//remover usuario adm

app.patch("/user/adm/remove", async (req, res) => {
  const body = req.body
  const Cid = parseInt(body.id, 10)
  
  await prisma.usuario.update({
    where: {
      id: Cid,
    },
    data: {
      Padm:false,
    },
 })
   return res.send('OK')
});
//carrinho

app.post("/user/bikes", async (req, res) => {
  const historico = await prisma.produtos.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      prodIMG: true,
      modelo: true,
      criacao: true,
    },
  });
  return res.json(historico);
});

//historico de compras

app.post("/user/historico", async (req, res) => {});

//criar alugel

app.post("/user/alugar", async (req, res) => {

});

//criar nota

app.post("/user/nota", async (req, res) => {


});

//PRODUTOS

app.post("/bikes/criar", async (req, res) => {
  const body = req.body
  const Bpreco = parseFloat(body.preco)

  const produtos = await prisma.produtos.create({
    data: {
      nome: body.nome,
      descricao: body.descricao,
      prodIMG: body.prodIMG,
      modelo: body.modelo,
      preco: Bpreco,
    },
  });
  return res.status(201).send("OK");
});

app.get("/bikes", async (req, res) => {

  const bikes = await prisma.produtos.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      prodIMG: true,
      modelo: true,
      criacao: true,
      preco: true,
    },
  });
  return res.json(bikes);
});
app.patch("/bikes", (req, res) => {});
app.delete("/bikes/delete", async (req, res) => {
  const body = req.body
   const Cid = parseInt(body.id, 10)
   await prisma.produtos.delete({
    where: {
      id:Cid,
    },
  })
    return res.send('OK')
});

app.listen(3333, () => {
  console.log("Server ta on na porta 3333");
});

// import { PrismaClient } from "@prisma/client"
// import { Request } from "express"

// const prisma = new PrismaClient()

// export class UserController {
//      async getUsers (req: Request, res: Response){
//         async (req: Request,res:Response)=>{
//             const users = await prisma.usuario.findMany({
//                 select:{
//                     id:true,
//                     nome:true,
//                     CPF:true,
//                     email:true,
//                     senha:true,
//                 }
//             })  
//             return res.json(users)
//         }
//     }
// }
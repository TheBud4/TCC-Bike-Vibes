import  express  from "express"

const app = express()

app.get('/user', (req,res)=>{

    return res.json(
        {
            "saudacao":"ola mundo",
            "aaa":"auau"
        }
    )
})
app.post('/user',(req,res)=>{

})
app.post('/bikes',(req,res)=>{

})
app.get('/bikes',(req,res)=>{

})
app.get('/admin',(req,res)=>{

})
app.post('/admin',(req,res)=>{
  
})
app.listen(3333)
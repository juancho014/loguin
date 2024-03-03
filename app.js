require('./src/db/mogoose')
const express = require("express")
const path= require("path");
const bcrypt= require("bcrypt");
const usuario= require("./src/model/usuarios")
const port= 3000;

const app=express();
app.use(express.json());
//app.use(cors())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))

app.get('/login',(req,res) => {
    res.render("login")
})

const salt=10;
app.post("/signup",(req,res)=>{

   const name=req.body.username
   const password=req.body.password

const existeUser=  usuario.findOne({name})
if(!existeUser){
    res.send('el usuario no existe')
}else{
    const registro= new usuario({name,password:bcrypt.hashSync(password,salt)});
  registro.save()
    .then(()=>{
        res.status(201).render('login')
        
        console.log(registro);
    })
    .catch((error)=>{res.status(400).send(error)})

}
})

app.post('/login',async (req,res)=>{
    try{
        
        const check=await usuario.findOne({name:req.body.username})
        if(!check){
            res.send("usuario no encontrado")
            
        }
        const match=await bcrypt.compare(req.body.password,check.password)
            if (match) {
                res.render("home")
            }else{
                
                res.send("password")
            }

    }catch{
        res.send("error")
    }
  
    }


)



app.get("/",(req,res)=>{
    res.render("home")
})


app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.listen(port,()=>{
    console.log(`Funcionando en http://localhost:${port}`);})
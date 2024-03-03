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

app.post("/signup",async(req,res)=>{
    
   const salt=10;
   const name=req.body.username
   const password=req.body.password

   try {
    const existeUser = await usuario.findOne({ name: name });
    if (existeUser) {
        return res.status(400).send('El usuario ya existe');
    } else {
        const hashedPassword = bcrypt.hashSync(password, salt);
        const registro = new usuario({ name, password: hashedPassword });
        await registro.save();
        res.status(201).render('login');
        console.log(registro);
    }
} catch (error) {
    res.status(400).send(error);
}
});
  




app.post('/login',async (req,res)=>{

try {
    const check=await usuario.findOne({name:req.body.username})
        if(!check){
          return res.status(400).send("usuario no encontrado debe loguearse")
            
        }
        const match=await bcrypt.compare(req.body.password,check.password)
        if (match) {
            res.render("home")
        }else{
            
            req.send("password incorrecta")
        }
    
} catch (error) {
    res.send("contraseña incorrecta")
}

})



app.get("/",(req,res)=>{
    res.render("home")
})


app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.listen(port,()=>{
    console.log(`Funcionando en http://localhost:${port}`);})
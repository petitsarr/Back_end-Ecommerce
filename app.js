import express from "express" ;
import dotenv from "dotenv" ; 
import morgan from "morgan" ;
import mongoose from "mongoose" ;
import cors from "cors"

const app = express() ;  

dotenv.config() ; 

const port = process.env.PORT ; 
const api = process.env.API_URl  ;  

// Middleware  
app.use(cors()) 

app.use(express.urlencoded({
    extended : true
})) 
app.use(express.json()) 

// morgan pour enrigistrer les requetes http pour node js (utilisation d'une chaine de format prédéfinie)
app.use(morgan('tiny')) 

//connection avec ma base de donnée .
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
.then(()=> console.log("connection à la base de donnée réussie"))
.catch(()=>console.log("connection à la base donnée échouée "))
app.get(`${api}/products` ,(req,res)=>{ 
    
    res.send("hello")
}) 


app.listen(port ,()=>{ 
    console.log(`Le serveur est lancé sur le port ${port}`)
})
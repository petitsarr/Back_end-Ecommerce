import mongoose from "mongoose" ;
import  userSchema from "../models/user" ;
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv" 

dotenv.config() 

const secret = process.env.secret 

const User = mongoose.model("User" , userSchema) ; 

// La fonction pour la connection de l'user  

const UserInscription = async (req ,res) => {
    try {  

       
        const { 
            name  ,
            email ,
            passwordHash  ,
            phone  ,
            isAdmin  ,
            street ,
            apartement ,
            zip ,
            city  ,
            country
             
            } = req.body  ;
           
        console.log("Mes datas sont ==>" ,
        name  ,
        email ,
        passwordHash  ,
        phone  ,
        isAdmin  ,
        street ,
        apartement ,
        zip ,
        city  ,
        country
        )
        let  user = new User ({
            name  ,
            email ,
            passwordHash :  await bcrypt.hash(passwordHash,10) ,
            phone  ,
            isAdmin  ,
            street ,
            apartement ,
            zip ,
            city  ,
            country
        }) 
          
           // console.log("mon nouveau user est ==>" , user) 
        // on fait le hachage du mot de pass 
        // user.passwordHash = await bcrypt.hash(user.passwordHash,10,function(err , hash){
        //     if(err) {
        //         console.log(err)
        //     }
        // })  
      //  console.log( "le nouveau password est" ,user.passwordHash)
        // On sauvegarder les données dans la base 
            await user.save()  

       if(user) {
           res.status(201).json({
               message : "use crée avec succes" ,
               user 
           })
       } 
      
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
} 

// La fonction pour la connection de l'user  

const UserConnection = async (req ,res) => { 
    try {
        const user = await  User.findOne({
            email : req.body.email
        }) 
       
        if(!user) {
            res.status(401).json({
                error :"utilisateur non trouvé "
            })
        } 
       
        else {
            bcrypt.compare(req.body.passwordHash ,  user.passwordHash) 

            .then((valid)=>{ 
            
              
                if(!valid) {
                    res.status(401).json({
                        error :"mot de pass incorrect "
                    })
                } 
                else {
                    res.status(200).json({
                        userId : user.id ,
                        token : jwt.sign(
                           { 
                                userId : user.id ,
                             // L'user admin peut se accceder à  ma parie administration   
                                isAdmin: user.isAdmin
                            } , 
                           secret  ,
                          {
                              expiresIn : "4d"
                          }
                        )
                    })
                }
            }) 
            .catch((error)=> {
                console.error(error)
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }

}

// je souhaite exclure le mot de passe 
const getUser = async(req ,res) => {
    try {
        const users= await User.find().select('-passwordHash'); 
        if(users) {
             res.status(200).json(users) 
        } 
        
    } catch (error) {
        res.status(404).json(error)
    }
}
const getUserById = async (req ,res) => {
    try {
        const user = await User.findOne(
            {
                _id : req.params.iduser
            } ,
         
        ).select('-passwordHash'); 
        if (user) {
            res.status(200).json(user)
        } 
       
    } catch (error) {
        res.status(404).send(error)
    }
} 

// Cette methode renvoie le nombre d'utlisateurs dans mon application .
const getUserCount = async (req ,res) =>{
    try { 
        const userCount  = await User.countDocuments({}) 
        
        if(userCount) {
            res.status(200).send({
                nombre_user :  userCount
            })
        }
       else { 
      
           throw new Error("User  not Found")
       }
   } catch (error) {  
     
       res.status(404).send(error)
   } 
} 

const deleteUserById = async  (req ,res) => {
    try {
        const user = await User.deleteOne({
            _id : req.params.iduser
        }) 
        if (user) {
            res.status(200).json({ 
                success : true ,
                message : "Suppression réussi"
            })
        } 
        else {
            throw new Error("suppression non réussi ")
        }
    } catch (error) {
        res.status(400).json({
            success : false , 
            message : error
        })
    }
}  
export {UserInscription , deleteUserById  , getUserCount , UserConnection,  getUser ,getUserById   } 

 
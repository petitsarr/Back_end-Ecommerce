import express from "express" ;
import {UserInscription , UserConnection  , getUserById , getUser } from "../controllers/user" 


const userRouter = express.Router() ; 



userRouter.get( "/users" , getUser) 
userRouter.get( "/users/:iduser" , getUserById)
userRouter.post("/inscription" , UserInscription)  
userRouter.post("/connection"  , UserConnection) 


export default userRouter ;
import express from "express" ;
import {UserInscription , getUserCount , UserConnection  , getUserById ,deleteUserById  , getUser } from "../controllers/user" 


const userRouter = express.Router() ; 



userRouter.get( "/users" , getUser)  
userRouter.get( "/users/count" , getUserCount) 
userRouter.get( "/users/:iduser" , getUserById) 
userRouter.get( "/users/:iduser" , deleteUserById)
userRouter.post("/inscription" , UserInscription)  
userRouter.post("/connection"  , UserConnection) 


export default userRouter ;
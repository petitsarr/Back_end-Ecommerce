import express from "express" ;
import mongoose from "mongoose" ;
import {  addCategory ,deleteCategory , getAllCategory ,getCategoryById ,updateCategoryById } from "../controllers/category" 

const routerCategory = express.Router() ; 

routerCategory.post("/categories",addCategory ) 
routerCategory.delete("/categories/:idcat",deleteCategory)  ;
routerCategory.get("/categories" ,getAllCategory )
routerCategory.get("/categories/:idcat" ,getCategoryById) ;
routerCategory.put("/categories/:idcat" , updateCategoryById)
export default routerCategory  ; 
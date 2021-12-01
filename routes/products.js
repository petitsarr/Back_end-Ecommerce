import express from "express" 
import { addNewProduct , updateProductById ,getAllProduct , getProductById} from "../controllers/product" 

 const routerProduct = express.Router() ;

 routerProduct.post("/products" , addNewProduct) ; 
 routerProduct.get("/products" ,getAllProduct) 
 routerProduct.get("/products/:idpro" , getProductById) 
 routerProduct.put("/products/:idpro",updateProductById)

 export default routerProduct ;
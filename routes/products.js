import express from "express" 
import { addNewProduct , getProductsFeatures ,getProductCount , updateProductById ,getAllProduct , deleteProductById , getProductById} from "../controllers/product" 

 const routerProduct = express.Router() ;

 routerProduct.post("/products" , addNewProduct) ;  
 //http://localhost:5000/api/v1/products?categories=61a6ecdf3a0af134ddce465b
 routerProduct.get("/products" ,getAllProduct)  ; 
 routerProduct.get("/products/count" , getProductCount) 
 routerProduct.get("/products/features/:count" , getProductsFeatures)   
 routerProduct.get("/products/:idpro" , getProductById) 
 routerProduct.put("/products/:idpro",updateProductById)
 routerProduct.delete("/products/:idpro", deleteProductById )


 export default routerProduct ;
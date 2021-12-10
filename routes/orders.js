import express from "express" ;
import  {addOrders ,getOrderById, updateOrders , getOrders ,getTotalesales ,deleteOrderById  , userOderById ,getcountOrder}  from "../controllers/orders" 


const routerOrders = express.Router() ; 

routerOrders.post("/orders",addOrders) ;
routerOrders.get("/orders",getOrders )
routerOrders.get("/orders/:id",getOrderById )  
routerOrders.delete("/orders/:id",deleteOrderById ) 
routerOrders.get("/orders/count", getcountOrder)
routerOrders.get("/orders/totalesales",getTotalesales) 
routerOrders.get("/orders/userorders/:userid", userOderById) 
routerOrders.put("/orders/:id", updateOrders)




export default routerOrders ; 
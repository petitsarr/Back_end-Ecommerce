import mongoose from "mongoose" ; 
import orderSchema from "../models/orders" ; 
import  orderItemSchema from "../models/oder-item" ;  



const Order = mongoose.model("Order" , orderSchema) 
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

// La fontion pour ajouter une nouvelle commande 

// Ces orderItems sont obtenues aprés la creation de la commande cad apres que jai ajouter des produits dans mon panier 
// soit 3 produits avec chacun  le nom de son  produit et la quantite   ===> autrement dit sa cart 



const addOrders = async (req ,res) =>  {
  try {   
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds; 
 console.log("order item id est ===>" ,orderItemsIds)

//  Promise.all  recoit un tableau de promesse et renvoi dans un tableau avec les valeurs de la promesse .
 // totalPrices est un tableau des prix totaux pour chaque article de commande...
     const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{ 
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        console.log("My orderItem est ==>", orderItem ) 
        console.log("le prix et la quantite sont ==>" ,  orderItem.product.price,orderItem.quantity )
         const totalPrice = orderItem.product.price * orderItem.quantity;
         return totalPrice
     }))  

     // totalPrices est un tableau avec les valeurs de la promesse 
    console.log("total prices est ==>", totalPrices) 

 // Calcule du cout total des commandes ...
     const totalPrice = totalPrices.reduce((a,b) => a +b , 0);
     console.log(" cout total definitif price est ==>", totalPrice  )



   let order = new Order(
          {
            orderItems: orderItemsIdsResolved,
             shippingAddress1: req.body.shippingAddress1,
           shippingAddress2: req.body.shippingAddress2,
           city: req.body.city,
           zip: req.body.zip,
            country: req.body.country,
           phone: req.body.phone,
           status: req.body.status,
          totalPrice:  totalPrice ,
          user: req.body.user
         }) 
         console.log("Mes nouveaux commandes à ajoutés sont ==>" , order) ;
         await order.save() 
    if(order) {
        res.status(201).json( {
            message : "Commande ajouté avec success" ,
            orders : order
        })
    } 
          
  } catch (error) {
    res.status(400).send(error)
  }

}  

// La fonction pour recuprer les commandes .

const getOrders = async (req ,res) => {
    try {
        const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

        if(!orderList) {
            res.status(500).json({success: false})
        } 
        res.send(orderList);
        
    } catch (error) {
        res.status(404).json(error)
    }
} 
// La fonction pour recuperer une commande .
const getOrderById = async (req ,res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({ 
            path: 'orderItems', populate: {
                path : 'product', populate: 'category'} 
            }); 
        if(!order) {
            res.status(500).json({success: false})
        } 
        res.send(order);
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }   
}  

// la fonction pour supprimer une commande ainsi les articles de commmandes correspondant. 

const deleteOrderById = async (req ,res)=> {
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        //Apres avoir supprimé la commande je map sur orderItems pour supprimer les articles de commandes aussi
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
} 

// La fonction qui permet d'avoir le nombre de commande
 const getcountOrder = async (req ,res)=> {
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
 } 

//  Cette fonction permet de Lister  les commandes d'un user  

 const userOderById = async (req ,res) => {
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
 } 

const getTotalesales = async (req ,res) => {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])
  console.log(totalSales)
    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
}

// La fonction qui permet de mettre à jour le status de la commande . 

const updateOrders = async(req ,res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).send('the order cannot be update!')

    res.send(order);
}

export {addOrders ,getOrderById,  getcountOrder, updateOrders , getOrders ,getTotalesales ,deleteOrderById  , userOderById }
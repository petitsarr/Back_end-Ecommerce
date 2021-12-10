 import mongoose from "mongoose" ; 

 const orderSchema = new mongoose.Schema({
    //  La commande est lié au article de commande (élément de commande ) par tableau .
    // la table orderItem peut etre considere comme une tableau de commande 
     orderItems : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "OrderItem",
        required : true 
     }] ,
    //  l'adresse de livraison 
     shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },

    // la cité 
    city: {
        type: String,
        required: true,
    }, 
    // le code postal 
    zip: {
        type: String,
        required: true,
    },
    // le pays
    country: {
        type: String,
        required: true,
    }, 
    // Le numero
    phone: {
        type: String,
        required: true,
    },
    // ceci signifie si le status de la commande :  s'il est livré  ,en attente ou non 
// pending signifie en attente .
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    // le prix total 
    totalPrice: {
        type: Number,
    }, 
    // l'user qui a fait la commande .
    // reference a la collection user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    // date de commande 
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
 }) 
 
orderSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
}); 


 export default orderSchema  ;
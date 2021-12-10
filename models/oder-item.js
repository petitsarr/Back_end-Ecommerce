
import mongoose from "mongoose"  ;

const orderItemSchema = new mongoose.Schema({
     quantity: {
        type : Number ,
        required : true
    } ,
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Product" ,
      
    }
})  
orderItemSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
}); 


export default  orderItemSchema ; 
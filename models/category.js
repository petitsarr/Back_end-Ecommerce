import mongoose from "mongoose" ;

const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    } ,
    icon : {
        type : String 

    } ,
    color : {
        type : String 

    }
})  
// Pour transformer _id en id uniquement 
categorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


export default categorySchema ;
import mongoose from "mongoose" 
import uniqueValidator from "mongoose-unique-validator" 

const userSchema = new mongoose.Schema({
    name : {
        type :String ,
        required : true
    } ,  
    email : {
        type : String ,
        unique : true ,
        required : true
    } ,
    
    passwordHash : {
        type : String ,
        required : true
    },
   
    phone : { 
           type: String ,
           required : true
    } ,
    isAdmin : {
        type : Boolean , 
        default : false
    } ,
    street :{
        type : String , 
        default : ''
    } ,
    apartement : {
        type :String ,
        default : ''
    } ,
    zip : {
        type : String ,
        default :''
    } ,
    city : {
        type : String ,
        default : ''
    } ,
    country : {
        type :String ,
        default : ''
    } ,

})  

userSchema.plugin(uniqueValidator)




userSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
}); 

export default   userSchema ;
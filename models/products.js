import mongoose from "mongoose" ;

const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    description :{
        type : String ,
        required : true 
    } ,
    richDescription : {
        type : String ,
        default : " " 
    } ,
    image : {
        type : String ,
        default : " "
    } , 
    //Qui sera un tableau de String 
    images:[{
        type : String
    }]  ,
    brand : {
        type  :  String  ,
        default : " "
    } ,
    price :{
        type : Number  ,
        default : 0 
    } , 
    // pour la collection category 
    // l'id sera connecté au categorie Schema....
    category : {
      type : mongoose.Schema.Types.ObjectId ,
    //   ceci est référencé au Schema que jai créé 
      ref : "Category"  ,
      required : true ,
     
    } ,
    // le nombre de produit qui sont Stockés .
     countInStock:{
         type : Number , 
         required : true   ,
        //  min : 0  ,
        //  max : 255 
     }  , 
    //  pour l'evaluation ,la notation
     rating : {
         type : String ,
         default : 0
     } ,
    //  le nombre d'avis 
    numReviews  :{
        type : Number ,
        default :0 
    } , 

    // Afficher le produit sur la page d'acceuil en tant que produit vedette 
    isFeatured :{ 
        type : Boolean ,
        default : false
    } ,
    dateCreated : {
        type : Date ,
        default : Date.now()
    }


})   


// Pour transformer _id en id uniquement 
productSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

export default  productSchema ;
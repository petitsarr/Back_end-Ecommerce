import mongoose from "mongoose" ;
import  productSchema from "../models/products"  ;
import  categorySchema from "../models/category"  ; 

const Product = mongoose.model("Product" ,productSchema) ;
const Category = mongoose.model("Category" , categorySchema) 


// 
     

const addNewProduct = async (req ,res) => {  
         // On vérifie d'abord si la categorie existe déja ans la base de donnée ! 
        //  le front end dans la categorie enverra l'id de la categorie que je veux ajouter 
        console.log("l'id est ====>",req.body.category)
         let category = await Category.findById(req.body.category) 
         console.log("la categorie qui extiste est ===>" , category)
         if(!category)  return res.status(400).send("Category invalide") 
         //Sinon on continue le processus
    try { 

       const {
        name ,  
        description ,
        richDescription ,
        brand , 
        price ,
        category ,
        countInStock  ,
        rating ,
        numReviews  ,
        isFeatured 
       } = req.body   

// On refuse la requete lorsqu'il n'a pas d'image ...
       const file = req.file;
       if (!file) return res.status(400).send("Pas d'image dans la requete");


    const image =`${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}` 
    console.log("le file est ==>" , req.file)
    console.log("mon image est ==>" , image)

    
       const product = new Product ( {
        name ,  
        description ,
        richDescription ,
          image ,
         brand , 
         price ,
         category ,
         countInStock   ,
         rating ,
         numReviews  ,
         isFeatured 
       }) 
       await product.save();
       if(product) {
           res.status(201).json(product)
       } 
       else {
           throw new Error("impossible d'jouter un produit ")
       }
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}  
const getAllProduct = async (req , res) =>  {
     try {  
        //   permet de filtrer les produits en fonction de la category 
         // si filter renvoie un  objet vide alors nous aurons la liste de nos produits initialement sans filtre    
    // sinon nous aurons les produits en fonction de la category 
        let filter = {}
        //On teste si on filtre les produits en fonction de la category 
        if( req.query.categories ) {  
            filter  = {
                category :  req.query.categories
            }
        } 
         const product  = await Product.find(filter) 
         if(product) {
             res.status(200).json(product)
         }
        else {
            throw new Error("Product not Found")
        }
    } catch (error) {
        res.status(404).send(error)
    }
}   


const getProductById = async (req ,res) => {
    try { 
        const product = await Product.findById(req.params.idpro).populate("category") 
        if (product) {
            res.status(200).send(product) 
        }
        else {
            throw new Error("product not found")
        }
        
    } catch (error) {
        res.status(404).send(error)
    }
} 
const updateProductById = async (req , res)=> { 
     // On vérifie d'abord si la categorie existe déja ! 
     let category = await Category.findById(req.body.category) 
     if(!category)  return res.status(400).send("Category invalide") 
     //Sinon on continue le processus  
     try { 
        const product = await Product.findByIdAndUpdate(
            
            req.params.idpro ,  
              
            req.body ,  
            // ceci veut dire que je retourne les nouvelles datas mis a jour .
            {
                new : true 
            }

        ) 
        if (product) {
            res.status(200).json({
                message : "Modification avec succés" ,
                product : product
            })
        } 
        else  {
            throw new Error("Echec Modification ")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

} 
const deleteProductById = async(req ,res) => {
    try {
        const product = await Product.deleteOne({
            _id : req.params.idpro
        }) 
        if (product) {
            res.status(200).json({ 
                success : true ,
                message : "Suppression réussi"
            })
        } 
        else {
            throw new Error("suppression non réussi ")
        }
    } catch (error) {
        res.status(400).json({
            success : false , 
            message : error
        })
    }
}  
// Cette methode renvoie le nombre documents qui correspond à ma collection produit 
const getProductCount = async (req ,res) =>{
    try { 
        const productCount  = await Product.countDocuments({}) 
        
        if(productCount) {
            res.status(200).send({
                nombre :  productCount 
            })
        }
       else { 
      
           throw new Error("Product not Found")
       }
   } catch (error) {  
     
       res.status(404).send(error)
   } 
}

// fonction pour afficher les prduits dans la page d'acceuils ,les produits vedettes ...

const getProductsFeatures = async (req ,res) => {
    try { 
        //count designe le nombre limite de produit qui doit etre afficher à l'acceuil
        const count = req.params.count  ?  req.params.count  : 0
        const product  = await Product.find({
            isFeatured : true
        }).limit(parseInt(count))
        
        if(product) {
            res.status(200).send(product)
        }
      
   } catch (error) {  
     
       res.status(404).send(error)
   } 
}

    



export { addNewProduct , getAllProduct  ,  getProductsFeatures  , updateProductById , getProductById ,deleteProductById ,getProductCount } 
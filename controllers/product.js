import mongoose from "mongoose" ;
import  productSchema from "../models/products"  ;
import  categorySchema from "../models/category"  ; 

const Product = mongoose.model(" Product" ,productSchema) ;
const Category = mongoose.model("Category" , categorySchema) 

const addNewProduct = async (req ,res) => {  
         // On vérifie d'abord si la categorie existe déja ! 
         let category = await Category.findById(req.body.category) 
         if(!category)  return res.status(400).send("Category invalide") 
         //Sinon on continue le processus
    try { 
       const {
        name ,  
        description ,
        richDescription ,
        image ,
        brand , 
        price ,
        category ,
        countInStock  ,
        rating ,
        numReviews  ,
        isFeatured 
       } = req.body
       const product = new Product ( {
        name ,  
        description ,
        richDescription ,
        image ,
        brand , 
        price ,
        category ,
        countInStock  ,
        rating ,
        numReviews  ,
        isFeatured 
       }) 
       await product.save() ;
       if(product) {
           res.status(201).json(product)
       } 
       else {
           throw new Error("impossible d'jouter un produit ")
       }

        
    } catch (error) {
        res.status(400).send(error)
    }

}  
const getAllProduct = async (req ,res) =>  {
     try { 
         const product  = await Product.find().populate("category")
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
const updateProductById = async(req , res)=> { 
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
                category : product
            })
        } 
        else  {
            throw new Error("Echec Modification ")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

}

export { addNewProduct , getAllProduct , updateProductById , getProductById} 
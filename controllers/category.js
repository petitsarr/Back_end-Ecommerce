import mongoose from "mongoose" ;
import  categorySchema from "../models/category"  ;

 const Category = mongoose.model("Category" , categorySchema) 

//  Ajouter un category   
const addCategory = async (req ,res) => { 
    try {  
        const {name ,icon ,color}  = req.body  ;  
        
        let category = new Category ({
            name ,
            icon ,  
            color 
        })
            console.log("Mes nouveaux category à ajoute sont ==>" , category) ;
            await category.save() 
       if(category) {
           res.status(201).send("Category ajouté avec success")
       } 
       else {
           throw new Error ("probléme d'jout de category ")
       }
         
    } catch (error) {
        res.status(400).send(error)
    }
} 
// Recuperer la liste des categories 
const getAllCategory = async (req ,res) => {
    try {
        const category = await Category.find({}) 
        if(category) {
             res.status(200).json(category) 
        } 
         else {
             throw new Error ("Pas de categories Trouvé ")
         }
    } catch (error) {
        res.status(404).json(error)
    }
} 
// Recuprer une seule Category 
const getCategoryById = async (req ,res) => {
    try {
        const category = await Category.findById(
            req.params.idcat
        ) 
        if (category) {
            res.status(200).json(category)
        } 
        else {
            throw new Error("category not Found ")
        }
    } catch (error) {
        res.status(404).send(error)
    }
} 
// Modifié un category 
const updateCategoryById = async ( req ,res) => { 
    try { 
        const category = await Category.findByIdAndUpdate(
            
            req.params.idcat ,  
              
            req.body ,  
            // ceci veut dire que je retourne les nouvelles datas mis a jour .
            {
                new : true 
            }

        ) 
        if (category) {
            res.status(200).json({
                message : "Modification avec succés" ,
                category : category
            })
        } 
        else  {
            throw new Error("Echec Modification ")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

}

// Supprimer un category 

const deleteCategory = async (req,res) => {
    try {
        const category = await Category.deleteOne({
            _id : req.params.idcat 
        }) 
        if (category) {
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
export  {  addCategory ,deleteCategory , getAllCategory ,getCategoryById  ,updateCategoryById } ;

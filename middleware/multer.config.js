import multer from "multer"; 

// Définir  Où stocker Nos fichiers...
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
}) 
// Fonction pour contrôler quels fichiers sont acceptés 
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    } 

}; 
// Nous passons à multer notre constante storage et lui indiquer  .
//que nous gérons uniquement les téléchargements de fichiers image avec single .
//image : est Le nom du champ ou je veux envoyer l'image depuis le frontend  
let mesuploads = multer({
    storage : storage ,
    fileFilter : fileFilter
})

export default mesuploads  
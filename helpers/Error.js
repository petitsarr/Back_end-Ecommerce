

const Error = (err , req ,res ,next) =>{   
    
    //  s'il ya erreur d'authentification
    if(err.name === "UnauthorizedError") {
        return res.status(401).json({
            message : "Cet utilisateur n'est pas authorisé "
        })
    } 
     
    //  erreur de validation ex : download photo ect ...
    if(err.name === " ValidationError ") {
      return  res.status(401).json({
            message : err
        })
    } 
      return res.status(500).json(err)

} 
export default Error ;
import jwt from "express-jwt" ;

// Securisation de notre api  
//Mais je dois spécifier toutes les api que je veux utliser sans pour autant s'authentifier
// l'user peut s'inscrire sans blocage 
// Se connecter sans blocage 
// On peut voir la liste des produits sans pour autant s'authenfier .
// L'objet est de recevoir que des demandes mais nous autorisons pas  la publicaton .   

/*
Utilisation des expressions réguliéres qui me donne 
la possiblité de tout spécifier apres les produits 

*/

const Auth = () => { 
    // Mon token d'authenfication
    const secret = process.env.secret  
    // Mon url api 
    const api = process.env.API_URL 


 
    return jwt({
        secret ,
        algorithms : ["HS256"]  ,
        // ceci est une fonction qui permet specifier si user est admin ou non . 
        isRevoked  : isRevoked
    }).unless({
        path : [ 
        {
            // ceci veut dire que je peux acceder à mes produits sans authentification 
            // avec cette expression irreguliere qui veut dire tout mes routes ou nous avons products/klk chose 
            url : /\/api\/v1\/products(.*)/, methods : ["GET" , "OPTIONS"]
        } ,
        {
             // ceci veut dire que je peux acceder à mes categories sans authentification 
            // avec cette expression irreguliere qui veut dire tout mes routes ou nous avons categories/klk chose
            url : /\/api\/v1\/categories(.*)/, methods : ["GET" , "OPTIONS"]
        } ,

            `${api}/connection` ,
            `${api}/inscription`

        ]
    })

}   
// req = la demande , payload = contient ce qui se trouve à l'interieur du jeton exple : le champ isAdmin dans mon token 
const  isRevoked = async ( req ,payload , done) => { 
    //  si luser n'es pas admin 
     if(!payload.isAdmin) {
        done(null , true)
     } 
     
     else {
         done() ;
     }
 } 

 

export default Auth ;
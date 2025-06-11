const jwt= require('jsonwebtoken')

const validateToken=async(req,res,next)=>{
    let token;
    // get the authorization header
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader&&authHeader.startsWith("Bearer")){
        // get the token 
        token=authHeader.split(" ")[1];

        // verify the token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User not authorized")
            }
            // get user data
            req.user=decoded.user
            next()
        })
        if(!token){
            res.status(401)
                throw new Error("User is not authorized or token is missing")
        }
    }
}
module.exports=validateToken;
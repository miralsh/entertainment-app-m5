const express=require('express')
const router=express.Router()



const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const validateToken = require('../middleware/validateTokenHandler')

// signup
const signup=async(req,res)=>{
    // get email and password from body
    const {email,password} = req.body;

    // if email or password are empty
    if(!email||!password){
        res.status(400)
        .json({error:"All fields are mandatory"})
    }

    // check if user is already present
    const userAvailable= await Users.findOne({email})
    if(userAvailable){
         res.status(400)
        .json({error:"User Already registered!"})
    }

    // encrypt password
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(hashedPassword)

    // add user to db
    const user=await Users.create({email,password:hashedPassword})
    // user id and email as response
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
         res.status(400)
        .json({error:"User data is not valid"})
    }
    res.json({message:"signup"})
}

//sign in
const login=async(req,res)=>{
    // get email and password from body
    const {email,password} =req.body

    // if email or password are empty
    if(!email||!password){
        res.status(400)
        .json({error:"All fields are mandatory"})
    }

    // check if user is present
    const user= await Users.findOne({email})

    // compare the password with encrypted password
    if(user && (await bcrypt.compare(password,user.password))){
        // get the access token and send as response
        const accessToken = jwt.sign({
            user:{
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken})
    }else{
        // error - user data is invalid
          res.status(401)
        .json({error:"Email or Password is not valid"})
    }
} 

// get user detail 
const getUser=async(req,res)=>{
    // share the user detail received from validateToken middleware
    res.status(200).json(req.user)
}
router.post("/signup",signup)
router.post("/login",login)
router.get("/user",validateToken,getUser)
module.exports=router
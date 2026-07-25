const express=require("express")
const path=require("path")
const User=require("../models/user")
const router=express.Router();
const {upload}=require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs=require("fs")
const jwt=require("jsonwebtoken")
const sendMail=require("../utils/sendMail")
const sendToken=require("../utils/jwt")
const AsyncError = require("../middleware/AsyncError");
const {isAuthenticated}=require('../middleware/auth')
router.post("/create-user",upload.single("file"),async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const useremail=await User.findOne({email})
        if(useremail){
            const filename=req.file.filename;
            const filepath=`uploads/${filename}`
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log(err)
                    res.status(500).json({message:"Error deleting file"})
                }
            })
            return next(new ErrorHandler("User Already Exists",400))
        }
        const filename=req.file.filename;
        const fileurl=path.join(filename)
        const user={
            name:name,
            email:email,
            password:password,
            avatar:fileurl
        }
        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;
        console.log("created activation url")
        try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
            success: true,
            message: `please check your email:- ${user.email} to activate your account!`,
        });
        }catch (error) {
            console.log(error)
            console.log("1")
          return next(new ErrorHandler(error.message, 500));
        }
    }catch (error) {
        console.log(error)
        console.log("2")
        return next(new ErrorHandler(error.message, 400));
    }
})

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "30m",
    });
  };


  router.post("/activation",AsyncError(async(req, res, next) => {
      try {
        
        const { activation_token } = req.body;

        
          const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
          );
        
  
        if (!newUser) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar } = newUser;
  
        let user = await User.findOne({ email });
  
        if (user) {
          return next(new ErrorHandler("User already exists", 400));
        }
        console.log("saving user")
        
        user = await User.create({
          name,
          email,
          avatar,
          password,
        });
      
        console.log("saved")
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  
  );


  router.post(
    "/login-user",
    AsyncError(async (req, res, next) => {
      try {
        const { email, password } = req.body;
        console.log(email)
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );

  router.get(
    "/getuser",
    isAuthenticated,
    AsyncError(async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  
module.exports=router
const express=require("express")
const path  = require("path")
const multer = require("multer")


const User= require("../models/user.model")

const upload= require("../middlewares/upload")

const router=express.Router()

router.get("/", async(req, res)=>{
    try{

        const user= await User.find().lean().exec()

        return res.status(201).send(user)
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

router.post("/", upload.single("user_image"), async (req, res)=>{

    try{
        const user= await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
           profile_pic:req.file.path,
        })

        return res.status(201).json({user})
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

router.patch("/:id",upload.single("user_image"),async(req, res)=>{
    try{
        const profileFileds = {};
        //if (name) profileFileds.name = name;
       // const user1=await User.findByIdAndDelete(req.params.id).lean().exec()
       if (req.file) profileFileds.user_image = req.file.filename;
        const user =await User.findByIdAndUpdate(req.params.id,profileFileds,{ new: true})

        if (!user) {
            return next(
              
            );
          }
        return res.status(201).send(user)
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id).lean().exec()

       res.status(201).send(user)

    }catch(e){

        return res.status(500).json({message:e.message,status:"failed"})
    }
})


module.exports=router
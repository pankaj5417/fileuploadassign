const express=require("express")
const path  = require("path")
const multer = require("multer")


const Gallery= require("../models/gallery.model")

const upload= require("../middlewares/upload")

const router=express.Router()


router.get("/", async(req, res)=>{
    try{

        const gallery= await Gallery.find().lean().exec()

        return res.status(201).send(gallery)
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

router.post("/", upload.any("user_image"), async (req, res)=>{

    const filePaths= req.files.map((file)=> file.path)
    try{
        const gallery= await Gallery.create({
            
           pictures:filePaths,
        })

        return res.status(201).json({gallery})
    }catch(e){
        return res.status(500).json({status:"failed"})
    }
})

router.patch("/:id",async(req, res)=>{
    try{

        const gallery =await Gallery.findByIdAndUpdate(req.params.id,req.body,{new:true})
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

router.delete("/:id", async (req, res)=>{
    try{
        const gallery=await Gallery.findByIdAndDelete(req.params.id).lean().exec()

       res.status(201).send(gallery)

    }catch(e){
        
        return res.status(500).json({message:e.message,status:"failed"})
    }
})

module.exports=router
const { mongoose,Schema,model }=require("mongoose")

const gallerySchema = new Schema({

    

    pictures:[{ type: String, required: true}],

    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},
{
    versionKey: false,
    timestamps:true
})

module.exports=model("galleries", gallerySchema)
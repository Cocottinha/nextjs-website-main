import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    NomeImagem:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    userId:{
        type:String,
        required:false
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true}
)

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
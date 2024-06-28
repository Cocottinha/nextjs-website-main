import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    img:{
        type:String,        
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    lastLogin:{
        type:Date
    },
    lastPasswordChange:{
        type:Date
    }
},
{timestamps:true}
)

const postSchema = new mongoose.Schema({
    dimensao:{
        type:String,
        required:true
    },
    atividade:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
    },
    horas:{
        type:Number,
    },
    userId:{
        type:String,
        required:false
    },
    aprovado:{
        type:Boolean,
        default:null
    }, 
    pendente:{
        type:Boolean,
        default:null
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps:true}
)

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
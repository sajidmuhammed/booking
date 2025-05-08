const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profession:{
        type:String,
        required:true,
        min:2
    },
    phoneNumber:{
        type:String,
        required:true,
        min:4
    },
},

{timestamps:true}
);

module.exports=mongoose.model("admin",adminSchema);

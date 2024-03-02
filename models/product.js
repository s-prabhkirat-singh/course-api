const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        default:4.9
    },
    enrolled:{
        type:Number,
        default:4.9
    },
    price:{
        type:Number,
        required:[true,'type must be provided']
    },

    levels:{
        type:String,
        required:true
        
    },
    lessons:{
        type:Number,
        required:true
        
    },
    category:{
        type:String,
        required:true
        
    },
    instructor:{
        type:String,
        required:true
        
    },
   
    
    review:{
        type:Number,
        default:4.9
    },
   

    // company:{
    //     type:String,
    //     enum:{
    //         values:['apple','samsung','dell','mi'],
    //         message:`{VALUE} is not supported`
    //     }
    // }

})

module.exports=mongoose.model("Product",productSchema)
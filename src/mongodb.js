const express=require('express')
const mongoose=require('mongoose')
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/LogSignUp')
.then(()=>{
    console.log('mongodb connected');
})
.catch((e)=>{
    console.log(`not connected: `);
})

const LogInSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=mongoose.model('collection1',LogInSchema)

module.exports=collection
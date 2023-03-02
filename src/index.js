const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const collection=require('./mongodb')

const template_path=path.join(__dirname,'../templates')

const port=process.env.PORT || 8000

app.use(express.json())
app.set('view engine','hbs')
app.set('views',template_path)
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.post('/signup',async (req,res)=>{
    const data={
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data])

    res.render('home')

})
app.post('/login',async (req,res)=>{
    
    try{
        const check=await collection.findOne({name:req.body.name})
        //console.log(collection.findOne({name:req.body.name}));
        if(check.password===req.body.password){
        res.render('home')}
        else
        res.send('wrong password')
    }
    catch{
        res.send('wrong details')
    }

})

app.listen(port,()=>{
    console.log('port connected');
}) 
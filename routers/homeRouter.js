const express = require('express');
const homeSchema = require('../models/homeSchema');
const Router = express.Router();

Router.get('/', (err,res) => {
  res.render('register',{title : 'KIKLogin',password:'',email:''});
})

Router.post('/register', async(req,res) => {
  try{
    const {
      name,
      number,
      email,
      password,
      cpassword
    } = req.body;
    if(password === cpassword){
      const userData = new homeSchema({
        name,
        number,
        email,
        password
      })
      userData.save(err=>{
        if(err){
        console.log('Error')} 
        else{
          res.render('register',{title : 'Done',password:'',email:''})
        }
      })
      const useremail = await homeSchema.findOne({email:email});
      if(email === useremail.email){
        res.render('register',{title : 'Email is already present',password:'',email:''})
      }

    }
  }catch(e){

    res.render('register',{title : 'Error in Code',password:'',email:''})
  }
})

//sign in

Router.post('/login',(req,res)=>{
  const{
    email,
    password,
  } = req.body;

  homeSchema.findOne({email:email},(err,result)=>{
    if(email === result.email && password === result.password){
      res.render('dashboard', {name : result.name})
    }
    })

})

module.exports = Router;
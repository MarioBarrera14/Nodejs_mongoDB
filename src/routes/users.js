const express=require('express')
const router=express.Router() //requiero express para crear rutas
const User=require('../models/User')

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
  });
  
  router.get('/users/signup', (req, res) => {
    res.render('users/signup');
  });

  router.post('/users/signup', async (req, res) => {
    
    const{name,email,password,confirm_password}=req.body 
    const errors=[];
    if(name.lenth<=0){
      errors.push({text:'Inserte un nombre'})
    }
    if(password!=confirm_password){
      errors.push({text:'La contraseña no coinide'})
    }
    if(password.lenth>4){
      errors.push({text:'La contraseña debe ser mayor a 4 digitos'})
    }
    if(errors.lenth>0){
      res.render('users/signup',{errors,name,email,password,confirm_password})
    }else{
    const emailUser = await User.findOne({email:email})
    if(emailUser){
      req.flash('error_msg','El email ya esta en uso')
      res.redirect('/users/signup')
    }
    const newUser= new User({name,email,password})
    newUser.password=await newUser.encryptPassword(password)
    await newUser.save()
    req.flash('sucess_msg','Estas registrado')
    res.redirect('/users/signin')
    }
  });



module.exports=router
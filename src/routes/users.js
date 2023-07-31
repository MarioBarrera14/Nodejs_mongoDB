const express=require('express')
const router=express.Router() //requiero express para crear rutas

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
    res.send('ok');
    }
  });



module.exports=router
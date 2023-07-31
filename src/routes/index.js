const express=require('express')
const router=express.Router() //requiero express para crear rutas

router.get('/', (req, res) => {
    res.render('index');
  });
  
  router.get('/about', (req, res) => {
    res.render('about');
  });


module.exports=router
const express = require ('express');
const methodOverride= require('method-override')
const session=require('express-session')
const path = require ('path')
const connectToDB = require('./database'); 
const flash = require('connect-flash'); 
//inicializaciones
const app= express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');


//Middlewares (seccion donde iran todas nuestras funciones ejecutadas antes de que lleguen al serviidor)
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mySecretApp',
  resave: true,
  saveUninitialized: true
}));
app.use(flash())
//Variables globales seccion para que todos los datos de nuestra aplicacion sea accesible
app.use((req,res,next)=>{
  res.locals.succes_msg=req.flash('succes_msg')
  res.locals.error_msg=req.flash('error_msg')
  next() 
})

//routes seccion de rutas
app.use(require('./routes/index'))
app.use(require('./routes/note'))
app.use(require('./routes/users'))

//static configuracion de file estaticos
app.use(express.static(path.join(__dirname, 'public')))


// Conexión a la base de datos
connectToDB()
  .then(() => {
    // Inicia el servidor después de establecer la conexión a la base de datos
    app.listen(4000, () => {
      console.log('Servidor iniciado en http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Error al iniciar el servidor:', error.message);
  });
const mongoose = require('mongoose');

const mongoURI= `mongodb+srv://mario22:txbQlJTdn2mOWlMM@cluster0.6u7xir8.mongodb.net/?retryWrites=true&w=majority
`
async function connectToDB() {
  try {
    await mongoose.connect(mongoURI, {useNewUrlParser: true,
      useUnifiedTopology: true,
      });
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

module.exports = connectToDB;
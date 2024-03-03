const mongoose = require('mongoose');

// Definir el modelo de datos para los mensajes de contacto
const usuario = mongoose.model('usuario', {
    name : {
        type: String,
        required: true        
        },
 
    password: { 
        type: String,
        required: true
    
    }
    
});

module.exports=usuario;
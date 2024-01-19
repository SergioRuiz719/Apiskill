const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
Nombre: {
    type: String,
    required: true,
},
id_estilo: {
    type:  mongoose.Schema.Types.ObjectId,
}

});

module.exports = mongoose.model('User', userSchema);
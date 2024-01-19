const mongoose = require('mongoose');

const estrategiaSchema = mongoose.Schema({
    

id_estrategia: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
},

Estrategia: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Estrategia', estrategiaSchema);
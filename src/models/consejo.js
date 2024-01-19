const mongoose = require('mongoose');

const consejoSchema = mongoose.Schema({
    

id_estilo: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
},

Consejo: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Consejo', consejoSchema);
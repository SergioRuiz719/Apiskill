const mongoose = require('mongoose');

const tareaSchema = mongoose.Schema({

id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
fecha: {
    type: Date,
    required: true,
    },
tarea: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Tarea', tareaSchema);
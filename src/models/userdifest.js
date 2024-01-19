const mongoose = require('mongoose');

const userdufestSchema = mongoose.Schema({
    

id_usuario: {
    type:  mongoose.Schema.Types.ObjectId,
},
id_estilo: {
    type:  mongoose.Schema.Types.ObjectId,
}
});


module.exports = mongoose.model('Userdifest', userdufestSchema);
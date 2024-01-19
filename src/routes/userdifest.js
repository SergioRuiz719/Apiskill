const express = require('express');
const Userdifest = require('../models/userdifest');
const router = express.Router();


// Ruta para agregar un estilo diferente
router.post('/userdifest', async (req, res) => {
    try {
        const nuevoDifEstilo = req.body;

        if (!nuevoDifEstilo || Object.keys(nuevoDifEstilo).length === 0) {
            res.status(400).json({ error: 'Datos del estilo diferente no proporcionados' });
            return;
        }

        const difEstilo = new Userdifest(nuevoDifEstilo);
        const resultado = await difEstilo.save();

        if (resultado) {
            res.status(201).json({ 'message': 'Estilo diferente agregado correctamente' });
        } else {
            res.status(500).json({ 'error': 'Error al agregar el estilo diferente' });
        }
    } catch (error) {
        console.error('Error al agregar un estilo diferente:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para eliminar un estilo diferente
router.delete('/userdifest/:ID_difest', async (req, res) => {
    try {
        const ID_difest = req.params.ID_difest;
        if (!ObjectID.isValid(ID_difest)) {
            res.status(400).json({ 'error': 'ID de estilo diferente no válido' });
            return;
        }

        const resultado = await Userdifest.deleteOne({ _id: ID_difest });

        if (resultado.deletedCount === 1) {
            res.json({ 'message': 'Estilo diferente eliminado correctamente' });
        } else {
            res.status(404).json({ 'error': 'Estilo diferente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar un estilo diferente:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

module.exports = router;
const express = require('express');
const Consejo = require('../models/consejo');

const router = express.Router();

// Ruta para agregar un consejo
router.post('/consejo', async (req, res) => {
    try {
        const nuevoConsejo = req.body;
        if (!nuevoConsejo || Object.keys(nuevoConsejo).length === 0) {
            res.status(400).json({ error: 'Datos del consejo no proporcionados' });
            return;
        }

        const consejo = new Consejo(nuevoConsejo);
        const resultado = await consejo.save();

        if (resultado) {
            res.status(201).json({ 'message': 'Consejo agregado correctamente' });
        } else {
            res.status(500).json({ 'error': 'Error al agregar el consejo' });
        }
    } catch (error) {
        console.error('Error al agregar un consejo:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los consejos
router.get('/consejo', async (req, res) => {
    try {
        const consejos = await Consejo.find();
        res.json({ 'elementos': consejos });
    } catch (error) {
        console.error('Error al obtener todos los consejos:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para eliminar un consejo
router.delete('/consejo/:ID_Consejo', async (req, res) => {
    try {
        const ID_Consejo = req.params.ID_Consejo;
        if (!ObjectID.isValid(ID_Consejo)) {
            res.status(400).json({ 'error': 'ID de consejo no válido' });
            return;
        }

        const resultado = await Consejo.deleteOne({ _id: ID_Consejo });
        if (resultado.deletedCount === 1) {
            res.json({ 'message': 'Consejo eliminado correctamente' });
        } else {
            res.status(404).json({ 'error': 'Consejo no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar un consejo:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

module.exports = router;
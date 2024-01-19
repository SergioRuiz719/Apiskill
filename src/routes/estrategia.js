const express = require('express');
const Estrategia = require('../models/estrategia');

const router = express.Router();

// Ruta para agregar una estrategia
router.post('/estrategia', async (req, res) => {
    try {
        const nuevaEstrategia = req.body;
        if (!nuevaEstrategia || Object.keys(nuevaEstrategia).length === 0) {
            res.status(400).json({ error: 'Datos de la estrategia no proporcionados' });
            return;
        }

        const estrategia = new Estrategia(nuevaEstrategia);
        const resultado = await estrategia.save();
        if (resultado) {
            res.status(201).json({ 'message': 'Estrategia agregada correctamente' });
        } else {
            res.status(500).json({ 'error': 'Error al agregar la estrategia' });
        }
    } catch (error) {
        console.error('Error al agregar una estrategia:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para obtener todas las estrategias
router.get('/estrategia', async (req, res) => {
    try {
        const estrategias = await Estrategia.find();
        res.json({ 'elementos': estrategias });
    } catch (error) {
        console.error('Error al obtener todas las estrategias:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para eliminar una estrategia
router.delete('/estrategia/:ID_Estrategia', async (req, res) => {
    try {
        const ID_Estrategia = req.params.ID_Estrategia;

        if (!ObjectID.isValid(ID_Estrategia)) {
            res.status(400).json({ 'error': 'ID de estrategia no válido' });
            return;
        }

        const resultado = await Estrategia.deleteOne({ _id: ID_Estrategia });
        if (resultado.deletedCount === 1) {
            res.json({ 'message': 'Estrategia eliminada correctamente' });
        } else {
            res.status(404).json({ 'error': 'Estrategia no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar una estrategia:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});


module.exports = router;
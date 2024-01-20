const express = require('express');
const Ejercicio = require('../models/ejercicio'); // Asegúrate de tener el modelo correcto

const router = express.Router();

// Ruta para agregar un ejercicio
router.post('/ejercicio', async (req, res) => {
    try {
        const nuevoEjercicio = req.body;
        if (!nuevoEjercicio || Object.keys(nuevoEjercicio).length === 0) {
            res.status(400).json({ error: 'Datos del ejercicio no proporcionados' });
            return;
        }

        const ejercicio = new Ejercicio(nuevoEjercicio);
        const resultado = await ejercicio.save();

        if (resultado) {
            res.status(201).json({ 'message': 'Ejercicio agregado correctamente' });
        } else {
            res.status(500).json({ 'error': 'Error al agregar el ejercicio' });
        }
    } catch (error) {
        console.error('Error al agregar un ejercicio:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los ejercicios
router.get('/ejercicio', async (req, res) => {
    try {
        const ejercicios = await Ejercicio.find();
        res.json({ 'elementos': ejercicios });
    } catch (error) {
        console.error('Error al obtener todos los ejercicios:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

// Ruta para eliminar un ejercicio
router.delete('/ejercicio/:ID_Ejercicio', async (req, res) => {
    try {
        const ID_Ejercicio = req.params.ID_Ejercicio;
        if (!ObjectID.isValid(ID_Ejercicio)) {
            res.status(400).json({ 'error': 'ID de ejercicio no válido' });
            return;
        }

        const resultado = await Ejercicio.deleteOne({ _id: ID_Ejercicio });
        if (resultado.deletedCount === 1) {
            res.json({ 'message': 'Ejercicio eliminado correctamente' });
        } else {
            res.status(404).json({ 'error': 'Ejercicio no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar un ejercicio:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

module.exports = router;

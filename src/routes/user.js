const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Ruta para obtener usuario actual
router.get('/id_usuario_actual', async (req, res) => {
    try {
        const ID_Usuario = req.headers.authorization;
        const usuario = await User.findOne({ _id: ID_Usuario });
        if (usuario) {
            res.json({ 'ID_Usuario_Actual': usuario._id });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json({ 'elementos': usuarios });
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener un usuario por ID
router.get('/usuarios/:ID_Usuario', async (req, res) => {
    try {
        const ID_Usuario = req.params.ID_Usuario;
        const usuario = await User.findOne({ _id: ID_Usuario });

        if (usuario) {
            res.json({ 'elemento': usuario });
        } else {
            res.status(404).json({ 'message': 'Elemento no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para agregar un usuario
router.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        if (!nuevoUsuario || Object.keys(nuevoUsuario).length === 0) {
            res.status(400).json({ error: 'Datos de usuario no proporcionados' });
            return;
        }
        const usuario = new User(nuevoUsuario);
        const resultado = await usuario.save();
        if (resultado) {
            res.status(201).json({ 'message': 'Usuario agregado correctamente' });
        } else {
            res.status(500).json({ 'error': 'Error al agregar el usuario' });
        }
    } catch (error) {
        console.error('Error al agregar un usuario:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});


// Ruta para actualizar un usuario
router.put('/usuarios/:ID_Usuario', async (req, res) => {
    try {
        const ID_Usuario = req.params.ID_Usuario;
        const usuarioActualizado = req.body;

        if (!usuarioActualizado || Object.keys(usuarioActualizado).length === 0) {
            res.status(400).json({ error: 'Datos de usuario a actualizar no proporcionados' });
            return;
        }

        const resultado = await User.updateOne(
            { _id: ID_Usuario },
            { $set: { 'id_estilo': usuarioActualizado.id_estilo } }
        );

        if (resultado.nModified === 1) {
            res.json({ 'message': 'Estilo de usuario actualizado correctamente' });
        } else {
            res.status(404).json({ 'error': 'Usuario no encontrado o sin cambios' });
        }
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        res.status(500).json({ 'error': 'Error interno del servidor' });
    }
});

module.exports = router;
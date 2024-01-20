const express = require('express');
const Tarea = require('../models/tarea.js');

const router = express.Router();

router.post('/tareas', async (req, res) => {
    try {
      const nuevaTarea = new Tarea(req.body);
      await nuevaTarea.save();
      res.status(201).json({ mensaje: 'Tarea insertada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al insertar la tarea' });
    }
  });

module.exports = router;
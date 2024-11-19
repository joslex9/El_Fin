const express = require('express');
const db = require('../db/connection');
const authenticateToken = require('../middleware/authenticate');

const router = express.Router();

// Obtener todos los eventos
router.get('/', (req, res) => {
  db.query('SELECT * FROM eventos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener eventos' });
    res.json(results);
  });
});

// Crear un nuevo evento (protección)
router.post('/', authenticateToken, (req, res) => {
  const { titulo, descripcion, fecha_inicio, fecha_fin, ubicacion, capacidad } = req.body;

  db.query(
    'INSERT INTO eventos (titulo, descripcion, fecha_inicio, fecha_fin, ubicacion, capacidad) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, descripcion, fecha_inicio, fecha_fin, ubicacion, capacidad],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al crear evento' });
      res.status(201).json({ message: 'Evento creado' });
    }
  );
});

module.exports = router;

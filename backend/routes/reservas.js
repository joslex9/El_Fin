const express = require('express');
const db = require('../db/connection');
const authenticateToken = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
  const { evento_id, cantidad_personas } = req.body;
  const usuario_id = req.user.id;

  db.query('SELECT capacidad FROM eventos WHERE id = ?', [evento_id], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Evento no encontrado' });

    const capacidadRestante = results[0].capacidad - cantidad_personas;
    if (capacidadRestante < 0) return res.status(400).json({ error: 'Capacidad insuficiente' });

    db.query(
      'INSERT INTO reservas (usuario_id, evento_id, cantidad_personas, fecha_reserva) VALUES (?, ?, ?, NOW())',
      [usuario_id, evento_id, cantidad_personas],
      (err) => {
        if (err) return res.status(500).json({ error: 'Error al crear reserva' });

        db.query('UPDATE eventos SET capacidad = ? WHERE id = ?', [capacidadRestante, evento_id]);
        res.status(201).json({ message: 'Reserva creada' });
      }
    );
  });
});

module.exports = router;

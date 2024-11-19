const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', 
    [nombre, email, hashedPassword], 
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
      res.status(201).json({ message: 'Usuario registrado' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;

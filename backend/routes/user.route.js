// routes/user.routes.js
const express = require('express');
const { handleInsertUser, handleLoginUser, handleUpdatePassword } = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', handleInsertUser); // Rota para registrar um usuário
router.post('/login', handleLoginUser); // Nova rota para login do usuário
router.put('/update-password', handleUpdatePassword); // Rota para atualizar senha

module.exports = router;

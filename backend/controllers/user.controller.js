// controllers/user.controller.js
const { insertUser, loginUser, updateUserPassword } = require('../modules/user.modules');

// Handler para inserir diretamente na tabela 'user'
async function handleInsertUser(req, res) {
    const { username, email, password, first_name, last_name } = req.body;
    try {
        const data = await insertUser(username, email, password, first_name, last_name);
        res.status(200).json({ message: 'User inserted successfully!', data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Handler para login do usuário
async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function handleUpdatePassword(req, res) {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const user = await updateUserPassword(email, oldPassword, newPassword);
        res.status(200).json({ message: 'Password updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { handleInsertUser, handleLoginUser, handleUpdatePassword };

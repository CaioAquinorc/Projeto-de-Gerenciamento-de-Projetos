const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Verificar se o usuário já existe pelo e-mail
        const { data: existingUser, error: findError } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .single();

        if (findError && findError.code !== 'PGRST116') {
            return res.status(500).json({ message: "Server Error." });
        }

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists." });
        }

        // Criação do usuário no Supabase Auth
        const { user, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        }, {
            data: { username }
        });

        if (signUpError) {
            return res.status(400).json({ message: signUpError.message });
        }

        res.status(201).json({ message: "User registered successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: user, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (loginError) {
            return res.status(400).json({ message: "E-mail or password doesn't match!" });
        }

        const jwtToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({ message: `Welcome back! ${user.user_metadata.username}`, token: jwtToken, name: user.user_metadata.username });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { id } = req.params;

    try {
        // Primeiro, faça a autenticação do usuário usando o Supabase Auth
        const { data: user, error: getUserError } = await supabase.auth.getUserById(id);

        if (getUserError) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verifique se a senha antiga está correta
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: oldPassword
        });

        if (signInError) {
            return res.status(400).json({ message: "Old password is incorrect." });
        }

        // Verificar se a nova senha e a confirmação da nova senha coincidem
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match." });
        }

        // Atualizar a senha no Supabase Auth
        const { error: updateError } = await supabase.auth.updateUser(user.id, {
            password: newPassword
        });

        if (updateError) {
            return res.status(400).json({ message: updateError.message });
        }

        res.status(200).json({ message: "Password updated successfully." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

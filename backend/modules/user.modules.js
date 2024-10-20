const { createClient } = require('@supabase/supabase-js');
const generator = require('generate-password');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para criar um novo usuário
async function createUser(username, email) {
    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    }, {
        data: { username: username }
    });

    if (error) {
        console.error('Failed to create user:', error.message);
        return null;
    }

    console.log('User created successfully:', data.user);
    return data.user;
}

module.exports = { createUser };

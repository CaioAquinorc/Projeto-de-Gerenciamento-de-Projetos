// modules/user.module.js
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Inserir diretamente na tabela 'user'
async function insertUser(username, email, password, first_name, last_name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
        .from('user') // Certifique-se de que o nome da tabela está correto
        .insert([{ username, email, password: hashedPassword, first_name, last_name }]); // Alterado para password

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// Verificar login do usuário
async function loginUser(email, password) {
    // Verifica se o usuário existe pelo email
    const { data, error } = await supabase
        .from('user')
        .select('email, password') // Inclua os campos necessários
        .eq('email', email)
        .single(); // Usa .single() para garantir um único resultado

    if (error) {
        throw new Error(error.message);
    }

    // Se não encontrar o usuário, retorna erro
    if (!data) {
        throw new Error('Invalid Email');
    }

    // Verifica se a senha corresponde
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
        throw new Error('Invalid Password');
    }

    return {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
    }; // Retorna os dados do usuário
}

// modules/user.module.js
async function updateUserPassword(email, oldPassword, newPassword) {
    // Verifica se o usuário existe pelo email
    const { data, error } = await supabase
        .from('user')
        .select('password')
        .eq('email', email)
        .single(); // usa .single() para garantir que apenas um registro seja retornado

    if (error) {
        throw new Error(error.message);
    }

    // Se não encontrar o usuário, retorna erro
    if (!data) {
        throw new Error('User not found');
    }

    // Verifica se a senha antiga corresponde
    const passwordMatch = await bcrypt.compare(oldPassword, data.password);
    if (!passwordMatch) {
        throw new Error('Old password is incorrect');
    }

    // Faz o hash da nova senha e atualiza no banco de dados
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const { error: updateError } = await supabase
        .from('user')
        .update({ password: hashedNewPassword })
        .eq('email', email);

    if (updateError) {
        throw new Error(updateError.message);
    }

    return { email }; // Retorna o email do usuário como confirmação
}


module.exports = { insertUser, loginUser, updateUserPassword };

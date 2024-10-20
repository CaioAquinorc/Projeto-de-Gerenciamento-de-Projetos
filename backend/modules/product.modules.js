const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Função para criar um novo produto
async function createProduct({ name, price = 0, quantity = 0, description, orderDate = new Date(), validity }) {
    const { data, error } = await supabase
        .from('products')
        .insert([{
            name,
            price,
            quantity,
            description,
            order_date: orderDate,
            validity
        }]);

    if (error) {
        console.error('Failed to create product:', error.message);
        return null;
    }

    console.log('Product created successfully:', data);
    return data;
}

module.exports = { createProduct };

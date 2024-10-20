const express = require('express');
const { createClient } = require('@supabase/supabase-js'); // Biblioteca do Supabase
const cors = require('cors');
const productsRoute = require('./routes/product.route.js');
const usersRoute = require('./routes/user.route.js');
const app = express();
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRoute);

app.use("/api/auth", usersRoute);

// Conectar ao Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`);
});

// Exemplo de uso do Supabase
async function checkConnection() {
    const { data, error } = await supabase.from('test_table').select();
    if (error) {
        console.error('Failed to connect to Supabase:', error);
    } else {
        console.log('Supabase Connected.');
    }
}

checkConnection();

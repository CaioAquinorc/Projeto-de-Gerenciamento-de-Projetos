const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getAllProducts = async (req, res) => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.insertProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, orderDate, validity } = req.body;
        const { data: product, error } = await supabase
            .from('products')
            .insert([
                { name, price, quantity, description, order_date: orderDate, validity }
            ]);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity, description, orderDate, validity } = req.body;

        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({ name, price, quantity, description, order_date: orderDate, validity })
            .eq('id', id);

        if (error) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: product, error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error || !product.length) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Retornar lista de todos os produtos após exclusão
        const { data: products, error: getError } = await supabase
            .from('products')
            .select('*');

        if (getError) {
            return res.status(500).json({ message: getError.message });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
    }
};

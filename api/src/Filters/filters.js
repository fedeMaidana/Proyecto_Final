const { Op } = require('sequelize');
const {Category, Product } = require('../db');

const filter = async (req, res) => {
    const { category, min_price = 0, max_price = Infinity } = req.query;

    try {
        const filteredProducts = await Product.findAll({
            where: {
                '$Category.name$': category || { [Op.ne]: null },
                price: { [Op.between]: [parseFloat(min_price), parseFloat(max_price)] },
            },
            include: {
                model: Category,
                attributes: [], // Si no necesitas atributos de la categoría en los resultados
            },
        });

        if (sortOption === 'priceAsc') {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceDesc') {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'nameAsc') {
            filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'nameDesc') {
            filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

module.exports = filter;
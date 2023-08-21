const { Op } = require('sequelize');
const { Category, Product } = require('../db');

const filter = async (req, res) => {
  const { category, min_price = 0, max_price = Infinity, sortOption = 'default' } = req.query;

  try {
    const whereClause = {
      price: { [Op.between]: [parseFloat(min_price), parseFloat(max_price)] }
    };

    if (category) {
      whereClause['$Category.name$'] = category;
    }

    const products = await Product.findAll({
      where: whereClause,
      include: {
        model: Category,
        attributes: []
      },
      order: getSortingOrder(sortOption)
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getSortingOrder = (sortOption) => {
  switch (sortOption) {
    case 'priceAsc':
      return [['price', 'ASC']];
    case 'priceDesc':
      return [['price', 'DESC']];
    case 'nameAsc':
      return [['name', 'ASC']];
    case 'nameDesc':
      return [['name', 'DESC']];
    default:
      return [];
  }
};

module.exports = filter;

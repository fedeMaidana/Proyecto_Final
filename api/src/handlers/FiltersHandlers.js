const { Category, Product, User } = require('../db');
const {applyFiltersToProducts, applySortingToProducts} = require('../controllers/FiltersControllers')

const FilterHandlers = async (req, res) => {
    const { category, min_price, max_price, sortOption } = req.query;
  
    try {
      const allUsers = await User.findAll({
        attributes: { exclude: ['password'] },
        include: {
          model: Product, as: 'CreatedProducts' ,
          include: {
            model: Category,
            attributes: ['name'],
          },
        },
      });
  
      const filteredUsers = allUsers.map((user) => ({
        ...user.toJSON(),
        Products: applyFiltersToProducts(user.CreatedProducts, {
          category,
          minPrice: min_price,
          maxPrice: max_price,
        }),
      }));
  
      if (sortOption) {
        filteredUsers.forEach((user) => {
          user.CreatedProducts = applySortingToProducts(user.CreatedProducts, sortOption);
        });
      }
  
      res.json(filteredUsers);
      console.log(filteredUsers)
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  };

  module.exports = FilterHandlers
const {Product} = require('../db');

const createProduct = async (productInfo) => {
    const {
        name,
        price,
        description,
        stock,
    } = productInfo

    const product = await Product.create({
        name,
        price,
        description,
        stock,
    });

    return product;
};

module.exports = createProduct;
const {Product} = require("../db");
const { Op } = require('sequelize');

const getProducts = async (name) => {
    if (name) {
        const productByName = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        const productFilter = productByName.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            images: product.images,
            price: product.price,
        }));

        return productFilter;
    } else {
        const products = await Product.findAll();
        const productFilter = products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            images: product.images,
            price: product.price,
        }));

        return productFilter;
    }
};

const getProductsById = async (id) => {
    const products = await Product.findByPk(id)
    const dbdata = [products];
    const productFilter =  dbdata.map((product)=>({
        id: product.id,
        name: product.name,
        description:product.description,
        stock: product.stock,
        images: product.images,
        price: product.price,
    }))
    return productFilter

};

module.exports = {getProductsById,getProducts}
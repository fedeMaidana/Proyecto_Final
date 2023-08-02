const {Product} = require("../db");


const getProducts = async(name) =>{
    if(name){
        const productByName = await Product.findAll({
            where : {
                name : {
                    [Op.ilike]: `%${name}%`
                }
            }
        });
        const dbdata = [productByName];
        const productFilter = dbdata.map((product)=>({
            id: product.id,
            name: product.name,
            description:product.description,
            stock: product.stock,
            images: product.images,
            price: product.price,
        }))
        return productFilter
    }else{
        const products = Product.findAll();
        const dbdata = [products]
        const productFilter = await dbdata.map((product)=>({
            id: product.id,
            name: product.name,
            description:product.description,
            stock: product.stock,
            images: product.images,
            price: product.price,
        }))
        return productFilter
    }
};

const getProductsById = async (id) => {
    const products = Product.findByPk(id)
    const dbdata = [products];
    const productFilter = await dbdata.map((product)=>({
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
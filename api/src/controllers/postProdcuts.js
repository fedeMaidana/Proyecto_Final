const {Product} = require('../db');

const createProduct = async (name,
    price,
    description,
    stock,images, category) => {

        try {
            if(!name|| !price || !description || !stock || !images || !category){
                return res.status(400).send("Faltan datos");
            }
    
            const formattedName = name
            .toLowerCase()
            .split(" ")
            .map(
              (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
            )
            .join(" ");
    
        const product = await Product.create({
            name: formattedName,
            price,
            description,
            stock,
            images,
            categoryId: category
        });
    
    
        return product;
        } catch (error) {
            throw new Error('Error al crear el producto');
        }
   

};

module.exports = createProduct;
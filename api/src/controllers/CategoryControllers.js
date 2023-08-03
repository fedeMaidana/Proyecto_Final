const { Category } = require('../db');
const {Op} = require('sequelize')

const categoryController ={
    getCategories: async () => {
        try {           
            const categories= await Category.findAll();
            if(!categories){
                return res.status(404).json({message: 'No se encontraron categorias'});
            } else{
                return categories;
            }
        } catch (error) {
            throw new Error('Error al obtener las categorias');
        }
    },

    getCategoriesId: async (id) =>{
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            } 

            return category;
        } catch (error) {
            throw new Error('Error al obtener la categoria');
        }
    },

    postCategories: async(name)=>{
        try {
            const formattedName = name
            .toLowerCase()
            .split(" ")
            .map(
                (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
                )
                .join(" ");
            
                
                const category = await Category.findOne({
                    where: { name: { [Op.iLike]: `%${formattedName}%` } },
                });
                console.log(category);

          if (!category) {
            const newCategory = await Category.create({
              name: formattedName
            });
          
            return newCategory;

            console.log(newCategory);
        } else{
            return res.status(404).json({ error: `La categoria ya existe`});
        }
          
            
        } catch (error) {
            console.error('Error en la creación de categoría:', error);
            throw new Error('Error al crear la categoria');
        }
    },

    deleteCategories: async (id)=>{
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            await category.destroy();
        } catch (error) {
            throw new Error('Error al eliminar la categoria');
        }
    },

    putCategory: async(id, name)=>{
        try {
            const category = await Category.findByPk(id);
            if (!category) {
              return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            
            await category.update(name);
        } catch (error) {
            console.error('Error en la creación de categoría:', error);
            throw new Error('Error al actualizar la categoria');

        }
    }

    


    
};

module.exports = categoryController
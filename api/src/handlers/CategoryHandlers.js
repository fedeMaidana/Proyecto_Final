const categoryController = require('../controllers/CategoryControllers')

const categoryHandlers = {
    getCategories: async (req, res) => {
        try {
            const categories = await categoryController.getCategories();
            res.status(201).json(categories)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    getCategoriesId: async (req, res) => {
        try {
            const {id} = req.params;
            const category = await categoryController.getCategoriesId(id);
            res.status(201).json(category)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    postCategories: async(req, res) =>{
        try {
            const {name} = req.body;
            const newCategory = await categoryController.postCategories(name);
            res.status(201).json(newCategory)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteCategories: async (req, res)=>{
        try {
            const {id} = req.params;
            const response = await categoryController.deleteCategories(id);
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    putCategories:async (req, res)=>{
        try {
            const {id} = req.params;
            const {name} =req.body;
            const response = await categoryController.putCategory(id, name);
            res.status(201).json({response, message: 'Se actualizó correctamente la categoria'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }

    }

};

module.exports = categoryHandlers;
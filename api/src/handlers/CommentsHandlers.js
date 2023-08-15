const commentsControllers = require('../controllers/CommentsControllers');

const commentsHandlers ={
    handleAddComment: async (req, res) => {
        try {
          const { userId, productId, text } = req.body;
          const result = await commentsControllers.addComment(userId, productId, text);
          res.status(201).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      handleGetCommentsByProduct: async (req, res) => {
        try {
          const {productId} = req.params;
          const comments = await commentsControllers.getCommentsByProduct(productId);
          res.status(200).json(comments);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
      handleUpdateComment: async (req, res) => {
        try {
          const { commentId } = req.params;
          const { newText } = req.body;
          const result = await commentsControllers.updateComment(commentId, newText);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
      handleDeleteComment: async (req, res) => {
        try {
          const { commentId } = req.params;
          const result = await commentsControllers.deleteComment(commentId);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
};

module.exports = commentsHandlers;
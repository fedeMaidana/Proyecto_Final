const { Comment } = require("../db");

const commentsControllers = {
  addComment: async (userId, productId, text) => {
    try {
      const comment = await Comment.create({
        userId,
        productId,
        text,
      });

      return { message: "Comentario agregado con éxito", comment };
    } catch (error) {
      throw new Error("No se pudo agregar el comentario");
    }
  },

  getComments: async () => {
    try {
      const comments = await Comment.findAll();

      return comments;
    } catch (error) {
      throw new Error("No se pudieron obtener los comentarios");
    }
  },

  getCommentsByProduct: async (productId) => {
    try {
      const comments = await Comment.findAll({
        where: { productId },
      });

      return comments;
    } catch (error) {
      throw new Error("No se pudieron obtener los comentarios");
    }
  },

  updateComment: async (commentId, newText) => {
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        throw new Error("Comentario no encontrado");
      }

      comment.text = newText;
      await comment.save();

      return { message: "Comentario actualizado con éxito", comment };
    } catch (error) {
      throw new Error("No se pudo actualizar el comentario");
    }
  },
  deleteComment: async (commentId) => {
    
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        throw new Error("Comentario no encontrado");
      }

      await comment.destroy();

      return { message: "Comentario eliminado con éxito" };
    } catch (error) {
      console.error(error)
      throw new Error("No se pudo eliminar el comentario");
    }
  },
};

module.exports = commentsControllers;

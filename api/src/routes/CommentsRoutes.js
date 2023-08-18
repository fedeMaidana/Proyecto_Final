const express = require( 'express' )
const commentsHandlers = require( '../handlers/CommentsHandlers' )

const commentsRouter = express.Router()

commentsRouter.get( '/', commentsHandlers.handleGetCommentsByProduct )
commentsRouter.get( '/:productId', commentsHandlers.handleGetCommentsByProduct )

commentsRouter.post( '/', commentsHandlers.handleAddComment )

commentsRouter.delete( '/:commentId', commentsHandlers.handleDeleteComment)

commentsRouter.put( '/:id', commentsHandlers.handleUpdateComment)



module.exports = commentsRouter
const express = require( 'express' )
const commentsHandlers = require( '../handlers/CommentsHandlers' )

const commentsRouter = express.Router()

commentsRouter.get( '/', commentsHandlers.handleGetCommentsByProduct )
commentsRouter.get( '/:id', commentsHandlers.handleGetCommentsByProduct )

commentsRouter.post( '/', commentsHandlers.handleAddComment )

commentsRouter.delete( '/:id', commentsHandlers.handleDeleteComment)

commentsRouter.put( '/:id', commentsHandlers.handleUpdateComment)



module.exports = commentsRouter
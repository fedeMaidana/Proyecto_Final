const { Router } = require( 'express' )
const { userRoutes } = require( './userRoutes' )
const productRouter = require( './productRouter.js' )
const filterRouter = require( './filterRutes' )
const cartRouter = require( './CartRutes.js' )
const categoryRouter = require( './categoryRutes.js' )
const paymentRouter = require('./paymentRoutes')
const { adminRoutes } = require('./adminRoutes')
const favoriteRouter = require('./FavoritesRutes')
const commentsRouter = require('./CommentsRoutes')



const mainRouter = Router()

mainRouter.use( '/shopping_cart', cartRouter )

mainRouter.use( '/categories', categoryRouter )

mainRouter.use( '/', userRoutes )

mainRouter.use( '/products',productRouter )

mainRouter.use("/shopping_cart", cartRouter)

mainRouter.use("/categories", categoryRouter)

mainRouter.use('/', adminRoutes)

mainRouter.use('/products',productRouter)

mainRouter.use('/filter', filterRouter)


mainRouter.use(paymentRouter)

mainRouter.use('/favorites', favoriteRouter)

mainRouter.use('/comments', commentsRouter)

module.exports = mainRouter
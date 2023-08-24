import axios from 'axios'
import { useState, useEffect } from 'react'
import FavoriteButton from './Favorite'
import AddComment from './AddComments'
import { IconCart, IconProfileArrow } from '../assets/icons/icons'
import { v4 as uuidv4 } from 'uuid'
import { addToCart, createOrAddToCartbackend, loadCart } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../auxFunctions/localStorage'

export const Card = ( { name, nameProduct, description, images, price, id, stock, color, size, category, profileImage } ) => {
  const dispatch = useDispatch()

  const token = localStorage.getItem( 'token' )

  const [ currentIndex, setCurrentIndex ] = useState( 0 )
  const [ cartData, setCartData ] = useState( { cartProducts: [], cartTotal: 0, cartCount: 0 } )
  const [ allProducts, setAllProducts ] = useState( [] )
  const [ currentSlide, setCurrentSlide ] = useState( 0 )

  const cartProducts = useSelector( state => state.cartProducts )
  const cartTotal = useSelector( state => state.cartTotal )
  const cartCount = useSelector( state => state.cartCount )

  const userId = localStorage.getItem( 'userId' )
  const parsedUserId = parseInt( userId, 10 )

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = ( currentIndex + 1 ) % images.length
      setCurrentIndex( nextIndex )
    }, 3000)

    return () => clearInterval( interval )

  }, [ currentIndex, images.length ])

  const handleBuyButton = async () => {
    const newProduct = {
      name: nameProduct,
      description: description,
      images: images[ 0 ],
      price: price,
      id: id,
      quantity: 1
    }

    try {
      const cartId = localStorage.getItem( 'cartId' )

      if( parsedUserId || cartId === null ) dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )

      const response = await axios.post( 'https://proyectofinal-production-4957.up.railway.app/create-checkout-session', {
          products: [ newProduct ],
          cartId: cartId
        }
      )

      const { sessionUrl } = response.data

      if( sessionUrl ) window.location.href = sessionUrl
      else console.error( 'URL de sesión no disponible.' )

    }catch( error ){
      console.error( 'Error al enviar datos al backend:', error )
    }
  }

  const onAddProduct = () => {
    const newProduct = {
      productId: uuidv4(),
      id: id,
      name: nameProduct,
      price: price,
      description: description,
      stock: stock,
      color: color,
      size: size,
      category: category,
      images: images[ 0 ]
    }
    setAllProducts( [ ...allProducts, newProduct ] )
    dispatch( addToCart( newProduct ) )
    const cartId = localStorage.getItem( 'cartId' )

    if( parsedUserId || cartId === null ) dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )
    else dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )

/*     saveCartToLocalStorage( newProduct )
    dispatch( addToCart( newProduct ) )

    const cartId = localStorage.getItem( 'cartId' )

    if( parsedUserId || cartId === null ) dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )
    else dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) ) */
  }

  
  useEffect(() => {
    setCartData({
        cartProducts: cartProducts,
        cartTotal: cartTotal,
        cartCount: cartCount,
    })
  }, [ cartProducts, cartTotal, cartCount ])

/*   useEffect(() => {
    const savedCart = loadCartFromLocalStorage()

    if( savedCart ) dispatch( loadCart( savedCart ) )

  }, [ dispatch ]) */

  useEffect(() => {
    saveCartToLocalStorage( cartData )
  }, [ cartData ])

  const nextSlide = () => {
    setCurrentSlide( ( currentSlide + 1 ) % images.length )
  }

  const prevSlide = () => {
    setCurrentSlide( ( currentSlide - 1 + images.length ) % images.length )
  }

  return(
    <>
      <div className='relative w-[90%] h-auto bg-white rounded-[10px] overflow-hidden border' key={ id } id={ id } >
        <div className="relative h-[500px]">
          <header className='absolute w-[100%] flex items-center justify-between z-20 p-5'>
            <div className='flex items-center gap-[10px]'>
              <img src={ profileImage } className="min-w-[40px] h-[40px] rounded-full bg-[#b7bbc3]"></img>
              <p className="text-[1.5rem] font-semibold">{ name }</p>
              <p className='text-[1.5rem] font-semibold transform translate-y-[1px]'>▸</p>
              <p className="text-[1.2rem] font-semibold transform translate-y-[1px]">{ nameProduct }</p>
              <p className='text-[1.5rem] font-semibold transform translate-y-[1px]'>▸</p>
              <p className="text-[1.2rem] font-semibold transform translate-y-[1px]">$ { price }</p>
            </div>

            <div className="p-2 text-black text-[1.5rem] font-semibold">
              <span>{ currentSlide + 1 }</span> / <span className='text-[#7e7e7e]'>{ images.length }</span>
            </div>
          </header>

          <div className="w-full h-full flex transition-transform duration-300 z-10" style={ { transform: `translateX(-${ currentSlide * 100 }%)` } }>
            {images.map(( image, index ) => (
              <img key={ index } src={ image } alt={ `Image ${ index }` } className="w-full h-full flex flex-shrink-0 object-cover" />
            ))}
          </div>

          <button className="absolute top-[50%] transform -translate-y-1/2 left-[10px]" onClick={ prevSlide }>
            <IconProfileArrow className='' size={ '20' } />
          </button>
          <button className="absolute top-[50%] transform -translate-y-1/2 right-[10px]" onClick={ nextSlide }>
            <IconProfileArrow className='transform rotate-[180deg]' size={ '20' } />
          </button>

          <footer className='absolute w-[100%] bottom-0 grid grid-cols-3 items-center justify-center z-20 p-5'>
            <span className='flex gap-[10px]'>
              <FavoriteButton userId={ userId } productId={ id } token={ token } />
              <button className='w-[50px] border rounded-full bg-white flex items-center justify-center' title="Agregar al carrito" onClick={ () => { if( token ) onAddProduct() } }><IconCart isButtonsEnabled={ true } /></button>
            </span>

            <div className="flex items-center justify-evenly">
              {images.map(( _, index ) => (
                <div key={ index } className={ `w-[40px] h-1 rounded-full ${ index === currentSlide ? "bg-[#33a1fd]" : "bg-gray-300" }` } ></div>
              ))}
            </div>

            <div className='w-full flex justify-end'>
              <button className='w-auto px-[10px] text-[1.5rem] text-white font-semibold py-[5px] rounded-full bg-[#33a1fd] flex items-center justify-center' onClick={ () => { if( token ) handleBuyButton() } }>Comprar</button>
            </div>
          </footer>
        </div>

        <div className='min-h-[100px] max-h-auto rounded-bl-[10px] rounded-br-[10px] p-5 flex flex-col gap-[10px]'>
          <span className='flex items-center gap-[10px]'>
            <p className="text-[1.5rem] font-semibold">{ name }</p>
            <p className="text-[1.5rem]">▸</p>
            <p className='border-l pl-5 text-[1.5rem]'>{ description }</p>
          </span>
          <AddComment userId={ userId } productId={ id } profileImage={ profileImage } token={ token } />
        </div>
      </div>
    </>
  )
}
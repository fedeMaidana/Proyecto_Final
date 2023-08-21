import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, incrementProduct, decrementProduct, loadCart, buyToCartbackend, cancelToCartbackend } from '../redux/actions'
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../auxFunctions/localStorage'
import { IconDelete, IconSubstraction, IconSum } from '../assets/icons/icons'

export function Cart() {
  const dispatch = useDispatch()

  const cartProducts = useSelector( state => state.cartProducts )
  const cartTotal = useSelector( state => state.cartTotal )
  const cartCount = useSelector( state => state.cartCount )

  const [ cartData, setCartData ] = useState( { cartProducts: [], cartTotal: 0, cartCount: 0 } )
  const [ productQuantities, setProductQuantities ] = useState(
    cartProducts.reduce(( quantities, product ) => {
      quantities[ product.productId ] = product.quantity
      return quantities
    }, {})
  )

  useEffect(() => {
    setCartData({
      cartProducts: cartProducts,
      cartTotal: cartTotal,
      cartCount: cartCount,
    })
  }, [ cartProducts, cartTotal, cartCount ])

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage()

    if( savedCart ) dispatch( loadCart( savedCart ) )

  }, [ dispatch ])

  useEffect(() => {
    saveCartToLocalStorage( cartData )
  }, [ cartData ])

  const onDeleteProduct = ( productId ) => {
    console.log("Botón de eliminación clickeado. ID del producto:", productId);
    const productToDelete = cartProducts.find( product => product.productId === productId )

    if (productToDelete) dispatch( removeFromCart( productId ) )
  }

  const clearCartButton = () => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    // Acceder al valor de cartTotal
    const cartTotal = cartData.cartTotal;
    console.log('Cart Total:', cartTotal);
    const cartId = localStorage.getItem('cartId'); 
    dispatch(cancelToCartbackend(cartId,cartProducts, cartTotal))
    dispatch( clearCart() )
  }

  const handleIncrement = ( product ) => {
    const updatedQuantities = { ...productQuantities }
    updatedQuantities[ product.productId ] += 1
    setProductQuantities( updatedQuantities )

    dispatch( incrementProduct( product ) )
  }

  const handleDecrement = ( product ) => {
    if( productQuantities[ product.productId ] > 1 ){
      const updatedQuantities = { ...productQuantities }
      updatedQuantities[ product.productId ] -= 1
      setProductQuantities( updatedQuantities )

      dispatch( decrementProduct( product ) )
    }
  }

  const handleBuyButton = async () => {
    console.log('ver',cartProducts)
    try {
      // Obtener el objeto de la local storage
    const cartData = JSON.parse(localStorage.getItem('cart'));
    // Acceder al valor de cartTotal
    const cartTotal = cartData.cartTotal;
    console.log('Cart Total:', cartTotal);
      const cartId = localStorage.getItem('cartId'); 
      dispatch(buyToCartbackend(cartId,cartProducts, cartTotal))
        const response = await axios.post('https://proyectofinal-production-4957.up.railway.app/create-checkout-session', {
            products: cartProducts,
            cartId: cartId,
        });

        const { sessionUrl } = response.data;

        if (sessionUrl) {
            window.location.href = sessionUrl;
        } else {
            console.error('URL de sesión no disponible.');
        }

    }catch( error ){
      console.error( 'Error al enviar datos al backend:', error )
    }
  }


    return(
      <div className='relative z-[60]'>
        <div className={`w-[400px] fixed bg-white/[.3] backdrop-blur-[5px] border-l-[1px] border-b-[1px] border-r-[1px] rounded-bl-[10px] rounded-br-[10px] top-[68px] right-0 rounded`} >
          {cartProducts.length ? (
            <>
              <div className='row-product min-h-[50px] max-h-[200px] overflow-y-scroll'>
                {cartProducts.map( product => (
                  <div className='flex items-center justify-between p-5 border-b' key={ product.productId }>
                    <div className='w-[90%] flex items-center justify-around'>
                      <img src={ product.images } alt={ product.description } className='w-[60px] h-[60px] object-cover select-none rounded-full' />
                      <p className='w-[100px] select-none truncate text-[1.5rem] font-semibold'>{ product.name }</p>
                      <span className='select-none font-semibold text-[1.5rem]'>${ product.price }</span>

                      <div className='w-[100px] flex bg-[#34a1fd] rounded-[10px] items-center justify-between px-2'>
                        <button className='font-semibold text-[2rem] flex items-center' onClick={ () => handleDecrement( product ) }>
                          <IconSubstraction/>
                        </button>
                        <p className='select-none font-semibold text-[1.2rem] text-white flex items-center'>{ productQuantities[ product.productId ] }</p>
                        <button onClick={ () => handleIncrement( product ) }>
                          <IconSum/>
                        </button>
                      </div>
                    </div>

                    <span className='w-[20px] h-[20px] rounded-full bg-[#ff0000] flex items-center justify-center pt-[1px]'>
                      <IconDelete onClick={ () => onDeleteProduct( product.productId ) } type='button'/>
                    </span>
                  </div>
                ))}
              </div>

              <div className='h-[50px] flex justify-center items-center gap-3 border-b-[1px]'>
                <h3 className='select-none text-[1.5rem] font-bold'>Productos:</h3>
                <span className='select-none text-[1.5rem] font-semibold'>{ cartCount }</span>
              </div>
              <div className='h-[50px] flex justify-center items-center gap-3 border-b-[1px]'>
                <h3 className='select-none text-[1.5rem] font-bold'>Total:</h3>
                <span className='select-none text-[1.5rem] font-semibold'>${ cartTotal }</span>
              </div>

              <div className='flex p-3 gap-[10px]'>
                <button
                  className='select-none bg-transparent border py-4 w-full cursor-pointer text-[1.5rem] font-semibold rounded-[10px]'
                  onClick={ clearCartButton }
                >
                  Vaciar carrito
                </button>
                <button
                  className='select-none bg-[#34a1fd] text-white py-4 w-full cursor-pointer text-[1.5rem] font-semibold rounded-[10px]'
                  onClick={ handleBuyButton }
                >
                  Comprar
                </button>
              </div>
            </>
          ) : (
            <p className='select-none p-5 text-center text-[1.5rem] font-semibold'>El carrito esta vacío</p>
          )}
        </div>
      </div>
    )
}
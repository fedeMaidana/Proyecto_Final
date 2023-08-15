import { useState, useEffect  } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { removeFromCart, clearCart, incrementProduct, decrementProduct, loadCart} from '../redux/actions'
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../auxFunctions/localStorage' // Importa las funciones de localStorage

export function Cart() {
  const cartProducts = useSelector((state) => state.cartProducts) // estás asegurándote de que cartProducts tenga un valor (en este caso, un array vacío []) en caso de que sea undefined. Esto evitará que la función reduce genere errores debido a un valor no definido.
  const cartTotal = useSelector((state) => state.cartTotal)
  const cartCount = useSelector((state) => state.cartCount)

  const dispatch = useDispatch() // Obtiene la función dispatch

  // Estado local para almacenar la cantidad de cada producto
  const [productQuantities, setProductQuantities] = useState(
    cartProducts.reduce((quantities, product) => {
      quantities[product.id] = product.quantity;
      return quantities;
    }, {})
  );

  // Cargar el carrito desde Local Storage al iniciar
/*   useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    if (savedCart) {
      dispatch(loadCart(savedCart));
    }
  }, []); */

  const onDeleteProduct = (productId) => {
    const productToDelete = cartProducts.find((product) => product.id === productId)
    if (productToDelete) {
      dispatch(removeFromCart(productId))
    }
  }

  const clearCartButton = () => {
    dispatch(clearCart())
  }

  const [active, setActive] = useState(false)


  const handleIncrement = (product) => {
    const updatedQuantities = { ...productQuantities }
    updatedQuantities[product.id] += 1
    setProductQuantities(updatedQuantities)

    dispatch(incrementProduct(product)) // Pasar el objeto de producto completo
  }

  const handleDecrement = (product) => {
    if (productQuantities[product.id] > 1) {
      const updatedQuantities = { ...productQuantities }
      updatedQuantities[product.id] -= 1
      setProductQuantities(updatedQuantities)

      dispatch(decrementProduct(product)) // Pasar el objeto de producto completo
    }
  };

  // Guardar el carrito en Local Storage al cambiar
  useEffect(() => {
    saveCartToLocalStorage(cartProducts)
  }, [cartProducts])


    return(

          <div className='relative'>
            <div className='cursor-pointer' onClick={() => setActive(!active)} >

              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                className='w-10 h-10 stroke-current text-principal-black' >
                <path strokeLinecap='round' strokeLinejoin='round'd='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/>
              </svg>

              <div className='absolute top-1/2 right-0 bg-principal-black text-principal-white w-6 h-6 flex justify-center items-center rounded-full'>
                <span className='text-xs' id='contador-productos'>{cartCount}</span>
              </div>

            </div>

            <div
              className={`absolute top-12 right-0 bg-white w-[30rem] z-10 shadow-md rounded ${active ? '' : 'hidden'}`}
            >
              {cartProducts.length ? ( // existen productos ?
                <> {/* si hay productos entonces: */}
                  <div className='row-product '>
                    {cartProducts.map((product) => (
                      <div className='flex items-center justify-between p-8 border-b' key={product.id}>
                        <div className='flex items-center justify-between flex-8'>

                          {/* {product.name} - {product.price} x{' '} */}

                          <p className='text-[1.5rem] mr-3'>
                            {product.name}
                          </p>
                          <span className='font-bold text-[1.5rem] ml-2.5'>
                            ${product.price}
                          </span>

                          <span className='w-[4rem]'></span>

                          <button className='mr-6 text-[1.5rem] bg-secondary-blue2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleDecrement(product)}>-</button>
                          <span className='font-normal text-[1.5rem] mr-6'>
                            {productQuantities[product.id]}
                          </span>
                          <button className='text-[1.5rem] bg-secondary-blue2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleIncrement(product)}>+</button>



                        </div>
                        {/* Cruz de eliminar producto */}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6 cursor-pointer'
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  <div className='flex justify-center items-center py-5 gap-5'>
                    <h3 className='text-[1.5rem]'>Products:</h3>
                    <span className='text-[1.5rem] font-extrabold'>{cartCount}</span>
                  </div>
                  <div className='flex justify-center items-center py-5 gap-5'>
                    <h3 className='text-[1.5rem]'>Total:</h3>
                    <span className='text-[1.5rem] font-extrabold'>${cartTotal}</span>
                  </div>

                  <button className='border-0 bg-black text-white py-4 block w-full mt-2.5 rounded-bl-lg rounded-br-lg font-inherit cursor-pointer text-[1.5rem] transition-all duration-300 ease-in-out' 
                  onClick={clearCartButton}>
                    Empty cart
                  </button>
                </>
              ) : (
                <p className='p-5 text-center'>Cart is empty</p>
              )}
            </div>
          </div>
    )
}

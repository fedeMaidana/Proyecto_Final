import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProducts, getUsers, setModal, createOrAddToCartbackend } from "../redux/actions"
import { handleDescriptionChange } from "../handlers/handlers"
import { IconCart, IconShare } from "../assets/icons/icons"
import { handlerSaveDesign, handlerSendDesignDataBase } from "../handlers/handlers"
import { v4 as uuidv4 } from 'uuid'
import { addToCart, loadCart } from "../redux/actions"
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../auxFunctions/localStorage'
import { categoryByModel } from "../auxFunctions/categoryByModel"
import { ModalWarning } from "./ModalWarning"

const enabledButtonClasses = "h-[40px] w-[40px] bg-white border rounded-full flex items-center justify-center cursor-pointer"
const disabledButtonClasses = "h-[40px] w-[40px] bg-gray-300 border rounded-full flex items-center justify-center cursor-not-allowed"

export function ModalCustomize( { price, currentModel } ){
    const dispatch = useDispatch()

    const token = localStorage.getItem( 'token' )
    const googleToken= localStorage.getItem( 'googleToken' )

    useEffect(() => {
        dispatch( setModal( false ) )
    }, [])

    const [ isButtonsEnabled, setButtonsEnabled ] = useState( false )
    const [ allProducts, setAllProducts ] = useState( [] )
    const [ cartData, setCartData ] = useState( { cartProducts: [], cartTotal: 0, cartCount: 0 } )
    const [ showAddedMessage, setShowAddedMessage ] = useState( false )
    const [ showAddedMessageGuardar, setShowAddedMessageGuardar ] = useState( false )

    const description = useSelector( state => state.designDescription )
    const color = useSelector( state => state.clothingColor )
    const size = useSelector( state => state.clothingSize )
    const title = useSelector( state => state.designTitle )
    const openModal = useSelector( state => state.openModal )
    const capturedImages = useSelector( state => state.capturedImages )
    const products = useSelector( state => state.products )
    const cartProducts = useSelector( state => state.cartProducts )
    const cartTotal = useSelector( state => state.cartTotal )
    const cartCount = useSelector( state => state.cartCount )
    const allUsers = useSelector( state => state.allUsers )

    const userId = localStorage.getItem( 'userId' )

    const parsedUserId = parseInt( userId, 10 )
    const connectedUser = allUsers.find( user => user.id === parsedUserId )

    let lastCreatedProductId
    let category = categoryByModel( currentModel )
    let formdata = handlerSaveDesign( description, capturedImages, color, size, title, price, 1, category, userId )

    if( connectedUser && Array.isArray( connectedUser.CreatedProducts ) ){
        const createdProducts = connectedUser.CreatedProducts

        if( createdProducts.length > 0 ) lastCreatedProductId = createdProducts.slice( -1 )[ 0 ].id

    }

    const onAddProduct = ( data, products ) => {
        const newProduct = {
            productId: uuidv4(),
            id: lastCreatedProductId,
            name: data.get( 'name' ),
            price: data.get('price'),
            description: data.get('description'),
            stock: data.get('stock'),
            color: data.get('color'),
            size: data.get('size'),
            category: data.get('category'),
            images: products[ products.length - 1 ]?.images[ 0 ]
        }

        setAllProducts( [ ...allProducts, newProduct ] )
        dispatch( addToCart( newProduct ) )
        const cartId = localStorage.getItem( 'cartId' )

        if( parsedUserId || cartId === null ) dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )
        else dispatch( createOrAddToCartbackend( parsedUserId, cartId, newProduct ) )

        setShowAddedMessage( true )

        setTimeout(() => {
            setShowAddedMessage( false )
        }, 3000)
    }

    useEffect(() => {
        dispatch( getUsers() )
        dispatch( getProducts() )
    }, [ dispatch ])

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

    return (
      <>
        {openModal && (
          <>
            {(!token || !googleToken) ? (
              <ModalWarning
                message={
                  'Para poder finalizar tu diseño primero debes tener una sesión abierta'
                }
              />
            ) : (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="w-[50%] h-[43%] bg-[#f6f6f6] p-5 rounded-[10px] flex flex-col">
                  <button
                    className="bg-red-500 text-white px-5 py-3 rounded-full self-end"
                    onClick={() => dispatch(setModal(false))}
                  >
                    X
                  </button>

                  <div className="h-[100%] flex flex-col justify-evenly items-center">
                    <div className="w-full">
                      <label
                        htmlFor="description"
                        className="text-[1.2rem] font-semibold"
                      >
                        Agrega una descripción
                      </label>
                      <textarea
                        id="description"
                        type="text"
                        placeholder="Descripción..."
                        className="w-full h-[100px] border outline-none p-5 rounded-[10px] mt-[10px] mb-4 text-[1.2rem]"
                        onChange={(event) =>
                          handleDescriptionChange(event, dispatch)
                        }
                      />
                    </div>

                    <div className="w-full flex justify-center gap-[30px]">
                      <button
                        className={
                          description === ''
                            ? 'w-[160px] h-[40px] py-3 bg-gray-300 text-[#999] border font-semibold text-[1.5rem] rounded-full cursor-not-allowed'
                            : 'w-[160px] h-[40px] py-3 bg-white border font-semibold text-[1.5rem] rounded-full'
                        }
                        onClick={() => {
                          if (description !== '') {
                            handlerSendDesignDataBase(
                              setButtonsEnabled,
                              setShowAddedMessageGuardar,
                              formdata,
                            )
                          }
                        }}
                      >
                        Guardar y compartir
                      </button>

                      <div className="flex gap-[10px]">
                        <button
                          className={
                            isButtonsEnabled
                              ? enabledButtonClasses
                              : disabledButtonClasses
                          }
                          title="Agregar diseño al carrito"
                          disabled={!isButtonsEnabled}
                          onClick={() => onAddProduct(formdata, products)}
                        >
                          <IconCart isButtonsEnabled={isButtonsEnabled} />
                        </button>

                        {/* <button
                          className={
                            isButtonsEnabled
                              ? enabledButtonClasses
                              : disabledButtonClasses
                          }
                          title="Compartir diseño"
                          disabled={!isButtonsEnabled}
                        >
                          <IconShare isButtonsEnabled={isButtonsEnabled} />
                        </button> */}
                      </div>
                    </div>
                    <div
                      className={`text-white text-[1.5rem] ${
                        showAddedMessage
                          ? 'opacity-100 bg-blue-400 border-4 border-blue-400 rounded-[20px] p-4'
                          : 'opacity-0'
                      } transition-opacity duration-300`}
                    >
                      Artículo agregado al carrito
                    </div>
                    <div
                      className={`text-white text-[1.5rem] ${
                        showAddedMessageGuardar
                          ? 'opacity-100 bg-blue-400 border-4 border-blue-400 rounded-[20px] p-4'
                          : 'opacity-0'
                      } transition-opacity duration-300`}
                    >
                      Artículo guardado
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
}
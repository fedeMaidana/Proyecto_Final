import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setModal, getUsers, getProducts } from "../redux/actions"
import { handleDescriptionChange } from "../handlers/handlers"
import { IconCart, IconShare } from "../assets/icons/icons"
import { handlerSaveDesign, handlerSendDesignDataBase } from "../handlers/handlers"
import { v4 as uuidv4 } from 'uuid'
import { addToCart, loadCart } from "../redux/actions"
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../auxFunctions/localStorage'

const enabledButtonClasses = "h-[40px] w-[40px] bg-white border rounded-full flex items-center justify-center cursor-pointer"
const disabledButtonClasses = "h-[40px] w-[40px] bg-gray-300 border rounded-full flex items-center justify-center cursor-not-allowed"

export function ModalCustomize( { price } ){
    const dispatch = useDispatch()

    const [ isButtonsEnabled, setButtonsEnabled ] = useState( false )
    const [ allProducts, setAllProducts ] = useState( [] )
    const [ cartData, setCartData ] = useState( { cartProducts: [], cartTotal: 0, cartCount: 0 } )

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

    let formdata = handlerSaveDesign( description, capturedImages, color, size, title, price, 1, 3 )

    const onAddProduct = ( data, products ) => {
        const newProduct = {
            id: uuidv4(),
            name: data.get('name'),
            price: data.get('price'),
            description: data.get('description'),
            stock: data.get('stock'),
            color: data.get('color'),
            size: data.get('size'),
            category: data.get('category'),
            images: products[ products.length - 1 ].images[ 0 ]
        }

        setAllProducts( [ ...allProducts, newProduct ] )
        dispatch( addToCart( newProduct ) )
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

    return(
        <>
            { openModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-[50%] h-[50%] bg-[#f6f6f6] p-5 rounded-[10px] flex flex-col ">
                        <button
                            className="bg-red-500 text-white px-5 py-3 rounded-full self-end"
                            onClick={ () => dispatch( setModal( false ) ) }
                        >
                            X
                        </button>

                        <div className="h-[100%] flex flex-col justify-evenly items-center">
                            <div className="w-full">
                                <label htmlFor='description' className="text-[1.2rem] font-semibold">Agregale una descripción al diseño</label>
                                <textarea
                                    id="description"
                                    type="text"
                                    placeholder="Descripción..."
                                    className="w-full h-[100px] border outline-none p-5 rounded-[10px] mt-[10px] mb-4 text-[1.2rem]"
                                    onChange={ event => handleDescriptionChange( event, dispatch ) }
                                />
                            </div>

                            <div className="w-full flex justify-center gap-[30px]">
                                <button
                                    className="w-[25%] h-[40px] py-3 bg-white border font-semibold text-[1.5rem] rounded-full"
                                    onClick={ () => handlerSendDesignDataBase(setButtonsEnabled, formdata) }
                                >
                                    Guardar diseño
                                </button>

                                <div className="flex gap-[10px]">
                                    <button
                                        className={ isButtonsEnabled ? enabledButtonClasses : disabledButtonClasses }
                                        title="Agregar diseño al carrito"
                                        disabled={ !isButtonsEnabled }
                                        onClick={ () => onAddProduct(formdata, products) }
                                    >
                                        <IconCart isButtonsEnabled={ isButtonsEnabled } />
                                    </button>

                                    <button
                                        className={ isButtonsEnabled ? enabledButtonClasses : disabledButtonClasses }
                                        title="Compartir diseño"
                                        disabled={ !isButtonsEnabled }
                                    >
                                        <IconShare isButtonsEnabled={ isButtonsEnabled } />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setModal } from "../redux/actions"
import { handleDescriptionChange } from "../handlers/handlers"
import { IconCart, IconShare } from "../assets/icons/icons"
import { handlerSaveDesign } from "../handlers/handlers"

const enabledButtonClasses = "h-[40px] w-[40px] bg-white border rounded-full flex items-center justify-center cursor-pointer"
const disabledButtonClasses = "h-[40px] w-[40px] bg-gray-300 border rounded-full flex items-center justify-center cursor-not-allowed"

export function ModalCustomize( { price } ){
    const dispatch = useDispatch()

    const [ isButtonsEnabled, setButtonsEnabled ] = useState( false )

    const description = useSelector( state => state.designDescription )
    const images = useSelector( state => state.capturedImages )
    const color = useSelector( state => state.clothingColor )
    const size = useSelector( state => state.clothingSize )
    const title = useSelector( state => state.designTitle )
    const openModal = useSelector( state => state.openModal )

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
                                    onClick={ () => handlerSaveDesign( setButtonsEnabled, description, images, color, size, title, price, 1, 1 ) }
                                >
                                    Guardar diseño
                                </button>

                                <div className="flex gap-[10px]">
                                    <button
                                        className={ isButtonsEnabled ? enabledButtonClasses : disabledButtonClasses }
                                        title="Agregar diseño al carrito"
                                        disabled={ !isButtonsEnabled }
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
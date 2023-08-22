import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { handleTitleChange, handleCaptureScreenshot, handleModal } from "../handlers/handlers"
import { IconArrowBack, IconCamera } from "../assets/icons/icons"
import { setColor, setDescription, setSize, setTitle, clearImages } from "../redux/actions"

const enabledButtonClasses = "h-[40px] w-[100px] bg-white p-5 text-[1.5rem] font-semibold border rounded-full flex items-center justify-center cursor-pointer"
const disabledButtonClasses = "h-[40px] w-[100px] bg-gray-300 p-5 text-[1.5rem] text-[#999] font-semibold border rounded-full flex items-center justify-center cursor-not-allowed"

export function HeaderCanvas(){
    const dispatch = useDispatch()

    const title = useSelector( state => state.designTitle )
    const capturedImages = useSelector( state => state.capturedImages )
    const clothingColor = useSelector( state => state.clothingColor )
    const size = useSelector( state => state.clothingSize )

    const [ isEditing, setIsEditing ] = useState( false )

    const handleArrowClean = () => {
        dispatch( setColor( '' ) )
        dispatch( setDescription( '' ) )
        dispatch( setSize( '' ) )
        dispatch( setTitle( 'Diseño sin titulo' ) )
        dispatch( clearImages() )
    }

    return(
        <>
            <header className="flex h-full justify-between items-center" >
                <div className="flex items-center gap-[20px]">
                    <NavLink to="/home" className=" p-4 bg-[#ffffff] rounded-full border-[1px] border-[#e6e6e6]">
                        <IconArrowBack onClick={ handleArrowClean } />
                    </NavLink>
                </div>
                <div className="flex gap-[10px]">
                    { isEditing ? (
                        <input
                            type="text"
                            placeholder={ title }
                            onChange={ event => handleTitleChange( event, dispatch ) }
                            onBlur={ () => setIsEditing( false ) }
                            autoFocus
                            className="
                                transform
                                translate-x-[80px]
                                text-[1.5rem]
                                font-semibold
                                border
                                border-gray-300
                                rounded-full
                                px-2
                                py-1
                                focus:outline-none
                                text-center
                            "
                        />
                    ) : (
                        <p className="text-[1.5rem] font-semibold transform translate-x-[80px]" onClick={ () => setIsEditing( true ) }>
                            { title || 'Diseño sin titulo' }
                        </p>
                    )}
                </div>
                <div className="flex flex-row gap-[10px]">
                    <button
                        className="
                            w-[100px]
                            h-[40px]
                            bg-[#ffffff]
                            p-5
                            flex
                            gap-[10px]
                            items-center
                            justify-center
                            rounded-full
                            text-[1.5rem]
                            font-semibold
                            border-[1px]
                        "
                        onClick={ () => handleCaptureScreenshot( dispatch, capturedImages ) }
                    >
                        <IconCamera/>
                        { capturedImages.length }
                    </button>
                    <button
                        className={ title === '' || clothingColor === '' || size === '' || capturedImages.length === 0 ? disabledButtonClasses : enabledButtonClasses }
                        onClick={ async () => {
                            if( title !== '' && clothingColor !== '' && size !== '' && capturedImages.length >= 1 ){
                                await handleModal( dispatch ) } }
                            }
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}
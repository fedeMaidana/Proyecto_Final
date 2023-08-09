import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { handleTitleChange, handleCaptureScreenshot, handleModal } from "../handlers/handlers"
import { IconArrowBack, IconCamera } from "../assets/icons/icons"

export function HeaderCanvas(){
    const dispatch = useDispatch()

    const title = useSelector( state => state.designTitle )
    const capturedImages = useSelector( state => state.capturedImages )
    const [ isEditing, setIsEditing ] = useState( false )

    return(
        <>
            <header className="flex h-full justify-between items-center" >
                <div className="flex items-center gap-[20px]">
                    <NavLink to="/home" className=" p-4 bg-[#ffffff] rounded-full border-[1px] border-[#e6e6e6]">
                        <IconArrowBack/>
                    </NavLink>
                </div>
                <div className="flex gap-[10px]">
                    { isEditing ? (
                        <input
                            type="text"
                            value={ title }
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
                            {title}
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
                        className="
                            w-[100px]
                            h-[40px]
                            bg-[#ffffff]
                            p-5 flex
                            items-center
                            justify-center
                            rounded-full
                            text-[1.5rem]
                            font-semibold
                            border-[1px]
                        "
                        onClick={ () => handleModal( dispatch ) }
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}
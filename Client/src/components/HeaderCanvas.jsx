import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setModal } from "../redux/actions"
import { handleTitleChange } from "../handlers/handlers"

export function HeaderCanvas(){
    const dispatch = useDispatch()

    const title = useSelector( state => state.designTitle )
    const [ isEditing, setIsEditing ] = useState( false )

    return(
        <>
            <header className="flex h-full justify-between items-center" >
                <div className="flex items-center gap-[20px]">
                    <NavLink to="/home" className=" p-4 bg-[#ffffff] rounded-full border-[1px] border-[#e6e6e6]">
                        <svg width="20" height="20" viewBox="0 0 32 49" fill="none" className="rotate-[270deg]">
                            <path d="M1 20L16 1M16 1L31 20M16 1V49" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </NavLink>
                </div>
                <div className="flex gap-[10px]">
                    {isEditing ? (
                        <input
                            type="text"
                            value={ title }
                            onChange={ event => handleTitleChange( event, dispatch ) }
                            onBlur={ () => setIsEditing( false ) }
                            autoFocus
                            className="
                                ml-[60px]
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
                        <p className="text-[1.5rem] font-semibold ml-[60px]" onClick={ () => setIsEditing( true ) }>{title}</p>
                    )}
                </div>
                <div className="flex flex-row gap-[10px]">
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
                        onClick={ () => dispatch( setModal( true ) ) }
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}
import { NavLink } from 'react-router-dom'

export const ModalWarning = ( { message } ) => {
    return(
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="w-auto h-[150px] bg-[#fffca0] p-5 border-[2px] border-[#bcb402] rounded-[10px] flex flex-col items-center justify-around">
                    <p className='text-[1.5rem] font-bold text-[#d8ce04]'>{ message }</p>
                    <NavLink to='../login' >
                        <button className='text-white font-semibold text-[1.4rem] py-2 px-4 bg-[#33a1fd] rounded-full'>Iniciar sesión</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}
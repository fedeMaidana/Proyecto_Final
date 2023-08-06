import { useSelector, useDispatch } from "react-redux"
import { setModal } from "../redux/actions"

export function ModalCustomize(){
    const dispatch = useDispatch()
    const openModal = useSelector( state => state.openModal )

    return(
        <>
            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-[50%] h-[50%] bg-white p-8 rounded-md flex flex-col rounded-[10px]">
                        <button
                            className="bg-red-500 text-white px-5 py-3 rounded-full self-end"
                            onClick={ () => dispatch( setModal( false ) ) }
                        >
                            X
                        </button>
                        <h2 className="text-lg font-semibold">Contenido del Modal</h2>
                    </div>
                </div>
            )}
        </>
    )
}
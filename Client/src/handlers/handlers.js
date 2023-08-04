import { setColor, setSize } from "../redux/actions"

export const handleColor = ( color, dispatch ) => {
    dispatch( setColor( color ) )
}

export const handleSize = ( size, dispatch ) => {
    dispatch( setSize( size ) )
}
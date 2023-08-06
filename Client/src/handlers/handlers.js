import { setColor, setSize, setTitle } from "../redux/actions"

export const handleColor = ( color, dispatch ) => {
    dispatch( setColor( color ) )
}

export const handleSize = ( size, dispatch ) => {
    dispatch( setSize( size ) )
}

export const handleTitleChange = ( event, dispatch ) => {
    dispatch( setTitle( event.target.value ) )
}
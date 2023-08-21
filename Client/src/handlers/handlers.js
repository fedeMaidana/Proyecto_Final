import axios from "axios"
import html2canvas from 'html2canvas'
import { setColor, setSize, setTitle, setDescription, addImage, setModal } from "../redux/actions"

export const handleColor = ( color, dispatch ) => {
    dispatch( setColor( color ) )
}

export const handleSize = ( size, dispatch ) => {
    dispatch( setSize( size ) )
}

export const handleTitleChange = ( event, dispatch ) => {
    dispatch( setTitle( event.target.value ) )
}

export const handleDescriptionChange = ( event, dispatch ) => {
    dispatch( setDescription( event.target.value ) )
}

export const handleCaptureScreenshot = async ( dispatch, capturedImages ) => {
    const canvas = document.querySelector( '.capture-container' )

    if( canvas ){
        const screenshot = await html2canvas( canvas )

        screenshot.toBlob( async blob => {
            let imageName = 'screenshot.png'
            let number = 1

            while ( capturedImages.some( image => image.name === imageName ) ){
                imageName = `screenshot_${ number }.png`
                number++
            }

            const imageFile = new File( [ blob ], imageName, { type: 'image/png' } )
            dispatch( addImage( imageFile ) )
        }, 'image/png' )
    }
}

export const handleModal = async ( dispatch ) => {
    dispatch( setModal( true ) )
}

export const handlerSaveDesign = (description, images, color, size, title, price, stateShare, category ) => {
    const formData = new FormData()
    formData.append( 'idUser', 1 )
    formData.append( 'description', description )
    formData.append( 'color', color )
    formData.append( 'size', size )
    formData.append( 'name', title )
    formData.append( 'price', price )
    formData.append( 'stock', 10 )
    formData.append( 'category', category )
    formData.append( 'stateShare', stateShare )

    images.forEach( ( image, index ) => {
        formData.append( 'images', image, `image_${ index }.png` )
    })

    return formData
}

export const handlerSendDesignDataBase = async (setButtonsEnabled, formData) => {
    await axios.post( '/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    setButtonsEnabled( true )
}
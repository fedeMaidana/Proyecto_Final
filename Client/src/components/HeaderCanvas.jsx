import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import html2canvas from 'html2canvas'
import { setModal, addImage, postProducts } from "../redux/actions"
import { handleTitleChange } from "../handlers/handlers"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { addToCart } from "../redux/actions"

export function HeaderCanvas( { price } ){
    const dispatch = useDispatch()

    const title = useSelector( state => state.designTitle )
    const clothingColor = useSelector( state => state.clothingColor )
    const clothingSize = useSelector( state => state.clothingSize )
    const designTitle = useSelector( state => state.designTitle )
    const capturedImages = useSelector( state => state.capturedImages )
    const [ isEditing, setIsEditing ] = useState( false )
    const [allProducts, setAllProducts] = useState([]);

    const handleCaptureScreenshot = async () => {
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
            }, 'image/png')
        }
    }

    const formData = new FormData();
formData.append('name', designTitle);
formData.append('price', 10);
formData.append('description', "hhhjjjk");
formData.append('stock', 10);
formData.append('color', clothingColor);
formData.append('size', clothingSize);
formData.append('category', 1);

capturedImages.forEach((image, index) => {
  formData.append(`image${index}`, image); // Agrega cada imagen al FormData
});

    const handleModal = async () => {
        //     const dataDesign = {
    //         name: designTitle,
    //         price: 10,
    //         description: '',
    //         stock: 0,
    //         images: capturedImages,
    //         color: clothingColor,
    //         size: clothingSize,
    //         category: 1
    //     }

    const formData = new FormData();
    formData.append('name', designTitle);
    formData.append('price', 10);
    formData.append('description', "hhhjjjk");
    formData.append('stock', 10);
    formData.append('color', clothingColor);
    formData.append('size', clothingSize);
    formData.append('category', 1);
    
    capturedImages.forEach((image, index) => {
        formData.append('images', image, `image_${index}.png`); // Agrega las imágenes bajo el nombre 'image'
      });
      
    

    await axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para el envío de archivos
        },
    });
    
        console.log(formData)

        dispatch( setModal( true ) )
    }
    const onAddProduct = (formData) => {
        const newProduct = {
            id: uuidv4(), 
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            stock: formData.get('stock'),
            color: formData.get('color'),
            size: formData.get('size'),
            category: formData.get('category'),
            images: capturedImages.map((image, index) => formData.get(`image${index}`)),
        };
    
        setAllProducts([...allProducts, newProduct]);
        dispatch (addToCart(newProduct));
        /* console.log(allProducts); */
    }
    
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
                        onClick={ handleCaptureScreenshot }
                    >
                        Foto
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
                        onClick={async () => {
                            await handleModal(dispatch); //Espera a que handleModal se complete
                            onAddProduct(formData);
                        }}
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}
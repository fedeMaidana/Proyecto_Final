import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { buySuccessCart } from '../redux/actions';

const PaymentSuccess = () => {
    const dispatch =useDispatch()
    const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
    const parsedUserId = parseInt(userId, 10); 
    const cartId = localStorage.getItem('cartId');
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const cartTotal = cartData.cartTotal; // Acceder al valor de cartTotal

    let cartProductsArray = [];
    const localStorageData = localStorage.getItem('cart');
    // Paso 2: Acceder a la propiedad cartProducts
    if (localStorageData) {
        const parsedData = JSON.parse(localStorageData); // Parsea el objeto JSON
        cartProductsArray = parsedData.cartProducts;

        // Ahora tienes acceso al array cartProducts
        console.log(cartProductsArray);
    } else {
        console.log('No se encontraron datos en el Local Storage');
    }

    useEffect(() => {
        dispatch(buySuccessCart(cartId, parsedUserId))
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-3xl font-semibold mb-4">Pago Exitoso</h1>
            <p className="text-lg text-gray-600 mb-8">
                ¡El pago se ha completado correctamente!
            </p>
            <h2 className="text-3xl font-semibold mb-4">Detalles de su compra</h2>
            <div className='row-product min-h-[50px] max-h-[200px] overflow-y-scroll'>
                {cartProductsArray.map(product => (
                    <div className='flex items-center justify-between p-5 border-b' key={product.productId}>
                        <div className='w-[90%] flex items-center justify-around'>
                            <img src={product.images} alt={product.description} className='w-[60px] h-[60px] object-cover select-none rounded-full' />
                            <p className='w-[100px] select-none truncate text-[1.5rem] font-semibold'>{product.name}</p>
                            <p className='w-[100px] select-none truncate text-[1.5rem] font-semibold'> {product.quantity}</p>
                            <span className='select-none font-semibold text-[1.5rem]'> ${product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
                <h2 className="items-center justify-center  text-3xl font-semibold mb-4">Total de su compra: ${cartTotal}</h2>
            <Link
                to="/home"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
                Volver al inicio
            </Link>
        </div>
    );
};

export default PaymentSuccess;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteButton from './Favorite';
import AddComment from './AddComments';
import { IconCart } from '../assets/icons/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  addToCart,
  createOrAddToCartbackend,
  loadCart,
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from '../auxFunctions/localStorage';

export const Card = ({
  name,
  nameProduct,
  description,
  images,
  price,
  id,
  stock,
  color,
  size,
  category,
}) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0); // Estado local para almacenar userId
  const [cartData, setCartData] = useState({
    cartProducts: [],
    cartTotal: 0,
    cartCount: 0,
  });
  const cartProducts = useSelector((state) => state.cartProducts);
  const cartTotal = useSelector((state) => state.cartTotal);
  const cartCount = useSelector((state) => state.cartCount);

  const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
  const parsedUserId = parseInt(userId, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleBuyButton = async () => {
    const newProduct = {
      name: nameProduct,
      description: description,
      images: images[0],
      price: price,
      id: id,
      quantity: 1,
    };

    try {
      const cartId = localStorage.getItem('cartId');
      console.log(cartId);
      console.log('us', parsedUserId);
      if (parsedUserId || cartId === null) {
        dispatch(createOrAddToCartbackend(parsedUserId, cartId, newProduct));
      }
      const response = await axios.post(
        'http://localhost:3001/create-checkout-session',
        {
          products: [newProduct],
          cartId: cartId,
        },
      );

      const { sessionUrl } = response.data; // Obtiene la URL de sesión

      if (sessionUrl) {
        // Redirige a la URL de sesión usando window.location
        window.location.href = sessionUrl;
      } else {
        console.error('URL de sesión no disponible.');
      }
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
    }
  };

  const onAddProduct = () => {
    const newProduct = {
      productId: uuidv4(),
      id: id,
      name: nameProduct,
      price: price,
      description: description,
      stock: stock,
      color: color,
      size: size,
      category: category,
      images: images[0],
    };
    dispatch(addToCart(newProduct));
    const cartId = localStorage.getItem('cartId');
    console.log(cartId);
    console.log('us', parsedUserId);
    if (parsedUserId || cartId === null) {
      dispatch(createOrAddToCartbackend(parsedUserId, cartId, newProduct));
    } else {
      dispatch(createOrAddToCartbackend(parsedUserId, cartId, newProduct));
    }
  };

  useEffect(() => {
    setCartData({
      cartProducts: cartProducts,
      cartTotal: cartTotal,
      cartCount: cartCount,
    });
  }, [cartProducts, cartTotal, cartCount]);

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();

    if (savedCart) dispatch(loadCart(savedCart));
  }, [dispatch]);

  useEffect(() => {
    saveCartToLocalStorage(cartData);
  }, [cartData]);

  return (
    <div
      className="w-[90%] h-[300px] bg-white rounded-[10px] grid grid-cols-2 grid-rows-4 p-[10px] border border-[#e7e9ec]"
      key={id}
      id={id}
    >
      <div className="flex items-center gap-[10px] row-span-1 border-b-[1px]">
        <span className="w-[50px] h-[50px] rounded-full bg-[#b7bbc3]"></span>
        <p className="text-[2rem] font-semibold">{name}</p>
      </div>

      <div className="flex items-center justify-between border-l-[1px] border-b-[1px] pl-[10px]">
        <h3 className="text-[3rem] font-bold">{nameProduct}</h3>
        <p className="text-[2rem] font-semibold">{`$${price}`}</p>
      </div>

      <div className="flex justify-center row-span-3 border-r-[1px]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={image}
            className={`w-[90%] h-full rounded-[10px] mt-[5px] bg-[#b7bbc3] object-cover ${
              index === currentIndex ? 'visible' : 'hidden'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-around row-span-3">
        <h3 className="text-[2rem] font-semibold">Sobre el producto</h3>
        <p className="text-[1.5rem]">{description}</p>
        <div className="flex items-center justify-center space-x-4">
          <FavoriteButton userId={userId} productId={id} />

          <AddComment userId={userId} productId={id} />
        </div>
      </div>
      <button title="Agregar diseño al carrito" onClick={onAddProduct}>
        <IconCart />
      </button>
      <button onClick={handleBuyButton}>Comprar</button>

      <Link to={`detail/${id}`}>Detalles</Link>
    </div>
  );
};

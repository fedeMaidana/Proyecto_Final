import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Card = ({ images, name, description, id, nameProduct, price }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    const handleBuyButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/create-checkout-session', {
                cardName: nameProduct,
                cardDescription: description,
            });
    
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

    return (
        <div className="w-[90%] h-[300px] bg-white rounded-[10px] grid grid-cols-2 grid-rows-4 p-[10px] border border-[#e7e9ec]">
            <div className="flex items-center gap-[10px] row-span-1 border-b-[1px]">
                <span className="w-[50px] h-[50px] rounded-full bg-[#b7bbc3]"></span>
                <p className="text-[2rem] font-semibold">{name}</p>
            </div>

            <div className="flex items-center justify-between border-l-[1px] border-b-[1px] pl-[10px]">
                <h3 className="text-[3rem] font-bold">{nameProduct}</h3>
                <p className="text-[2rem] font-semibold">{`$${price}`}</p>
            </div>

            <div className="flex justify-center row-span-3 border-r-[1px]">
                {/* Your images mapping logic here */}
            </div>

            <div className="flex flex-col items-center justify-around row-span-3">
                <h3 className="text-[2rem] font-semibold">Sobre el producto</h3>
                <p className="text-[1.5rem]">{description}</p>
            </div>

            <button onClick={handleBuyButton}>Comprar</button>
            <Link to={`detail/${id}`}>Detalles</Link>
        </div>
    );
};

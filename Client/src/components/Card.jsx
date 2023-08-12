import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Card = ({ image, name, description,id }) => {
    const handleBuyButton = async () => {
        try {
            const response = await axios.post('http://localhost:3001/create-checkout-session', {
                cardName: name,
                cardDescription: description,
            });

            
            console.log(response.data);
        } catch (error) {
            
            console.error('Error al enviar datos al backend:', error);
        }
    };

    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{name}</p>
            </div>
            <button onClick={handleBuyButton}>Buy</button>
            <Link to={`detail/${id}`}>Detalles</Link>
        </div>
    );
};

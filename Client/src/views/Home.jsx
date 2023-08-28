import {useEffect,} from 'react'
import shirt from "../assets/images/shirt.png"
import jeans from "../assets/images/jeans.png"
import hoodie from "../assets/images/hoodie.png"
import dress from "../assets/images/dress.png"
import jacket from "../assets/images/jacket.png"
import tshirt from "../assets/images/tshirt.png"
import { CardHome } from "../components/CardHome"
import { getComments, getUsers, fetchGoogleUserDetails } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

export const Home = () => {
    const dispatch = useDispatch() 
    const location = useLocation(); // Obtiene la ubicación actual (URL)
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const googleToken = urlParams.get('googleToken'); // Obtiene el token de la URL
  
      if (googleToken) {
        localStorage.setItem('googleToken', googleToken); // Guarda el token en el localStorage
      }
      dispatch(fetchGoogleUserDetails(googleToken));
      dispatch(getComments());
      dispatch(getUsers());
    }, [location, dispatch]);
    return(
            <div className="w-[100%] lg:h-[90%] grid grid-rows-4 bg-[#f6f5f7] transform translate-y-[10vh] px-[50px]">
                <div className="row-span-1 grid">
                    <h1 className="select-none text-[2.5rem] md:text-[5rem] lg:text-[5rem] self-end font-bold">Desata tu creatividad</h1>
                    <h2 className="select-none text-[1.5rem] md:text-[3rem] lg:text-[3rem] font-semibold text-[#92989f]">Empieza a diseñar tu propio estilo</h2>
                </div>

                <div className="w-full grid row-span-3 mb-[10px] grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[10px] items-center">
                    <CardHome href={ '/Customize/TShirt' } image={ tshirt } name={ 'Remera' } />

                    <CardHome href={ '/Customize/Shirt' } image={ shirt } name={ 'Camisa' } />

                    <CardHome href={ '/Customize/Pant' } image={ jeans } name={ 'Jean' } />

                    <CardHome href={ '/Customize/Hooded' } image={ hoodie } name={ 'Buzo' } />

                    <CardHome href={ '/Customize/Dress' } image={ dress } name={ 'Vestido' } />

                    <CardHome href={ '/Customize/Jacket' } image={ jacket } name={ 'Campera' } />
                </div>
            </div>
    )
}
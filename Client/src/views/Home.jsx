import { NavLink } from "react-router-dom"
import {useEffect} from 'react'
import shirt from "../assets/images/shirt.png"
import jeans from "../assets/images/jeans.png"
import hoodie from "../assets/images/hoodie.png"
import dress from "../assets/images/dress.png"
import jacket from "../assets/images/jacket.png"
import tshirt from "../assets/images/tshirt.png"
import pattern from "../assets/images/pattern.png"
import { CardHome } from "../components/CardHome"

export const Home = () => {
    return(
            <div className="w-[100%] h-[90%] bg-[#f6f5f7] transform translate-y-[10vh] px-[50px] flex flex-col justify-evenly">
                {/* <img className="absolute w-[20rem] right-[0rem] top-[5rem] hidden lg:block" src={pattern} alt="pattern top" />
                <img className="absolute w-[20rem] right-[172rem] top-[62rem] rotate-180 hidden lg:block" src={pattern} alt="pattern bottom" /> */}

                <div>
                    <h1 className="text-[5rem] font-bold">Desata tu creatividad</h1>
                    <h2 className="text-[3rem] font-semibold text-[#92989f]">Empieza a diseñar tu propio estilo</h2>
                </div>

                <div className="w-full flex flex-wrap justify-center gap-x-[38px] gap-y-[10px]">
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
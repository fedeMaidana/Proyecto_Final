import { NavLink } from "react-router-dom"
import shirt from '../assets/images/shirt01.png'
import shirt02 from '../assets/images/shirt02.png'
import jacket from '../assets/images/shirt03.png'
import circle from '../assets/images/circleBlue_33a1fd.png'

export const Intro = () => {
    return(
        <>
        <section className="bg-principal-black text-white py-20 h-screen w-screen flex justify-center items-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">

            <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                <h1 className="text-3xl md:text-8xl p-2 text-principal-white tracking-loose font-medium tracking-wide mb-[4rem]">Custom Craft</h1>
                <h2 className="text-1xl md:text-3xl leading-relaxed md:leading-snug mb-[10rem]">Make your ideas come true, design your own style</h2>
                <NavLink 
                to="/home"
                href="#"
                className="bg-transparent md:text-3xl hover:bg-[#33a1fd] text-principal-white hover:text-principal-white rounded shadow hover:shadow-lg py-5 px-10 border-2 border-[#33a1fd] hover:border-transparent"
                >                               
                Explore Now
                </NavLink>
            </div>

            <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                    <div className="relative h-[26rem] ">
                        <img className="w-full md:absolute md:inset-0 md:w-[22rem] md:mx-auto z-10" src={jacket} alt="Jacket"/>
                        <img className="w-[22rem] absolute inset-0 z-0" src={circle} alt="Circle"/>
                    </div>

                    <div className="relative h-[26rem] mb-11">
                        <img className="w-full md:absolute md:w-[26rem] md:mx-auto z-10 bottom-12" src={shirt} alt="Shirt"/>
                        <img className="w-[26rem] absolute bottom-12 z-0" src={circle} alt="Circle"/>
                    </div>

                    <div className="relative h-[26rem]">
                        <img className="w-full md:absolute md:inset-0 md:w-[22rem] md:mx-auto z-10" src={shirt02} alt="Shirt 02"/>
                        <img className="w-[22rem] absolute inset-0 z-0" src={circle} alt="Circle"/>
                    </div>
                </div>
            </div>
            
            </div>
        </section>
        </>

    )
}

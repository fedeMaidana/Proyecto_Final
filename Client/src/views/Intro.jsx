import { NavLink } from "react-router-dom"
import shirt from '../assets/images/shirt01.png'
import shirt02 from '../assets/images/shirt02.png'
import jacket from '../assets/images/shirt03.png'
import circle from '../assets/images/circleBlue_33a1fd.png'

export const Intro = () => {
    return(
        <>
            <main className="h-full flex justify-center items-center p-10">
                <div className="w-full h-full flex flex-col md:flex-row lg:flex-row items-center justify-evenly md:items-center md:justify-between lg:items-center lg:justify-between">
                    <div className="w-[420px] h-[200px] flex flex-col items-center md:items-baseline lg:items-baseline justify-between">
                        <span>
                            <h1 className="text-center md:text-left lg:text-left text-[5rem] font-bold">Custom Craft</h1>
                            <h2 className="text-center md:text-left lg:text-left text-[1.8rem] font-semibold text-[#92989f]">Haz realidad tus ideas.</h2>
                        </span>
                        <NavLink
                            to="/home"
                            className="
                                w-[200px]
                                text-center
                                bg-transparent
                                hover:bg-[#33a1fd]
                                text-[#33a1fd]
                                text-[2rem]
                                font-semibold
                                hover:text-principal-white
                                rounded-[10px]
                                py-5
                                px-10
                                border-2
                                border-[#33a1fd]
                                hover:border-transparent
                            "
                        >
                            Explorar Ahora
                        </NavLink>
                    </div>

                    <div className="w-auto h-auto flex flex-col flex-wrap justify-center gap-[10px]">
                        <div className="relative md:transform md:translate-x-[-300px] lg:transform lg:translate-x-[-300px]">
                            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ circle } alt="Circle" />
                            <img className="absolute top-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ jacket } alt="Jacket" />
                        </div>

                        <div className="relative">
                            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ circle } alt="Circle" />
                            <img className="absolute top-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ shirt } alt="Shirt" />
                        </div>

                        <div className="relative md:transform md:translate-x-[-300px] lg:transform lg:translate-x-[-300px]">
                            <img className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ circle } alt="Circle" />
                            <img className="absolute top-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px]" src={ shirt02 } alt="Shirt 02" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

import { NavLink } from "react-router-dom"
import shirt from '../assets/camisa02.jpg'

export const Intro = () => {
    return(
        <>
            <section>
                <div className="principal-black text-white py-20">
                    <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
                        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                            <h1 className="text-3xl md:text-5xl p-2 text-principal-white tracking-loose font-medium tracking-wide">Custom Craft</h1>
                            <h2 className="text-1xl md:text-3xl leading-relaxed md:leading-snug mb-2">Make your ideas come true, design your own style</h2>
                            
                            <NavLink 
                            to="/home"
                            href="#"
                            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
                            >                               
                                Explore Now
                            </NavLink>
                        </div>
                        <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                            <div className="h-48 flex flex-wrap content-center">
                                <div>
                                    <img className="mt-28 hidden w-44 xl:block" src={shirt}/>
                                </div>
{/*                                     <div>
                                        <img className="inline-block mt-24 md:mt-0 p-8 md:p-0"  src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png"/>
                                    </div>
                                    <div>
                                        <img className="mt-28 hidden lg:block" src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png"/>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
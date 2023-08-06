import { NavLink } from "react-router-dom"
import shirt from "../assets/images/shirt.png"
import jeans from "../assets/images/jeans.png"
import hoodie from "../assets/images/hoodie.png"
import dress from "../assets/images/dress.png"
import jacket from "../assets/images/jacket.png"
import tshirt from "../assets/images/tshirt.png"
import pattern from "../assets/images/pattern.png"

export const Home = () => {
    return(
        <div >
            <div> {/* Sección Customize your clothing */}
                <img className="absolute w-[20rem] right-[0rem] top-[0rem] hidden lg:block" src={pattern} alt="pattern top" />
                <img className="absolute w-[20rem] right-[172rem] top-[56.5rem] rotate-180" src={pattern} alt="pattern bottom" />

                <h1 className="text-secondary-blue2 font-extrabold text-[5rem] mt-32 flex justify-center">
                    Customize your clothing
                </h1>
                <h2 className="text-principal-white font-extrabold text-[3rem] mt-10 flex justify-center">
                    Start designing your own style
                </h2>
                {/* Cards de ropa */}
                <div class="flex h-auto mt-32  mb-[30rem] items-center justify-center flex-wrap  px-4 gap-[5rem]">
                    <NavLink to="/Customize/Shirt"> {/* Shirt */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={shirt} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    Shirt
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/Customize/Pant"> {/* Jeans */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={jeans} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    Jeans
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/Customize/Hooded"> {/* Hoodie */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={hoodie} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    Hoodie
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/Customize/Dress"> {/* Dress */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={dress} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    Dress
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/Customize"> {/* Jacked */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={jacket} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    Jacked
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/Customize/TShirt"> {/* T-shirt */}
                        <div class="max-w-sm overflow-hidden rounded-xl bg-secondary-violet shadow-md duration-200 hover:scale-105 hover:shadow-xl z-1 relative">
                            <svg className="absolute z-10 max-w-sm max-h-[33rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="1 1 400 400"><g mask="url(&quot;#SvgjsMask1074&quot;)" fill="none"><path d="M -250.13075291981832,282 C -210.13,264.2 -130.13,192.2 -50.13075291981832,193 C 29.87,193.8 69.87,309.6 149.86924708018168,286 C 229.87,262.4 299.84,82.2 349.8692470801817,75 C 399.9,67.8 389.97,215 400,250" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -118.91083475210911,280 C -78.91,259.6 1.09,184 81.08916524789089,178 C 161.09,172 201.09,274.6 281.0891652478909,250 C 361.09,225.4 457.31,59.8 481.0891652478909,55 C 504.87,50.2 416.22,191.8 400,226" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -346.67505905801903,100 C -306.68,123.2 -226.68,229 -146.67505905801903,216 C -66.68,203 -26.68,30.4 53.32494094198097,35 C 133.32,39.6 183.99,229 253.32494094198097,239 C 322.66,249 370.66,115.8 400,85" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -88.03239106062742,228 C -48.03,206.8 31.97,101.2 111.96760893937258,122 C 191.97,142.8 231.97,319 311.96760893937255,332 C 391.97,345 494.36,185.2 511.96760893937255,187 C 529.57,188.8 422.39,310.2 400,341" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -54.761887864667415,28 C -14.76,72.6 65.24,240 145.23811213533259,251 C 225.24,262 265.24,72.4 345.2381121353326,83 C 425.24,93.6 534.29,293.4 545.2381121353326,304 C 556.19,314.6 429.05,169.6 400,136" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path><path d="M -176.70219055336037,204 C -136.7,174.6 -56.7,44.2 23.29780944663962,57 C 103.3,69.8 143.3,246.4 223.29780944663963,268 C 303.3,289.6 387.96,157 423.29780944663963,165 C 458.64,173 404.66,279.4 400,308" stroke="rgba(235, 235, 235, 1)" stroke-width="2"></path></g><defs><mask id="SvgjsMask1074"><rect width="400" height="400" fill="#2E4AC5"></rect></mask></defs></svg>
                            <img src={tshirt} alt="plant" class="h-auto w-full relative z-20" />
                            <div class="p-5">
                                {/* <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p> */}
                                <h1
                                    className="flex justify-center rounded-md py-2 text-principal-white duration-75 w-full text-[3rem] font-bold"
                                >
                                    T-shirt
                                </h1>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>

            <div className="w-auto h-screen bg-secondary-blue2"> {/* Sección Your designs */}
                <h2 className="text-principal-black font-extrabold text-[5rem] pt-[6rem] flex justify-center">Your designs</h2>


            </div>
        </div>
    )
}

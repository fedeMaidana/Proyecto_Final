export const Card = ( { name, nameProduct, description, images } ) => {

    console.log(images)

    return(
        <div className="w-[90%] h-[auto] bg-[#474a4f] rounded-[10px] flex flex-col p-[10px] gap-[10px]">
            <header className="flex items-center gap-[10px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#b7bbc3]"></div>
                <p className="text-[1.5rem] font-semibold">{ name }</p>
            </header>

            <h3 className="text-center mb-[10px] text-[2rem] font-semibold">{ nameProduct }</h3>

            <div className="flex justify-around">
                {images.map( ( image, index ) => (
                    <img key={ index } src="" alt="" className="w-[100px] h-[100px] rounded-[10px] bg-[#b7bbc3]" />
                ))}
            </div>

            <p className="text-center mt-[10px] text-[1.2rem]">{ description }</p>
        </div>
    )
}
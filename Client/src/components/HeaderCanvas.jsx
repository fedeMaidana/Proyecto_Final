export function HeaderCanvas(){
    return(
        <>
            <header className="flex h-full justify-between items-center" >
                <h2 className="text-[3rem] font-bold" >$ 10</h2>
                <div className="flex flex-row gap-[10px]">
                    <button
                        className="
                            w-[100px]
                            h-[40px]
                            bg-[#696969]
                            p-5 flex
                            items-center
                            justify-center
                            rounded-full
                            text-[1.5rem]
                            font-semibold"
                    >
                        Finalizar
                    </button>
                </div>
            </header>
        </>
    )
}
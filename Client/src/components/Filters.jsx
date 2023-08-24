import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, getCategories, applySorting } from '../redux/actions'

export function Filter() {
    const dispatch = useDispatch()

    const categories = useSelector( state => state.categories )

    useEffect(() => {
        dispatch( getCategories() )
    }, [ dispatch ] )

    const [ category, setCategory ] = useState( '' )
    const [ minPrice, setMinPrice ] = useState( '' )
    const [ maxPrice, setMaxPrice ] = useState( '' )
    const [ selectedSorting, setSelectedSorting ] = useState( '' )

    const handleApplyFilters = () => {
        const newFilters = {
            category: category,
            minPrice: minPrice,
            maxPrice: maxPrice
        }

        dispatch( applyFilters( newFilters ) )
    }

    const handleSortingChange = ( newSorting ) => {
        setSelectedSorting( newSorting )
        dispatch( applySorting( newSorting ) )
    }

    const handleClearFilters = () => {
        setCategory( '' )
        setMinPrice( '' )
        setMaxPrice( '' )

        dispatch( applyFilters( { category: '', minPrice: '', maxPrice: '' } ) )
    }

    const showClearFiltersButton = category !== '' || minPrice !== '' || maxPrice !== ''

    return(
        <div className="w-[90%] grid grid-cols-6 rounded-[10px] bg-white text-black p-5 border border-[#e7e9ec]">
            <div className="w-auto col-span-3 flex flex-col items-center text-black gap-[10px] border-l-[1px] border-r-[1px]">
                <h2 className="text-xl font-bold">Filtrar</h2>
                <div className='w-full flex justify-center gap-[10px] px-[10px]'>
                    <div className='w-auto px-[5px] border flex items-center justify-center gap-[10px] rounded-[10px]'>
                        <p className='text-[1.1rem] font-semibold'>Categoría:</p>
                        <select
                            className="outline-none bg-transparent flex items-center border-b-[1px] border-[#e8eaed]"
                            onChange={ e => setCategory( e.target.value ) }
                        >
                            <option value="all">Todo</option>
                            { categories?.map( category => (
                                <option value={ category.id } key={ category.id } >
                                    { category.name }
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-auto px-[5px] border-[1px] flex items-center justify-center gap-[10px] rounded-[10px] py-[5px]'>
                        <p className='text-[1.1rem] font-semibold'>Precio:</p>
                        <input
                            className="w-[80px] border-b-[1px] border-[#e8eaed] rounded p-1 outline-none"
                            type="number"
                            value={ minPrice }
                            onChange={ e => setMinPrice( e.target.value ) }
                            placeholder='Minimo...'
                        />

                        <input
                            className="w-[80px] border-b-[1px] border-[#e8eaed] rounded p-1 outline-none"
                            type="number"
                            value={ maxPrice }
                            onChange={ e => setMaxPrice( e.target.value ) }
                            placeholder='Maximo...'
                        />
                    </div>
                </div>
            </div>

            <div className='w-auto col-span-1 px-[10px] flex flex-col justify-center items-center gap-[10px] border-r-[1px]'>
                <button
                    className="w-[100px] border-[1px]  bg-[#25a010] rounded-[10px] px-4 py-2"
                    onClick={ handleApplyFilters }
                >
                    <p className='text-[#c0ffb5] font-semibold'>Aplicar filtros</p>
                </button>

                { showClearFiltersButton && (
                    <button
                        className="w-[100px] border-[1px] border-[#a01010] rounded-[10px] px-4 py-2"
                        onClick={ handleClearFilters }
                    >
                        <p className='text-[#a01010] font-semibold'>Eliminar filtros</p>
                    </button>
                )}
            </div>

            <div className="w-auto col-span-2 px-[10px] flex flex-col items-center gap-[10px] border-r-[1px]">
                <h2 className="text-xl font-bold">Ordenar</h2>
                <div className='w-auto flex border-[1px] flex items-center justify-center gap-[10px] rounded-[10px] p-[5px]'>
                    <p className='text-[1.1rem] font-semibold'>Por:</p>
                    <select
                        className="outline-none border-b-[1px] border-[#e8eaed]"
                        value={ `${ selectedSorting }` }
                        onChange={ e => handleSortingChange( e.target.value ) }
                    >
                        <option value="">Defecto</option>
                        <option value="priceAsc">Menor precio</option>
                        <option value="priceDesc">Mayor precio</option>
                        <option value="nameAsc">A a la Z</option>
                        <option value="nameDesc">Z a la A</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
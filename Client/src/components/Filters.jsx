import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, getCategories, applySorting } from '../redux/actions'

export function Filter() {
    const dispatch = useDispatch()

    const filters = useSelector( state => state.filters )
    const sorting = useSelector( state => state.sorting )
    const categories = useSelector( state => state.categories )

    useEffect(() => {
        dispatch( getCategories() )
    }, [ dispatch ] )

    const [ category, setCategory ] = useState( '' )
    const [ minPrice, setMinPrice ] = useState( filters.minPrice || '' )
    const [ maxPrice, setMaxPrice ] = useState( filters.maxPrice || '' )
    const [ selectedSorting, setSelectedSorting ] = useState( sorting || '' )

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
        <div className="w-[90%] flex justify-center bg-white rounded-[10px] text-black p-5">
            <div className="w-[50%] flex flex-col space-x-4 items-center text-black gap-[10px]">
                <h2 className="text-xl font-bold">Filtrar</h2>
                <div className='flex'>
                    <div className='w-[200px] border-[1px] flex items-center justify-center gap-[10px]'>
                        <p>Categoría:</p>
                        <select
                            className="h-full outline-none border-[1px] flex items-center"
                            onChange={ e => setCategory( e.target.value ) }
                        >
                            <option value="all">Todo</option>
                            { categories?.map( category => (
                                <option value={ category.name } key={ category.id } >
                                    { category.name }
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        className="border rounded p-1 outline-none"
                        type="number"
                        value={ minPrice }
                        onChange={ e => setMinPrice( e.target.value ) }
                        placeholder='Minimo...'
                    />

                    <input
                        className="border rounded p-1 outline-none"
                        type="number"
                        value={ maxPrice }
                        onChange={ e => setMaxPrice( e.target.value ) }
                        placeholder='Maximo...'
                    />
                </div>
            </div>

            <div className="w-[50%] flex flex-col items-center gap-[10px]">
                <h2 className="text-xl font-bold">Ordenar</h2>
                <div className='flex'>
                    <select
                        className="border rounded p-1 outline-none"
                        value={ `${ selectedSorting }` }
                        onChange={ e => handleSortingChange( e.target.value ) }
                    >
                        <option value=""></option>
                        <option value="priceAsc">Menor precio</option>
                        <option value="priceDesc">Mayor precio</option>
                        <option value="nameAsc">A a la Z</option>
                        <option value="nameDesc">Z a la A</option>
                    </select>
                </div>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
                onClick={ handleApplyFilters }
            >
                Apply Filters
            </button>

            { showClearFiltersButton && (
                <button
                    className="bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                    onClick={ handleClearFilters }
                >
                    Clear Filters
                </button>
            )}
        </div>
    )
}
import { useState } from "react"
import {getSearch, clearSearch } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { debounce } from "lodash"
import { FaSearch } from "react-icons/fa"

function SearchBar() {
  const dispatch = useDispatch()

  const [ name, setName ] = useState( '' )

  const searchResults = useSelector( state => state.searchProducts )

  const delayedSearch = debounce( searchTerm => {
    dispatch( getSearch( searchTerm ) )
  }, 300)

  const handleChange = ( event ) => {
    const regex = /^[a-zA-Z0-9ñÑ\s]*$/
    const inputValue = event.target.value

    if( regex.test( inputValue ) ){
      setName( inputValue )
      delayedSearch( inputValue )
    }

    if( inputValue === '' ) dispatch( clearSearch() )
  }

  return(
    <>
      <div className="flex h-[100%] w-[75%] justify-between gap-[10px] overflow-x-auto whitespace-nowrap p-2 border-r-[1px]">
        {searchResults !== 0
          ?
            searchResults.map( result => (
              <div key={ result.id } className="w-[150px] border rounded-[10px] flex flex-col flex-shrink-0 items-center justify-center cursor-pointer p-2">
                <a href={ `#${ result.id }` } className="w-[100%] flex flex-col items-center justify-center gap-[10px]">
                  <img src={ result.images[ 0 ] } alt={ `Product ${ result.id }` } className="rounded-[5px] w-[120px] h-[120pxpx] object-cover" />
                  <span className="w-[100%] text-center truncate text-[1.2rem] font-semibold">{ result.name }</span>
                </a>
              </div>
            ))
          :
            ''
        }

        { name !== '' && searchResults.length === 0
          ?
            <div className="w-full flex items-center justify-center">
              <div>
                <p className="text-center text-[1.5rem] font-semibold">No se encontraron resultados para su búsqueda</p>
              </div>
            </div>
          :
            name === '' && searchResults.length === 0
              ?
                (
                  <div className="w-full flex items-center justify-center">
                    <div>
                      <p className="text-center text-[1.5rem] font-semibold">¿ Que estas buscando ?</p>
                    </div>
                  </div>
                )
              :
                ''
        }
      </div>
      <div className="w-[250px] px-[5px] mr-[7px] border rounded-[7px] bg-[#f6f6f6] flex justify-between items-center">
        <input
          className="w-[90%] p-2 bg-[#f6f6f6] text-[1.5rem] outline-none"
          placeholder="Remera"
          type="text"
          name="search"
          onChange={ handleChange }
          value={ name }
        />
        <FaSearch className="text-[#646464] font-semibold text-[1.5rem]" />
      </div>
    </>
  )
}

export default SearchBar
import {  useState } from "react";
import {getSearch, clearSearch} from "../redux/actions"
 import { useDispatch, useSelector } from "react-redux";
 import { debounce } from "lodash"; 
 import { FaSearch } from "react-icons/fa";


function SearchBar() {
  const [name, setName] = useState('');
 
  const searchResults = useSelector(state=> state.searchProducts)
  const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (name.trim() === '') {
//       return; // Si está vacío, no se realiza ninguna acción
//     }

//     dispatch(getSearch(name));
//     dispatch(clearSearch())
//   };

  const delayedSearch = debounce((searchTerm) => {
    dispatch(getSearch(searchTerm));
  }, 300);

  const handleChange = (event) => {
    const regex = /^[a-zA-Z0-9ñÑ\s]*$/;
    const inputValue = event.target.value;
    if (regex.test(inputValue)) {
      setName(inputValue);
      delayedSearch(inputValue);
    } // Limpiar el campo de búsqueda
        if (inputValue === "") {
          dispatch(clearSearch()); // Limpiar los resultados de búsqueda en el estado
        }
      // Limpiar los resultados de búsqueda en el estado
      
  };

  

  return (
    <div className="p-4">
<div className="relative">
  <input
    className="w-full p-2 pl-10 rounded-lg border border-black bg-gray-200 bg-opacity-40 focus:outline-none"
    placeholder="Remera"
    type="text"
    name="search"
    onChange={handleChange}
    value={name}
  />
  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
    <FaSearch className="text-gray-500" />
  </div>
</div>
      <div>
        {searchResults !== 0 ? searchResults.map((result) => (
              <div key={result.id} className="flex items-center my-2">
                <img
                  src={result.images[0]}
                  alt={`Product ${result.id}`}
                  className="rounded-lg w-15 h-12"
                />
                <span className="ml-2">{result.name}</span>
              </div>
            )): ""
          }
      </div>
    </div>
  );
}

export default SearchBar;
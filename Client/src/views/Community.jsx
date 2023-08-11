//import { useEffect } from "react"
//import { useDispatch, useSelector } from "react-redux"
//import { getProducts } from "../redux/actions"
import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"
import SearchBar from "../components/SearchBar";

export function Community () {
  return (
    <div>
      <div className="bg-gray-200 p-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            {/* Searchbar */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex-1 mr-4">
              <p className="text-xl font-bold mb-2">Encuentra lo que quieres</p>
              {/* Aquí va el contenido del Searchbar */}
              {/* ... */}
              <SearchBar/>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4">
        <div className="container mx-auto px-4">
          
            <Filter/>
          
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <CardsContainer />
        </div>
      </div>
    </div>
  );
}

export default Community;
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/actions"
import { CardsContainer } from "../components/CardsContainer"

export function Community () {
  // const dispatch = useDispatch();
  // const productos = useSelector((state)=> state.products);

  // useEffect(() => {
  //     dispatch(getProducts());
  //   }, [dispatch]);

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
              <input
                type="text"
                placeholder="Buscar..."
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="bg-white rounded-lg shadow-lg p-4 flex-1 mr-4">
              <p className="text-xl font-bold mb-2">Filtros 1</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 flex-1 mr-4">
              <p className="text-xl font-bold mb-2">Filtros 2</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
              <p className="text-xl font-bold mb-2">Filtros 3</p>
            </div>

          </div>
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

import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"

export function Community () {
  return (
    <div className="w-full h-[auto] h-full flex flex-col">
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

      <div className="w-full bg-[#e5e7eb] flex flex-col items-center gap-[10px]">
        <Filter/>
      </div>

      <div className="w-full h-full bg-[#e5e7eb] flex flex-col items-center gap-[10px]">
        <CardsContainer/>
      </div>
    </div>
  )
}
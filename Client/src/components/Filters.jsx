import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters, getCategories, applySorting } from '../redux/actions';

function Filter() {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const sorting = useSelector(state => state.sorting);
    useEffect(() => {
        dispatch(getCategories())
    },[dispatch])
    const categories = useSelector((state)=>state.categories)


    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState(filters.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '');
    const [selectedSorting, setSelectedSorting] = useState(sorting || '');

    const handleApplyFilters = () => {
        const newFilters = {
            category: category,
            minPrice: minPrice,
            maxPrice: maxPrice,
        };
        dispatch(applyFilters(newFilters));
    };

    const handleSortingChange = (newSorting) => {
        setSelectedSorting(newSorting);
        dispatch(applySorting(newSorting));
    };

    const handleClearFilters = () => {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        dispatch(applyFilters({ category: '', minPrice: '', maxPrice: '' }));
    };

    const showClearFiltersButton =
        category !== '' || minPrice !== '' || maxPrice !== '';

    return (
        <div className="flex justify-between bg-gray-900 text-black p-4">
            <div className="flex space-x-4 items-center ml-20">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <select
                    className="border rounded p-1"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Category:</option>
                    {categories?.map((category) => (
                        <option
                            className="Option-select"
                            value={category.name}
                            key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
    
                <label className="flex flex-col text-white">
                    Min Price:</label>
                    <input
                        className="border rounded p-1"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                
                <label className="flex flex-col text-white">
                    Max Price:</label>
                    <input
                        className="border rounded p-1"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>

                {showClearFiltersButton && (
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            <div className="flex space-x-4 items-center mr-20">
            <h2 className="text-xl font-bold text-white">Order</h2>
                <select
                    className="border rounded p-1"
                    value={selectedSorting}
                    onChange={(e) => handleSortingChange(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="nameAsc">Name: A to Z</option>
                    <option value="nameDesc">Name: Z to A</option>
                </select>
            </div>
        </div>
    );
    
}

export default Filter;
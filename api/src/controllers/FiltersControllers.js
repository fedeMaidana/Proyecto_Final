const { Category} = require('../db');

const applyFiltersToProducts = (products, filters) => {
    let filteredProducts = [...products];
  
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.Category.name === filters.category
      );
    }
  
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }
  
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }
  
    return filteredProducts;
  };
  
  const applySortingToProducts = (products, sorting) => {
    let sortedProducts = [...products];
  
    if (sorting === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sorting === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sorting === 'nameAsc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting === 'nameDesc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    return sortedProducts;
  };
  

  module.exports = {applyFiltersToProducts, applySortingToProducts}
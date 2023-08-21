export const applySortingToProducts = (products, sorting) => {
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
  
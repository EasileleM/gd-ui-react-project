const minPriceStrategy = (item, filters, filter) => {
  return Number(item.price) > Number(filters[filter]);
};

const maxPriceStrategy = (item, filters, filter) => {
  return Number(item.price) < Number(filters[filter]);
};

const brandStrategy = (item, filters, filter) => {
  return filters[filter].has(item.brand);
};

const defaultStrategy = (item, filters, filter) => {
  if (!item[filter].length) {
    return false;
  }
  let matches = 0;
  for (const value of item[filter]) {
    if (filters[filter].has(value)) {
      matches++;
    }
  }
  return matches;
};

export const filterStrategies = {
  minprice: minPriceStrategy,
  maxprice: maxPriceStrategy,
  brands: brandStrategy,
  categories: defaultStrategy,
  sizes: defaultStrategy,
  colors: defaultStrategy
}
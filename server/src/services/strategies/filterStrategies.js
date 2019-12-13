const minPriceStrategy = (item, filters, filter) => {
  if (Number(item.price) < Number(filters[filter])) {
    return false;
  }
  return true;
};

const maxPriceStrategy = (item, filters, filter) => {
  if (Number(item.price) > Number(filters[filter])) {
    return false;
  }
  return true;
};

const brandStrategy = (item, filters, filter) => {
  if (!filters[filter].has(item.brand)) {
    return false;
  }
  return true;
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
  if (!matches) {
    return false;
  }
  return true;
};

export const filterStrategies = {
  minprice: minPriceStrategy,
  maxprice: maxPriceStrategy,
  brands: brandStrategy,
  categories: defaultStrategy,
  sizes: defaultStrategy,
  colors: defaultStrategy
}
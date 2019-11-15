import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/index';

export default function loadCard(page = 1, size = 4, filters) {
  let url = `${SERVER_URL}/api/items/all?page=${page}&size=${size}&lang=${i18n.language}`;

  if(filters) {
    url += `&filter=true`;


    if(filters.sizes && filters.sizes.length > 0) {
      const sizes = filters.sizes.map(size => {
        return size.toUpperCase();
      }) ;

      url += `&sizes=${sizes.join(',')}`;
    }

    if(filters.brands && filters.brands.length > 0) {
      url += `&brands=${filters.brands.join(',')}`;
    }

    if(filters.category) {
      url += `&categories=${filters.category}`;
    }

    if(filters.maxPrice) {
      url += `&maxprice=${filters.maxPrice}`;
    }

    if( filters.minPrice) {
      url += `&minprice=${filters.minPrice}`;
    }

    if(filters.searchTarget) {
      url += `&search=${filters.searchTarget}`;
    }
  }

  console.log(url)

  return axios.get(url);
}
import axios from 'axios';
import { SERVER_URL } from '../constants/constants';

export function getAuthentificationInfo() {
  return axios(`${SERVER_URL}/api/isAuth`, { //TODO change isAuth endpoint if it needs
    withCredentials: true,
  })
  .then((res) => {
    return res.data;
  });
  // const mockRawData = { "_id": "5db895dc5ebc0ec021d6d683", "name": "Abibas Kid Boots", "bundleInfo": "Casual kit", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry", "price": "750", "sizes": ["S", "M", "L", "XL"], "colors": ["#4287f5", "#f54242", "#400a2d"], "images": [{ "src": "https://cdn-images.farfetch-contents.com/14/18/04/06/14180406_21273275_1000.jpg", "srcset": ["https://cdn-images.farfetch-contents.com/14/18/04/06/14180406_21273275_1000.jpg 1000w", "https://cdn-images.farfetch-contents.com/14/18/04/06/14180406_21273275_500.jpg 500w", "https://cdn-images.farfetch-contents.com/14/18/04/06/14180406_21273275_800.jpg 800w", "https://cdn-images.farfetch-contents.com/14/18/04/06/14180406_21273275_300.jpg 300w"] }], "sale": "45", "rating": "3", "categories": ["Shoes", "kids"], "brand": "Abibas", "creationDate": "2018-10-21T20:00:00.000Z" };

  // return Promise.resolve({
  //   user: {
  //     info: {
  //       firstName: 'yes',
  //       lastName: 'Mb'
  //     },
  //     cartItems: [
  //       {
  //         generalData: mockRawData,
  //         color: "#4287f5",
  //         amount: 2,
  //         size: "XL"
  //       }
  //     ]
  //   }
  // });
}

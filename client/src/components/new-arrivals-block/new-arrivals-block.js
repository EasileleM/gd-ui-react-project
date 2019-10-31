import React from 'react';

import {SectionHeader} from '../section-header/index.js';
import {ProductCatalog} from '../product-catalog/index.js';

import './new-arrivals-block.scss';

export class NewArrivalsBlock extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <section className='new-arrivals-block'>
                <div className='new-arrivals-block__title'>
                    <SectionHeader title_colored='Best' title='sales'
                                   description='Lorem Ipsum is simply dummy text of the printing and typesetting industry'/>
                </div>
                <ProductCatalog products={[
                    {

                        "id": "4",
                        "name": "Reebok Track Jacket",
                        "bundleInfo": {},
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                        "price": "100$",
                        "sizes": [
                            "S",
                            "M",
                            "L"
                        ],
                        "colors": [
                            "#4287f5",
                            "#f54242",
                            "#400a2d"
                        ],
                        "images": [
                            "https://i.imgur.com/wXSAlap.png"
                        ],
                        "sale": {},
                        "rating": "5",
                        "categories": [],
                        "brand": "",

                    },
                    {

                        "id": "1",
                        "name": "Reebok Track Jacket",
                        "bundleInfo": {},
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                        "price": "100$",
                        "sizes": [
                            "S",
                            "M",
                            "L"
                        ],
                        "colors": [
                            "#4287f5",
                            "#f54242",
                            "#400a2d"
                        ],
                        "images": [
                            "https://i.imgur.com/mt7NO4o.png"
                        ],
                        "sale": {},
                        "rating": "5",
                        "categories": [],
                        "brand": "",

                    },
                  {

                    "id": "1",
                    "name": "Reebok Track Jacket",
                    "bundleInfo": {},
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    "price": "100$",
                    "sizes": [
                      "S",
                      "M",
                      "L"
                    ],
                    "colors": [
                      "#4287f5",
                      "#f54242",
                      "#400a2d"
                    ],
                    "images": [
                      "https://i.imgur.com/mt7NO4o.png"
                    ],
                    "sale": {},
                    "rating": "5",
                    "categories": [],
                    "brand": "",

                  }, {

                    "id": "1",
                    "name": "Reebok Track Jacket",
                    "bundleInfo": {},
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    "price": "100$",
                    "sizes": [
                      "S",
                      "M",
                      "L"
                    ],
                    "colors": [
                      "#4287f5",
                      "#f54242",
                      "#400a2d"
                    ],
                    "images": [
                      "https://i.imgur.com/mt7NO4o.png"
                    ],
                    "sale": {},
                    "rating": "5",
                    "categories": [],
                    "brand": "",

                  },{

                    "id": "1",
                    "name": "Reebok Track Jacket",
                    "bundleInfo": {},
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                    "price": "100$",
                    "sizes": [
                      "S",
                      "M",
                      "L"
                    ],
                    "colors": [
                      "#4287f5",
                      "#f54242",
                      "#400a2d"
                    ],
                    "images": [
                      "https://i.imgur.com/mt7NO4o.png"
                    ],
                    "sale": {},
                    "rating": "5",
                    "categories": [],
                    "brand": "",

                  },]}/>
            </section>
        );
    }
}

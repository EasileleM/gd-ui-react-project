import React, {Component} from 'react';
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import "./main.scss"



class Product extends Component {
    render() {
        return (
            <div className="product">
                <ProductImages images={["https://i.imgur.com/Z5RnKLz.jpg", "https://i.imgur.com/y0Z5X17.jpg", "https://i.imgur.com/tRw6xJj.jpg"]}/>
                <ProductInfo item={{
                    "_id": {"$oid": "5db895dc5ebc0ec021d6d683"},
                    "id": "1",
                    "name": "T-shirts",
                    "bundleInfo": "Casual kit",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam rerum voluptas. Harum, iste laboriosam\n" +
                        "    nostrum repellat sit tenetur voluptates.",
                    "price": "100",
                    "sizes": ["S", "M", "L"],
                    "colors": ["#4287f5", "#f54242", "#400a2d"],
                    "images": ["https://i.imgur.com/Z5RnKLz.jpg"],
                    "sale": "40",
                    "rating": "3",
                    "categories": [],
                    "brand": "",
                    "creationDate": {"$date": {"$numberLong": "1571688000000"}}
                }}/>
            </div>
        );
    }
}

export default Product;

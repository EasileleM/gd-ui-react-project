import React, {Component} from 'react';
import './ProductImagesRow.scss'

class ProductImagesRow extends Component {
    render() {
        return (
            <div className={`product-images-row ${this.props.vertical? "product-images-row_vertical": ""}`}>
                {this.props.images.map((image, index) => {
                    return <div key={index} onClick={() => this.props.setIndex(index)}
                                className={`product-images-row__image-wrapper 
                                       ${this.props.currentIndex === index ?
                                        "product-images-row__image-wrapper_selected" : ""}`
                                }>
                        <img srcSet={image.srcset.join(", ")} src={image.src}
                             className={`product-images-row__small-image`} alt="Miniature of the product"/>
                    </div>
                })}
            </div>
        );
    }
}

export default ProductImagesRow;
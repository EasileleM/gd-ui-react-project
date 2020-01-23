import React, {Component} from 'react';
import "./ProductImagesModal.scss"
import ProductImagesRow from "../ProductImagesRow/ProductImagesRow";

class ProductImagesModal extends Component {
    state = {
        backgroundPosition: '0% 0%'
    };

    handleMouseMove = e => {
        const zoomCoef = 100;
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * zoomCoef;
        const y = (e.pageY - top) / height * zoomCoef;
        this.setState({
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${this.props.images[this.props.currentIndex].src})`
        })
    };

    handleMouseLeave = e => {
        this.setState({
            backgroundPosition: `1000% 1000%`,//this is to put background out of sight if we don't need it
        })
    };

    render() {
        return (
            <div className="product-images-modal">
                <div onClick={this.props.toggle} className="product-images-modal__backdrop">
                    <div className="product-images-modal__content">
                        <div className="product-images-modal__row">
                            <ProductImagesRow
                                              images={this.props.images}
                                              currentIndex={this.props.currentIndex}
                                              setIndex={this.props.setIndex}
                            />
                        </div>
                        <div className="product-images-modal__selected-image">
                            <figure className='product-images-modal__zoom-outer'
                                    onMouseMove={this.handleMouseMove}
                                    onMouseLeave={this.handleMouseLeave}
                                    style={this.state}
                            >
                                <img alt="Product picture"
                                     className='product-images-modal__zoom-inner'
                                     src={this.props.images[this.props.currentIndex].src}
                                />
                            </figure>
                        </div>
                        <button aria-label="Close Zoom Modal Box"
                                className="product-images-modal__exit"
                                onClick={this.props.toggle}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductImagesModal;
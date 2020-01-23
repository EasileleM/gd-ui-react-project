import React, {Component} from 'react';
import "./ProductImages.scss"
import ProductImagesModal from "./ProductImagesModal/ProductImagesModal";
import ProductImagesRow from "./ProductImagesRow/ProductImagesRow";


export class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      zoomedModal: false,
    }
  }

  setIndex = (index) => {
    if (index < this.props.images.length && index >= 0) {
      this.setState({currentIndex: index});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      this.setState({
        currentIndex: 0,
      })
    }
  }

  zoomModalToggle = (e) => {
    if (e.target.className === "product-images-modal__exit" || e.target.className === 'product-images-modal__backdrop') {
      this.setState({
        zoomedModal: false,
      })
    }else if(e.target.className ===  'product-images__main') {
      this.setState({
        zoomedModal: true,
      })
    }
  };

  render() {
    return (
        <div className="product-images">
          <img className="product-images__main"
               srcSet={this.props.images[this.state.currentIndex].srcset.join(", ")}
               src={this.props.images[this.state.currentIndex].src}
               onClick={this.zoomModalToggle}
               alt="Product"/>

          <ProductImagesRow images={this.props.images} currentIndex={this.state.currentIndex} setIndex={this.setIndex}/>
          {this.state.zoomedModal
              ? <ProductImagesModal
                images={this.props.images}
                currentIndex={this.state.currentIndex}
                toggle={this.zoomModalToggle}
                setIndex={this.setIndex}
          /> : null}
        </div>
    );
  }
}

export default ProductImages;
import React, {Component} from 'react';
import "./main.scss"


class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      currentIndex: 0,
    }
  }

  setIndex(index) {
    if (index > this.state.images.length) {
      alert("Error, index is out of bounds");
      console.error("Error, index is out of bounds");
      return;
    }
    this.setState({currentIndex: index});
  }

  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      this.setState({
        images: this.props.images,
        currentIndex: 0,
      })
    }
  }

  render() {
    return (
        <div className="product-images">
          <img className="product-images__main" src={this.state.images[this.state.currentIndex]}
               alt="Product"/>

          <div className="product-images__row">
            {this.state.images.map((image, index) => {
              return <div key={index} onClick={() => this.setIndex(index)}
                          className={`product-images__image-wrapper 
                                       ${
                              this.state.currentIndex === index ?
                                  "product-images__image-wrapper_selected" : ""}`
                          }>
                <img src={image}
                     className={`product-images__small-image`} alt="Miniature of the product"/>
              </div>
            })}
          </div>
        </div>
    );
  }
}

export default ProductImages;
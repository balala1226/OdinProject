import PropTypes from 'prop-types';
import { Component } from "react";
import '../style/ShopItem.css'
import '../style/CartItemView.css'

class CartItemView extends Component{
  constructor(props) {
    super(props);

    this.state={
      count: this.props.cartItem.count
    }

    this.onInputCountChange = this.onInputCountChange.bind(this);
    this.onPlusCountButton = this.onPlusCountButton.bind(this);
    this.onMinusCountButton = this.onMinusCountButton.bind(this);
    this.onDeleteProduct = this.onDeleteProduct.bind(this);
  }

  onInputCountChange(event){
    event.preventDefault();
    var newValue = event.target.value;
    if (newValue[0] == '0'){
      newValue = newValue.substring(1);
    }

    if (newValue == ''){
      this.props.deleteProduct(this.props.cartItem.product);
      return;
    }

    newValue = newValue.replace(/[.e-]/gi, "")
    this.setState({ count: newValue });
  }

  onInputKeyDown(event){
    if (event.key == '.' || event.key == 'e' || event.key == '-'){
      event.preventDefault();
    }
  }

  onMinusCountButton(event){
    event.preventDefault();

    if (this.state.count <= 0){
      this.props.setProductCount(this.props.cartItem.product, newCount);
      return;
    }
    var newCount = this.state.count - 1;
    this.setState({ count: newCount });

    this.props.setProductCount(this.props.cartItem.product, newCount);
  }

  onPlusCountButton(event){
    event.preventDefault();

    var newCount = this.state.count + 1;
    this.setState({ count: newCount });

    this.props.setProductCount(this.props.cartItem.product, newCount);
  }

  onDeleteProduct(event){
    event.preventDefault();
    if (this.state.count <= 0){
      return;
    }

    this.props.deleteProduct(this.props.cartItem.product);
  }

  render() {
    return (
      <div className='cartItem'>
        <div className='cartItemInfo'>
          <div className='cartitemImageContainer'>
            <img className='cartitemImage' src={this.props.cartItem.product.image}></img>
          </div>
          <div className='textContainer'>
            <p className='itemName'>{this.props.cartItem.product.title}</p>
            <div className='itemStats'>
              <p className='itemCost'>${this.props.cartItem.product.price}</p>
            </div>
          </div>
        </div>
        <div className='itemCountContainer'>
          <div className='changeCountContainer'>
            <button className='changeCountOnCartButton' onClick={this.onMinusCountButton} disabled={this.state.count <= 0}>-</button>
            <input className='itemCount' type='number' min='0' value={this.state.count} onChange={this.onInputCountChange} onKeyDown={this.onInputKeyDown}/>
            <button className='changeCountOnCartButton' onClick={this.onPlusCountButton}>+</button>
          </div>
          <button className='deleteButton' onClick={this.onDeleteProduct}>Delete</button>
        </div>
      </div>
    );
  }
}

CartItemView.propTypes = {
    cartItem: PropTypes.object,
    setProductCount: PropTypes.func,
    deleteProduct: PropTypes.func
}

export default CartItemView


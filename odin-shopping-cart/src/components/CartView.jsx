import { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/CartView.css'
import '../style/App.css'
import {flexDisplay, noneDisplay} from '../helper/styleHelper'
import CartItemView from './CartItemView';

class CartView extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
          <div className='content'>
            <div className='noItemsContainer' style={this.props.cart.productsCount > 0 ? noneDisplay:flexDisplay}>
              <p className='noItemsText'>Cart is empty.</p>
              <p className='noItemsText'>Add to cart now!</p>
            </div>
            <div className='cartContainer' style={this.props.cart.productsCount > 0 ? flexDisplay:noneDisplay}>
              <div className='cartHeader'>
                <p className='cartHeaderText'>My Cart</p>
              </div>
              {this.props.cart.cartProducts.map((currentItem, index) => (
                <CartItemView  key={index} cartItem={currentItem} setProductCount={this.props.setProductCount} deleteProduct={this.props.deleteProduct}></CartItemView>
              ))}
            </div>
          </div>
        </>
    );
  }
}

CartView.propTypes = {
  cart: PropTypes.object,
  setProductCount: PropTypes.func,
  deleteProduct: PropTypes.func
}

export default CartView

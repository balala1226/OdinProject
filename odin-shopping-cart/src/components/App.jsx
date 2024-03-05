import { Component } from "react";
import { BrowserRouter,  Route,  Routes } from "react-router-dom";

import '../style/App.css'
import Layout from "./Layout";
import Home from './Home'
import Products from "./Products";
import FeaturedShopItemView from "./FeaturedShopItemView";
import CartView from './CartView';

import { CartModel } from "./CartModel";

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cart: new CartModel()
    }

    this.addToCart = this.addToCart.bind(this);
    this.setProductCount = this.setProductCount.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  addToCart(product, count){
    var newCart = this.state.cart;
    newCart.addProduct(product, count);

    this.setState({cart: newCart});
  }

  setProductCount(product, count){
    var newCart = this.state.cart;
    newCart.setProductCount(product, count);

    this.setState({cart: newCart});
  }

  deleteProduct(product){
    var newCart = this.state.cart;
    newCart.deleteProduct(product);

    this.setState({cart: newCart});
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout cartLength={this.state.cart.productsCount}/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/products" element={<Products addToCart={this.addToCart}/>} />
              <Route path="/products/:id" element={<FeaturedShopItemView addToCart={this.addToCart}/>} />
              <Route path="/cart" element={<CartView cart={this.state.cart} setProductCount={this.setProductCount} deleteProduct={this.deleteProduct}/>} />  
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App

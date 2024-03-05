import PropTypes from 'prop-types';
import { Component } from "react";
import { Link } from 'react-router-dom';

import '../style/ShopItem.css'
import '../style/FeatureShopItemView.css'

import { withParams } from '../helper/useParamsHelper';
import Icon from '@mdi/react';
import { mdiStarCircleOutline } from '@mdi/js';

class FeaturedShopItemView extends Component{
  constructor(props) {
    super(props);

    this.state={
      item: null,
      count: 0
    }

    this.fetchStoreProduct = this.fetchStoreProduct.bind(this);
    this.handleProductFetchDone = this.handleProductFetchDone.bind(this);
    this.onInputCountChange = this.onInputCountChange.bind(this);
    this.onPlusCountButton = this.onPlusCountButton.bind(this);
    this.onMinusCountButton = this.onMinusCountButton.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
  }

  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    let { id } = this.props.params;
    this.fetchStoreProduct(id);
  }

  fetchStoreProduct(id){
    const currentPage = this;
    fetch('https://fakestoreapi.com/products/'+id, {mode: 'cors'})
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        currentPage.handleProductFetchDone(data);
      })
      .catch(function(error) {
        console.error(error)
      })
  }

  handleProductFetchDone(data){
    console.log(data);
    this.setState({ 
      item: data,
      count: 0 
    });
  }

  onInputCountChange(event){
    event.preventDefault();
    var newValue = event.target.value;
    if (newValue[0] == '0'){
      newValue = newValue.substring(1);
    }

    if (newValue == ''){
      newValue = newValue.substring(1);
      this.setState({ count: 0 });
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
      this.setState({ count: 0 });
      return;
    }
    var newCount = this.state.count - 1;
    this.setState({ count: newCount });
  }

  onPlusCountButton(event){
    event.preventDefault();

    var newCount = this.state.count + 1;
    this.setState({ count: newCount });
  }

  onAddToCartClick(event){
    event.preventDefault();
    if (this.state.count <= 0){
      return;
    }

    this.props.addToCart(this.state.item, this.state.count);
  }

  render() {
    return (
        <div className='content'>
          {
            this.state.item == null ? 
            <div></div> :
            <div className='featuredShopItemContainer'>
              <div className='backContainer'>
                <Link to={"/products"} className='backLink'>
                  <div className='backLinkContainer'>
                    <p className='backLinkText'>{'<< BACK'}</p>
                  </div>
                </Link>
              </div>
              <div className='featuredShopItemImageContainer'>
                <img className='featuredShopItemImage' src={this.state.item.image}></img>
              </div>
              <div className='featuredShopItemTextContainer'>
                <p className='featuredShopItemName'>{this.state.item.title}</p>
                <div className='featuredShopItemStats'>
                  <p className='featuredShopItemCost'>${this.state.item.price}</p>
                  <div className='featuredShopItemRatingsContainer'>
                    <p className='featuredShopItemRating' >{this.state.item.rating.rate}</p>
                    <Icon path={mdiStarCircleOutline} size={'3vmin'} className='starIcon'/>
                    <p className='featuredShopItemRating' >of {this.state.item.rating.count} votes</p>
                  </div>
                </div>
                <div className='featuredShopItemDescriptionContainer'>
                  <p className='featuredShopItemDescription' >{this.state.item.description}</p>
                </div>
              </div>
              <div className='featuredShopItemAddToCartContainer'>
                <div className='featuredShopItemChangeCountContainer'>
                  <button className='featuredShopItemChangeCountButton' onClick={this.onMinusCountButton} disabled={this.state.count <= 0}>-</button>
                  <input className='featuredShopItemCount' type='number' min='0' value={this.state.count} onChange={this.onInputCountChange} onKeyDown={this.onInputKeyDown}/>
                  <button className='featuredShopItemChangeCountButton' onClick={this.onPlusCountButton}>+</button>
                </div>
                <button className='featuredShopItemAddToCartButton' onClick={this.onAddToCartClick} disabled={this.state.count <= 0}>Add To Cart</button>
              </div>
            </div>
          }
        </div>
    );
  }
}

FeaturedShopItemView.propTypes = {
  addToCart: PropTypes.func
}

export default withParams(FeaturedShopItemView)
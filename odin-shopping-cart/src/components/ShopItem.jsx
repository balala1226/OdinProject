import PropTypes from 'prop-types';
import { Component } from "react";
import { Link } from 'react-router-dom';

import '../style/ShopItem.css'

import Icon from '@mdi/react';
import { mdiStarCircleOutline } from '@mdi/js';

class ShopItem extends Component{
  constructor(props) {
    super(props);

    this.state={
      count: 0
    }

    this.onInputCountChange = this.onInputCountChange.bind(this);
    this.onPlusCountButton = this.onPlusCountButton.bind(this);
    this.onMinusCountButton = this.onMinusCountButton.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
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

    this.props.addToCart(this.props.item, this.state.count);
  }

  render() {
    return (
        <div className='shopItem'>
          <div className='productInfo'>
            <Link to={"/products/"+this.props.item.id} className='imageLink'>
              <div className='imageContainer'>
                <img className='itemImage' src={this.props.item.image}></img>
              </div>
            </Link>
            <div className='textContainer'>
              <div className='itemNameContainer'>
                <p className='itemName'>{this.props.item.title}</p>
              </div>
              <div className='itemStats'>
                <p className='itemCost'>${this.props.item.price}</p>
                <div className='ratingsContainer'>
                  <p className='itemRating' >{this.props.item.rating.rate}</p>
                  <Icon path={mdiStarCircleOutline} size={'3vmin'} className='starIcon'/>
                  <p className='itemRating' >of {this.props.item.rating.count} votes</p>
                </div>
              </div>
              <div className='descriptionContainer'>
                <p className='itemDescription' >{this.props.item.description}</p>
              </div>
            </div>
          </div>
          <div className='addToCartContainer'>
            <div className='changeCountContainer'>
              <button className='changeCountButton' onClick={this.onMinusCountButton} disabled={this.state.count <= 0}>-</button>
              <input className='itemCount' type='number' min='0' value={this.state.count} onChange={this.onInputCountChange} onKeyDown={this.onInputKeyDown}/>
              <button className='changeCountButton' onClick={this.onPlusCountButton}>+</button>
            </div>
            <button className='addToCartButton' onClick={this.onAddToCartClick} disabled={this.state.count <= 0}>Add To Cart</button>
          </div>
        </div>
    );
  }
}

ShopItem.propTypes = {
  item: PropTypes.object,
  addToCart: PropTypes.func
}

export default ShopItem


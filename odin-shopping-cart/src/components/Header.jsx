import { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import '../style/Header.css'

import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { mdiCartVariant } from '@mdi/js';

class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className='logoContainer'>
          <Link to="/" className='logoLink'>
            <h1>Addoo</h1>
            <Icon path={mdiCartPlus} size={'7vmin'}/>
            <h1>Cartoo</h1>
          </Link>
        </div>
        <div className='productAndCart'>
          <Link to="/products" className='headerItemLink'>
            <div className='headerItem'>
              <p className='headerItemText'>Products</p>
            </div>
          </Link>
          <Link to="/cart" className='headerItemLink'>
            <div className='headerItem'>
              <Icon path={mdiCartVariant} size={'6vmin'} className='headerCart' />
              <div className='cartLengthContainer' style={this.props.cartLength > 0 ? {backgroundColor: 'rgb(255, 77, 0)'} : {backgroundColor: 'transparent'}}>
                <p className='cartLength'>{this.props.cartLength > 0 ? this.props.cartLength : ""}</p>
              </div>
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartLength: PropTypes.number
}


export default Header


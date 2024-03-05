import { Component } from "react";
import '../style/Products.css'
import ShopItem from "./ShopItem";
import PropTypes from 'prop-types';
import { compareByCost, compareByCostDescend, compareByName, compareByNameDescend } from "../helper/sortHelper";

class Products extends Component{
  constructor(props) {
    super(props);

    this.state = {
      currentProductCategory: "all products",
      searchInput: "",
      allProducts: [],
      categories: [],
      currentCategoryProducts: [],
      searchedProducts: [],
    }

    this.handleProductFetchDone = this.handleProductFetchDone.bind(this);
    this.onInputSearchChange = this.onInputSearchChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.updateCategoryProducts = this.updateCategoryProducts.bind(this);
    this.updateSearchedProducts = this.updateSearchedProducts.bind(this);
    this.onSortingChange = this.onSortingChange.bind(this);
    console.log('constructor mount');
  }

  componentDidMount(){
    this.fetchStoreProducts();
  }

  onSortingChange(event){
    event.preventDefault();

    var sortingOption = event.target.value;

    var allProducts = this.state.allProducts;
    switch (sortingOption){
      case 'az':
        allProducts.sort(compareByName);
        break;
      case 'za':
        allProducts.sort(compareByNameDescend);
        break;
      case 'costlh':
        allProducts.sort(compareByCost);
        break;
      case 'costhl':
        allProducts.sort(compareByCostDescend);
        break;
    }

    var categoryProducts = this.updateCategoryProducts(this.state.currentProductCategory, allProducts);
    this.updateSearchedProducts(this.state.searchInput, allProducts, categoryProducts);
  }

  onInputSearchChange(event){
    event.preventDefault();
    var searchValue = event.target.value;
    searchValue = searchValue.toLowerCase();

    this.updateSearchedProducts(searchValue);
  }

  updateSearchedProducts(searchValue, allProducts = [], categoryProducts = []){
    if (allProducts == [] || allProducts.length == 0){
      allProducts = this.state.allProducts;
    }

    if (categoryProducts == [] || categoryProducts.length == 0){
      categoryProducts = this.state.currentCategoryProducts;
    }

    var newSearchProducts = [];

    this.state.currentCategoryProducts.forEach(product => {
      var title = product.title.toLowerCase();
      if (title.includes(searchValue)){
        newSearchProducts.push(product);
      }
    });

    this.setState((state) => ({
      ...state,
      searchInput: searchValue,
      allProducts: allProducts,
      currentCategoryProducts: categoryProducts,
      searchedProducts: newSearchProducts
    }));
  }

  onCategoryChange(event){
    event.preventDefault();
    var newCategory = event.target.value
    
    this.updateCategoryProducts(newCategory);
  }

  updateCategoryProducts(newCategory, allProducts = []){
    if (allProducts == []){
      allProducts = this.state.allProducts;
    }
    
    var newCategoryProducts = [];

    if (newCategory == 'all products'){
      this.setState((state) => ({
        ...state,
        searchInput: "",
        currentProductCategory: newCategory,
        currentCategoryProducts: state.allProducts,
        searchedProducts: state.allProducts
      }));

      return newCategoryProducts;
    }

    this.state.allProducts.forEach(product => {
      if (product.category == newCategory){
        newCategoryProducts.push(product);
      }
    });

    this.setState((state) => ({
      ...state,
      searchInput: "",
      currentProductCategory: newCategory,
      currentCategoryProducts: newCategoryProducts,
      searchedProducts: newCategoryProducts
    }));

    return newCategoryProducts;
  }

  handleProductFetchDone(products){
    var categoriesList = ['all products'];

    products.forEach(product => {
      if (!categoriesList.includes(product.category)){
        categoriesList.push(product.category);
      }
    });

    products.sort(compareByName);

    this.setState((state) => ({
      currentProductCategory: state.currentProductCategory,
      allProducts: products,
      categories: categoriesList,
      currentCategoryProducts: products,
      searchedProducts: products
    }));
  }

  fetchStoreProducts(){
    const currentPage = this;
    fetch('https://fakestoreapi.com/products', {mode: 'cors'})
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

  render() {
    return (
        <>
          <div className='content'>
            <div className='searchParameterContainer'>
              <div className='currentProductCategoryContainer'>
                <p className='currentProductCategory'>{this.state.currentProductCategory.toLocaleUpperCase()}</p>
              </div>
              <div className='searchParametersContainer'>
                <div className='searchItem'>
                  <p className='searchItemText'>Search: </p>
                  <input className='searchInput' type='text' value={this.state.searchInput} onChange={this.onInputSearchChange}/>
                </div>
                <div className='searchItem'>
                  <label htmlFor="category"><p className='searchItemText'>Category:</p></label>
                  <select className='searchItemText searchDropdown' name="category" id="category" onChange={this.onCategoryChange}>
                    {this.state.categories.map((category, index) => (
                      <option value={category} key={index}>{category.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className='searchItem'>
                  <label htmlFor="sort"><p className='searchItemText'>Sort:</p></label>
                  <select className='searchItemText searchDropdown' name="sort" id="sort" onChange={this.onSortingChange}>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="costlh">Cost low to high</option>
                    <option value="costhl">Cost high to low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='productsContainer'>
              {this.state.searchedProducts.map((currentItem, index) => (
                <ShopItem  key={index} item={currentItem} addToCart={this.props.addToCart}></ShopItem>
              ))}
            </div>
          </div>
        </>
    );
  }
}

Products.propTypes = {
  addToCart: PropTypes.func
}

export default Products
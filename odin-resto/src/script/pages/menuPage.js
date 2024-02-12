import '../../style/style.css'
import {printLog, printError} from '../helper/printLog.js';

import PizzaIcon from '../../resource/images/pizza.png';
import CheesePizza from '../../resource/images/pizza-bianca.png';
import Burger from '../../resource/images/burger.png';
import Chicken from '../../resource/images/chicken-leg.png';
import Spaghetti from '../../resource/images/spaghetti.png';

import Fries from '../../resource/images/fried-potatoes.png';
import Churros from '../../resource/images/churros.png';
import OnionRings from '../../resource/images/onion-ring.png';

import Water from '../../resource/images/glass-of-water.png';
import Soda from '../../resource/images/churros.png';
import Orange from '../../resource/images/soda.png';

export class menuPage {
    constructor() {
        this.contentContainer = document.getElementById('contentContainer');
        
        this.menuPageContent = document.createElement('div');
        this.menuPageContent.id = 'menuContent';
        this.menuPageContent.classList.add('content');

        const logoContent = document.createElement('div');
        logoContent.id = 'logoContainer';
        const pizzaIcon = new Image();
        pizzaIcon.src = PizzaIcon;
        pizzaIcon.id = 'logoImage';
        const logoText = document.createElement('p');
        logoText.classList.add('logoHeaderText');
        logoText.innerHTML = "Menu";
        logoContent.appendChild(pizzaIcon);
        logoContent.appendChild(logoText);

        this.menuPageContent.appendChild(logoContent);
        
        const menuContainer = document.createElement('div');
        menuContainer.id = 'menuContainer';

        const appetizerHeader = document.createElement('p');
        appetizerHeader.classList.add('menuHeader');
        appetizerHeader.innerHTML = "Appetizer";
        menuContainer.appendChild(appetizerHeader);

        const appetizerGrid = document.createElement('div');
        appetizerGrid.classList.add('menuGrid');

        appetizerGrid.appendChild(this.generateMenuItem("Fries","$1",Fries));
        appetizerGrid.appendChild(this.generateMenuItem("Onion Rings","$1",OnionRings));
        appetizerGrid.appendChild(this.generateMenuItem("Churros","$1",Churros));

        menuContainer.appendChild(appetizerGrid);
        
        const mainDishHeader = document.createElement('p');
        mainDishHeader.classList.add('menuHeader');
        mainDishHeader.innerHTML = "MainDish";
        menuContainer.appendChild(mainDishHeader);

        const mainDishGrid = document.createElement('div');
        mainDishGrid.classList.add('menuGrid');
        mainDishGrid.appendChild(this.generateMenuItem("Peperoni Pizza","$5",PizzaIcon));
        mainDishGrid.appendChild(this.generateMenuItem("Cheese Pizza","$5",CheesePizza));
        mainDishGrid.appendChild(this.generateMenuItem("Spaghetti","$3",Spaghetti));
        mainDishGrid.appendChild(this.generateMenuItem("Chicken","$5",Chicken));
        mainDishGrid.appendChild(this.generateMenuItem("Burger","$4",Burger));

        menuContainer.appendChild(mainDishGrid);
        
        const drinksHeader = document.createElement('p');
        drinksHeader.classList.add('menuHeader');
        drinksHeader.innerHTML = "Drinks";
        menuContainer.appendChild(drinksHeader);

        const drinksGrid = document.createElement('div');
        drinksGrid.classList.add('menuGrid');
        drinksGrid.appendChild(this.generateMenuItem("Water","Free",Water));
        drinksGrid.appendChild(this.generateMenuItem("Soda","$1",Soda));
        drinksGrid.appendChild(this.generateMenuItem("Orange","$1",Orange));

        menuContainer.appendChild(drinksGrid);

        this.menuPageContent.appendChild(menuContainer);
        printLog("Menu Page Init Success");
    }

    generateMenuItem(foodName, foodPrice, imageSource){
        const menuItem = document.createElement('div');
        menuItem.classList.add('menuItem');
        const menuItemText = document.createElement('div');

        menuItemText.classList.add('menuText');
        const menuItemName = document.createElement('p');
        menuItemName.classList.add('foodName');
        menuItemName.innerHTML = foodName;
        const menuItemPrice = document.createElement('p');
        menuItemPrice.classList.add('foodPrice');
        menuItemPrice.innerHTML = foodPrice;
        menuItemText.appendChild(menuItemName);
        menuItemText.appendChild(menuItemPrice);
        
        menuItem.appendChild(menuItemText);

        const menuItemImage = new Image();
        menuItemImage.src = imageSource;
        menuItemImage.classList.add('foodImage');

        menuItem.appendChild(menuItemImage);

        return menuItem
    }

    getPage() {
        return this.menuPageContent;
    }
}
import '../../style/style.css'
import {printLog, printError} from '../helper/printLog.js';
import PizzaIcon from '../../resource/images/pizza.png';

export class aboutPage {
    constructor() {
        this.contentContainer = document.getElementById('contentContainer');
        
        this.aboutPageContent = document.createElement('div');
        this.aboutPageContent.id = 'aboutContent';
        this.aboutPageContent.classList.add('content');

        const logoContent = document.createElement('div');
        logoContent.id = 'logoContainer';
        const pizzaIcon = new Image();
        pizzaIcon.src = PizzaIcon;
        pizzaIcon.id = 'logoImage';
        const logoText = document.createElement('p');
        logoText.classList.add('logoHeaderText');
        logoText.innerHTML = "About";
        logoContent.appendChild(pizzaIcon);
        logoContent.appendChild(logoText);

        this.aboutPageContent.appendChild(logoContent);
        
        const restaurantDescription = document.createElement('div');
        restaurantDescription.id = 'restaurantDescription';
        restaurantDescription.classList.add('descriptionContainer');
        const descriptionText = document.createElement('p');
        descriptionText.classList.add('descriptionText');
        descriptionText.innerHTML = "This is a very good pizza. <br/>Get some good pizza.<br/>Contact us below";
        restaurantDescription.appendChild(descriptionText);

        this.aboutPageContent.appendChild(restaurantDescription);
        
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('descriptionContainer');
        const contactHeaderText = document.createElement('p');
        contactHeaderText.classList.add('headerDescription');
        contactHeaderText.innerHTML = "Contact Us";
        const contactBodyText = document.createElement('p');
        contactBodyText.classList.add('descriptionText');
        contactBodyText.innerHTML = "BALALA <br/> Manager<br/> manager@email.com";
        contactDiv.appendChild(contactHeaderText);
        contactDiv.appendChild(contactBodyText);

        this.aboutPageContent.appendChild(contactDiv);

        printLog("About Page Init Success");
    }

    getPage() {
        return this.aboutPageContent;
    }
}
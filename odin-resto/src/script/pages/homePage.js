import '../../style/style.css'
import {printLog, printError} from '../helper/printLog.js';
import PizzaIcon from '../../resource/images/pizza.png';

export class homePage {
    constructor() {
        this.contentContainer = document.getElementById('contentContainer');
        
        this.homePageContent = document.createElement('div');
        this.homePageContent.id = 'homeContent';
        this.homePageContent.classList.add('content');

        const logoContent = document.createElement('div');
        logoContent.id = 'logoContainer';
        const pizzaIcon = new Image();
        pizzaIcon.src = PizzaIcon;
        pizzaIcon.id = 'logoImage';
        const logoText = document.createElement('p');
        logoText.classList.add('logoHeaderText');
        logoText.innerHTML = "Odin's Pizza";
        logoContent.appendChild(pizzaIcon);
        logoContent.appendChild(logoText);

        this.homePageContent.appendChild(logoContent);
        
        const restaurantDescription = document.createElement('div');
        restaurantDescription.id = 'restaurantDescription';
        restaurantDescription.classList.add('descriptionContainer');
        const descriptionText = document.createElement('p');
        descriptionText.classList.add('descriptionText');
        descriptionText.innerHTML = "This is a very good pizza. <br/>Get some good pizza.";
        const headerDescriptionText = document.createElement('p');
        headerDescriptionText.classList.add('headerDescription');
        headerDescriptionText.innerHTML = "My Resto";
        restaurantDescription.appendChild(descriptionText);
        restaurantDescription.appendChild(headerDescriptionText);

        this.homePageContent.appendChild(restaurantDescription);
        
        const hoursText = document.createElement('div');
        hoursText.classList.add('descriptionContainer');
        const hoursHeaderText = document.createElement('p');
        hoursHeaderText.classList.add('headerDescription');
        hoursHeaderText.innerHTML = "Hours";
        const hoursBodyText = document.createElement('p');
        hoursBodyText.classList.add('descriptionText');
        hoursBodyText.innerHTML = "Sunday: 8am - 8pm<br/>Monday: 6am - 6pm<br/>Tuesday: 6am - 6pm<br/>Wednesday: 6am - 6pm<br/>Thursday: 6am - 10pm<br/>Friday: 6am - 10pm<br/>Saturday: 8am - 10pm";
        hoursText.appendChild(hoursHeaderText);
        hoursText.appendChild(hoursBodyText);

        this.homePageContent.appendChild(hoursText);

        const locationDiv = document.createElement('div');
        locationDiv.classList.add('descriptionContainer');
        const locationHeaderText = document.createElement('p');
        locationHeaderText.classList.add('headerDescription');
        locationHeaderText.innerHTML = "Location";
        const locationDescriptionText = document.createElement('p');
        locationDescriptionText.classList.add('descriptionText');
        locationDescriptionText.innerHTML = "no address";
        locationDiv.appendChild(locationHeaderText);
        locationDiv.appendChild(locationDescriptionText);

        this.homePageContent.appendChild(locationDiv);

        printLog("Home Page Init Success");
    }

    getPage() {
        return this.homePageContent;
    }
}
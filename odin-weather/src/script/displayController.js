import '../style/style.css'
import { printLog, printError } from './helper/printLog.js';
import { newDiv, newImg, newP, newButton, newInput } from './helper/htmlElementsMaker.js';
import { fetchTemperatureAndCondition } from './weatherApi.js';

export class displayController {
    constructor(){
        this.htmlBody = document.getElementsByTagName('BODY')[0];

        const htmlHeader = document.createElement('HEADER');
        const headerText = newP('WEATHER WEATHER APP');
        htmlHeader.appendChild(headerText);
        this.htmlBody.appendChild(htmlHeader);
        
        const locationDiv = newDiv('-','locationDiv');

        const locationText = newP('Location: ','-','locationText');
        locationDiv.appendChild(locationText);

        this.locationInput = newInput('text','-','locationInput');
        locationDiv.appendChild(this.locationInput);

        const locationSearchButton = newButton('locationSearchButton');
        locationSearchButton.innerHTML = 'Search';
        locationDiv.appendChild(locationSearchButton);

        this.htmlBody.appendChild(locationDiv);


        const content = newDiv('-','content');

        const weatherResult = newDiv('-','resultsContainer');
        const temperatureText = newP('','resultsText');
        weatherResult.appendChild(temperatureText);
        const conditionImage = new Image();
        conditionImage.className = 'conditionImage';
        weatherResult.appendChild(conditionImage);
        const  conditionText = newP('','resultsText');
        weatherResult.appendChild(conditionText);

        content.appendChild(weatherResult);

        const waitingContainer = newDiv('-','waitContainer');
        const loader = newDiv('loader');
        waitingContainer.appendChild(loader);
        const waitingText = newP('','waitText');
        waitingContainer.appendChild(waitingText);

        content.appendChild(waitingContainer);

        this.htmlBody.appendChild(content);

        locationSearchButton.addEventListener("click", function() {
            var locationInputBox = document.getElementById('locationInput');
            var inputLocation = locationInputBox.value;

            if (inputLocation == "" || inputLocation == null)
            {
                weatherResult.style.display = 'none';
                waitingContainer.style.display = 'flex';
                loader.style.display = 'none';
                waitingText.innerHTML = 'Invalid Input';
                return;
            }

            weatherResult.style.display = 'none';
            waitingContainer.style.display = 'flex';
            loader.style.display = 'block';
            waitingText.innerHTML = 'Gathering Data';

            fetchTemperatureAndCondition(inputLocation)
            .then(response => {
                if (response == null){
                    weatherResult.style.display = 'none';
                    waitingContainer.style.display = 'flex';
                    loader.style.display = 'none';
                    waitingText.innerHTML = 'Data not found';
                    return;
                }

                weatherResult.style.display = 'flex';
                waitingContainer.style.display = 'none';

                temperatureText.innerHTML = response.temperatureC + "&deg;C / " +response.temperatureF + "&deg;F";
                conditionImage.src = "https:"+response.conditionIcon;
                printLog(response.conditionIcon);
                conditionText.innerHTML =  response.conditionText;
            })
            .catch(error =>{
                weatherResult.style.display = 'none';
                waitingContainer.style.display = 'flex';
                loader.style.display = 'none';
                waitingText.innerHTML = 'Data not found';
            });
        });
    }
}

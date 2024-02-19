import { printError, printLog } from "./helper/printLog";

printError
const apiKey = '7a1db49b4a38400999212719241402';

function fetchWeatherData(location) {
    return new Promise((resolve, reject) => {
        fetch('http://api.weatherapi.com/v1/current.json?key='+apiKey+'&q='+location+'&aqi=no', {mode: 'cors'})
        .then(function(response) {
            printLog(response);
            resolve(response.json());
        })
        .catch(error => {
            printError(error);
            reject(null);
        });
    });
}

export async function fetchTemperatureAndCondition(location){
    var weatherData = await fetchWeatherData(location);

    if (weatherData == null)
    {
        printError('No weather data');
        return null;
    }

    var temperatureC = weatherData.current.temp_c;
    var temperatureF = weatherData.current.temp_f;

    var conditionText = weatherData.current.condition.text;
    var conditionIcon = weatherData.current.condition.icon;

    return {temperatureC: temperatureC, temperatureF: temperatureF, 
        conditionText: conditionText,conditionIcon: conditionIcon}
}
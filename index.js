const apikey = "5f60cb2249aca011f4e4556697623a57";//I registered an account
//5f60cb2249aca011f4e4556697623a57//This is given by teacher

const weatherData = document.getElementById('weather-data');
const cityInput = document.getElementById('city-input');
const formEl = document.querySelector('form');
const httpRequestMethodBtn_fetch = document.getElementById('fetch');
const httpRequestMethodBtn_XMLHttp = document.getElementById('xmlHttpRequest');
const httpRequestMethodBtn_axios = document.getElementById('axios');


let handler = getWeatherData;

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;

    chooseHttpRequestMethod(handler,url);
})

httpRequestMethodBtn_fetch.onclick = ()=>{
    handler = getWeatherData;
}
httpRequestMethodBtn_XMLHttp.onclick = ()=>{
    handler = getWeatherData2;
}
httpRequestMethodBtn_axios.onclick = ()=>{
    handler = getWeatherData3;
}

function chooseHttpRequestMethod(fn = getWeatherData,url){
    fn(url);
}

//async await fetch
async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        //axios返回的是解析好的json
        //fetch返回的是raw data，要自己解析
        const data = await response.json();
        console.log(data);
        displayData(data);
    } catch (error) {
        errorHandler();
    }
}


//XMLHttpRequest=AJAX
function getWeatherData2(url) {
    const xhttp = new XMLHttpRequest();
    if (!xhttp) {
        alert('Cannot create XMLHTTP instance!');
        return false;
    }
    xhttp.onload = function () {
        if (xhttp.status != 200) {
            errorHandler();
            throw new Error('Network response was not ok');
            return;
        }
        const data = JSON.parse(xhttp.responseText);
        displayData(data);
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}


//axios
//<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
async function getWeatherData3(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        displayData(data);
    } catch (error) {
        errorHandler();
    }
}


function displayData(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
        `Feels like:${Math.round(data.main.feels_like)}`,
        `Humidity:${data.main.humidity}%`,
        `Wind speed:${data.wind.speed}m/s`];
    console.log(temperature, description, icon, details);
    console.log(weatherData);
    weatherData.querySelector('.icon').innerHTML = `<img src='http://openweathermap.org/img/wn/${icon}.png'/>`;
    weatherData.querySelector('.temperature').textContent = `${temperature}℃`;
    weatherData.querySelector('.description').textContent = description;
    weatherData.querySelector('.details').innerHTML = details.map((detail) => `<div>${detail}</div>`).join('');
}
function errorHandler(){
    weatherData.querySelector('.icon').innerHTML = '';
    weatherData.querySelector('.temperature').textContent = '';
    weatherData.querySelector('.description').textContent = 'An error occurred, please try again later';
    weatherData.querySelector('.details').innerHTML = '';
}
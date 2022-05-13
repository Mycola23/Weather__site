"use strict"



const btnMenu = document.querySelector('.header__burger');
if(btnMenu){
    const headerMenu = document.querySelector('.header__menu');
    btnMenu.addEventListener("click",function(e){
        document.body.classList.toggle('_lock');
        btnMenu.classList.toggle('_active');
        headerMenu.classList.toggle('_active');
    });
};

var cityName;
document.querySelector('.search__button').onclick = searchCity;
function searchCity(){
    cityName = document.querySelector('.search__input').value;
    console.log(cityName);
    loadweather();
    loadweather();
}  



const weatherBlock = document.querySelector('#weather');

async function loadweather(e) {
    let searchCity =( cityName);
    weatherBlock.innerHTML =`
        <div class = "weather__loading">
            <img src="img/loading-icon-transparent-background-12.jpg" alt="Loading....">
        </div>`;
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchCity}&appid=5c3949470fc513b9a26c5ed5c97abe49`,{
        method:'GET',
    });
    console.log(response);
    let responseResult = await response.json();
    console.log(responseResult);


    if (response.ok) {
        getWeather(responseResult);
        console.log(getWeather(responseResult));
    } else {
        weatherBlock.innerHTML = responseResult.message +'. '+'Введіть повторно ваш запит';
    }

    

};

function getWeather(data){
    const location  = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template =`
    <div class="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
        </div>
        <div class="weather__icon">
            <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="weather__icon">
        </div>
    </div>
    <div class="weather__temp">${temp}</div>
    <div class="weather__feels-like">Feels like: ${feelsLike}</div>
    
    `;
    weatherBlock.innerHTML = template;
};




if (weatherBlock){
    loadweather();
};




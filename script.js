const apikey= `7b4aa8ce0244ca24af2205a09a3d7af3`;


async function fetchWeatherData(city){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);

    if(!response.ok){
        throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    console.log(data);
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    updateWeatherUI(data);
    }
    catch(error){
        console.error(error);

    }


}

const cityElement = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const windspeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector('.description i')

//fetchWeatherData();

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windspeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    descriptionText.textContent = data.weather[0].description

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconsName = getWeatherIconsName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}
const formElement = document.querySelector('.search-form');
const inputElement = document.querySelector('.city-input');
formElement.addEventListener('submit',function(e){
    e.preventDefault();
    const city = inputElement.value;
    if(city!==''){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconsName(weatherConditions){
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        fog: "cloud",
    };
    return iconMap[weatherConditions] || "help";
}


const url = 'https://api.openweathermap.org/data/2.5/';
const key = '8ca2c701bb02dc8775eeb5a93c5404b2';

const setQuery = (e) => {
    if (e.key == 'Enter') {
        getResult(searchBar.value);
    }
};

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    
    fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(displayResult)
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `Min: ${Math.round(result.main.temp_min)}°C   /    Max: ${Math.round(result.main.temp_max)}°C`;
};


const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery);

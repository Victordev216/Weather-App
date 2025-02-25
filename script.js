const showInfo = () => {
    const cityElement = document.getElementById('cityElement');
    const city = cityElement.value;
    const apikey = "c8acc51ad85f9e6c5433355cc1040080"
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const locationName = document.getElementById('locationName');
    const weatherCon = document.getElementById('weatherCon');
    const tempCon = document.getElementById('tempCon');

    fetch(url)
        .then(response => response.json())
        .then(result => {
        
            if (result.cod !== 200) {
                console.error(result.message);
                locationName.innerHTML = `<h1>Error: ${result.message}</h1>`;
                weatherCon.innerHTML = '';
                tempCon.innerHTML = '';
                return;
            }

            let temp = Math.round(result.main.temp - 273)
            let maxTemp = Math.round(result.main.temp_max - 273)
            let minTemp = Math.round(result.main.temp_min - 273)
            let feels = Math.round(result.main.feels_like - 273)
            let pressure = result.main.pressure;
            let locName = result.name;
            let weatherDes = result.weather[0].description
            let country = result.sys.country
            let humidity = result.main.humidity
            let wind = result.wind.speed

            locationName.innerHTML = `
                <h1 class="three">${temp}°C</h1>
                <h2>${locName}, ${country}</h2>
                <p>${weatherDes}</p>
            `;
            weatherCon.innerHTML = `
                <ul class="fs-5 fw-semi-bold list-unstyled mt-4 text-light">
                    <li class="">${locName}, ${country}</li>
                    <li class="mt-3">${weatherDes}</li>
                    <li class="mt-3">${humidity}%</li>
                    <li class="mt-3">${wind} m/s</li>
                </ul>
            `;
            tempCon.innerHTML = `
                <li class="mt-3">${minTemp}°C</li>
                <li class="mt-3">${maxTemp}°C</li>
                <li class="mt-3">${feels}°C</li>
                <li class="mt-3">${pressure} hPa</li>
            `;
        })

    cityElement.value = '';
}

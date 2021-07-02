function fetchWeather() {
    var city = document.getElementById('cityInput').value;
    var key = '55d97bd4cc934d7d59551e3c6ed62247';

    if (city === '') {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + key) 
            .then(function(resp) {return resp.json();}) 
            .then(function(data) {
                drawWeather(data);
                getTime(data);
            });
        });
        return false;
    }

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key) 
    .then(function(resp) {return resp.json();}) 
    .then(function(data) {
        drawWeather(data);
        getTime(data);
    });
}

function drawWeather(data) {
    var location = document.getElementById('location');
    var celcius = Math.round(parseFloat(data.main.temp) - 273.15);
    var fahrenheit = Math.round(parseFloat(data.main.temp) * 9 / 5 - 457.87);
    var icon = document.getElementById('icon');
    var iconCode = data.weather[0].icon;
    var iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    var temp = document.getElementById('temp');
    var description = document.getElementById('description');
    var celciusFeelsLike = Math.round(parseFloat(data.main.feels_like) - 273.15);
    var fahrenheitFeelsLike = Math.round(parseFloat(data.main.feels_like) * 9 / 5 - 457.87);
    var feelsLike = document.getElementById('feelsLike');
    var wind = document.getElementById('wind');
    var visibility = document.getElementById('visibility');
    var humidity = document.getElementById('humidity');
    var currentConversion = document.getElementById('currentConversion');
    var convertButton = document.getElementById('convertButton');

    location.innerHTML = data.name;
    temp.innerHTML = celcius + '&deg;';
    icon.setAttribute('src', iconUrl);
    description.innerHTML = data.weather[0].description;
    feelsLike.innerHTML = 'Feels like: ' + celciusFeelsLike + '&deg;';
    wind.innerHTML = 'Wind: ' + Math.round(parseFloat(data.wind.speed * 1.6)) + ' km/h';
    visibility.innerHTML = 'Visibility: ' + (data.visibility / 1000) + ' km';
    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';

    var isCelcius = true;

    if (isCelcius) {
        currentConversion.innerHTML = 'C';
        convertButton.innerHTML = 'F';
        temp.innerHTML = celcius + '&deg;';
        feelsLike.innerHTML = 'Feels like: ' + celciusFeelsLike + '&deg;';
    }

    if (!isCelcius) {
        currentConversion.innerHTML = 'F';
        convertButton.innerHTML = 'C';
        temp.innerHTML = fahrenheit + '&deg;';
        feelsLike.innerHTML = 'Feels like: ' + fahrenheitFeelsLike + '&deg;';
    }

    convertButton.addEventListener('click', function () {
        isCelcius = !isCelcius;

        if (isCelcius) {
            currentConversion.innerHTML = 'C';
            convertButton.innerHTML = 'F';
            temp.innerHTML = celcius + '&deg;';
            feelsLike.innerHTML = 'Feels like: ' + celciusFeelsLike + '&deg;';
        }

        if (!isCelcius) {
            currentConversion.innerHTML = 'F';
            convertButton.innerHTML = 'C';
            temp.innerHTML = fahrenheit + '&deg;';
            feelsLike.innerHTML = 'Feels like: ' + fahrenheitFeelsLike + '&deg;';
        }    
    })
}

function getTime(data) {
    var d = new Date();
    var currentTime = d.getHours();
    
    if (currentTime >= 4 && currentTime < 7) {
        document.body.style.background = 'url(resources/bg/dawn.jpeg) center center / cover no-repeat';
    }

    if (currentTime >= 7 && currentTime < 16) {
        document.body.style.background = 'url(resources/bg/morning.jpeg) center center / cover no-repeat';
    }

    if (currentTime >= 16 && currentTime < 17) {
        document.body.style.background = 'url(resources/bg/afternoon.jpeg) center center / cover no-repeat';
    }

    if (currentTime >= 17 && currentTime < 19) {
        document.body.style.background = 'url(resources/bg/sunset.jpeg) center center / cover no-repeat';
    }
    
    if ((currentTime >= 19 && currentTime < 24) || (currentTime >= 24 && currentTime < 4)) {
        document.body.style.background = 'url(resources/bg/night.jpeg) center center / cover no-repeat';
    }
}

window.onload = function () {
    fetchWeather();
}
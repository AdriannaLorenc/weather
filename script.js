    function initMap(lat, lng, elemId) {
        if( lat && lng && elemId){
            var coord = { lat: lat, lng: lng };
        }else{
            var coord = { lat: 0, lng: 0 };
            var elemId = 'GoogleMapInit';
        }
        console.log('Test',coord);
        let map = new google.maps.Map(document.getElementById(elemId), {
            center: coord,
            zoom: 8
        });
        // const marker = new google.maps.Marker({
        //     position: coord,
        //     map: GoogleMap
        // });
}

document.addEventListener('DOMContentLoaded', function () {

    // const api = 'http://api.openweathermap.org/data/2.5/weather?lat=48.13&lon=17.12&appid=1d3f900f2be9fd369af11d18b214e288';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID=1d3f900f2be9fd369af11d18b214e288';
    const input = document.querySelector('#text');
    let dataApi = null;
    const div = document.querySelector('.main');
    const divForecasts = document.querySelector('.forecasts');
    console.log(div);

    document.querySelector('#submit').addEventListener('click', Api);

    function Api() {
        let boxWeather = document.createElement('div');
        boxWeather.classList.add('weather');
        let city = (input.value) ? input.value : 'Kraków';

        // console.log(city);
        let url = apiUrl + '&q=' + city;
        // console.log(url);

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error getting data');
                }
            })
            .then(data => {
                console.log(data, "dataaat");
                console.log('main',data.main);
                console.log('humidity',data.main.humidity);

                let h3 = document.createElement('h3');
                let ul = document.createElement("ul");
                let temp = document.createElement('li');
                let temMax = document.createElement('li');
                let humidity = document.createElement('li');
                let pressure = document.createElement('li');
                let clouds = document.createElement('li');
                let wind = document.createElement('li');
                let delButton = document.createElement('button');
                let divbox1 = document.createElement('div');
                let divbox2 = document.createElement('div');
                let divbox3 = document.createElement('div');
                let googleMap = document.createElement('div');
                
                let googleMapId = 'GoogleMap'+Math.random();  
                googleMap.id = googleMapId;
                googleMap.style.width="200px" ;
                googleMap.style.height="200px";

                divbox1.classList.add('discription');
                divbox2.classList.add('picture');
                divbox3.classList.add('map');
                const temperature = (data.main.temp - 273.15).toFixed(0);

                if (city !== name){
                    h3.innerHTML = city + ", " + data.name + ": today is  " + data.weather[0].description;
                }else 
                h3.innerHTML =  data.name + ": today is  " + data.weather[0].description;
                // if (data.weather[0].main==='Clear'){
                //     boxWeather.style.background=' url(clearSky.jpg) no-repeat cover'
                // }else if (data.weather[0].main==='Clouds'){
                //     boxWeather.style.background=' url(brokenClouds.jpg)no-repeat'
                // }else if (data.weather[0].main==='Clouds'){
                //     boxWeather.style.background=' url(cloudy.jpg)no-repeat'
                // }else if (data.weather[0].main==='Rain'){
                //     boxWeather.style.background=' url(rain.jpg)no-repeat'
                // }else if (data.weather[0].main==='Sunny'){
                //         boxWeather.style.background=' url(sunny.jpg)no-repeat'
                // }

                input.value = "";
                temp.innerHTML = "Temperature: " + temperature + ' &#8451';
                humidity.innerHTML = "Humidity level: " + data.main.humidity + " %";
                pressure.innerHTML = "Pressure: " + data.main.pressure + " hPa";
                clouds.innerHTML = "Cloud: " + data.clouds.all + " %";
                wind.innerHTML = "Wind: " + data.wind.speed + " km/h";
                delButton.innerHTML = "delete forecast";
                delButton.classList.add('delBtn');


                let imgDiv = document.createElement('div');
                imgDiv.classList.add('img');
                // imgDiv.addClass('img');
                let linkImg = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
                imgDiv.style.background = `url(${linkImg})no-repeat  center/cover`;

                boxWeather.appendChild(h3);
                ul.appendChild(temp);
                ul.appendChild(humidity);
                ul.appendChild(pressure);
                ul.appendChild(clouds);
                ul.appendChild(wind);
                divbox1.appendChild(h3);
                divbox1.appendChild(ul);
                divbox1.appendChild(delButton);
                divbox2.appendChild(imgDiv);
                boxWeather.appendChild(divbox1);
                boxWeather.appendChild(divbox2);
                boxWeather.appendChild(divbox3);
                divForecasts.appendChild(boxWeather);
                divbox3.appendChild(googleMap);


                let mapDiv = document.querySelector('.map');
                let linkMap = `https://maps.googleapis.com/maps/api/js?key=AIzaSyApTC7sx58pOav6rSoyJ-X141zdypHRiho&callback=initMap`;

                delButton.addEventListener('click', deleteForecast);
                function deleteForecast() {
                    delButton.parentElement.parentElement.remove(delButton);
                }
                // apiKeyGoogleMaps: AIzaSyApTC7sx58pOav6rSoyJ - X141zdypHRiho;
                    console.log('Coord',data.coord);
                    initMap(data.coord.lat, data.coord.lon, googleMapId);

                    // let iframe = document.createElement('iframe');
                    // iframe.setAttribute('src', map.mapUrl);
                    // iframe.appendChild(marker)
                    // divbox3.appendChild(iframe);
                    return map;

                })
    
            .catch(err => {
                console.log(err);
            });

    }


    Api();
    // initMap();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    let now = new Date();
    let datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    datetime += ' ' + now.getHours() + ':' + now.getMinutes();

    document.querySelector('.title > p').innerHTML = datetime;



});
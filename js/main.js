let search = document.getElementById("search");
let lon;
let lat;
const apikey = "a47d71ac6b5f4f1aa15215537252006";
let apiforecast = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${search.value ? search.value : "cairo"}&days=3`;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

///////////////////////////////////////////////////

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon)
    getForecast()

}

function error() {
    getForecast();
}
getLocation();
//////////////////////////////////////////////////////////////////

async function getForecast() {
    console.log(lat, lon)
    let resp;
    try {
        if (lat && lon) {
            resp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${search.value.length > 2 ? search.value : `${lat},${lon}`}&days=3`);
        }
        else {
            resp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${search.value.length > 2 ? search.value : "cairo"}&days=3`);
        }
        console.log(resp)
        if (resp.ok) {
            const data = await resp.json();
            console.log(data);
            display(data);
        }
        else {
            throw new Error(`something went wrong,${resp.statusText}`);
        }

    } catch (error) {
        console.log(error)
    }
}

function display(list) {
    let day0 = new Date(list.forecast.forecastday[0].date);
    let day1 = new Date(list.forecast.forecastday[1].date);
    let day2 = new Date(list.forecast.forecastday[2].date);



    let blackbox = `    <div class="col-lg-4 today px-0">
                            <header class="d-flex justify-content-between align-items-center">
                                <div class="day">${days[day0.getDay()]}</div>
                                <div class="date">${day0.getDate() + months[day0.getMonth()]}</div>

                            </header>
                            <div class="content">
                                <div class="location">${list.location.name}</div>
                                <div class="degree">
                                    <div class="num">${list.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>C</div>
                                </div>
                                <div class="forecast-icon">
                                    <img src="https:${list.forecast.forecastday[0].day.condition.icon}" alt="" width="90">
                                </div>
                                    <div class="custom">${list.forecast.forecastday[0].day.condition.text}</div>
                            <span class="me-3"><img src="imgs/icon-umberella.png" alt="">20%</span>
                            <span class="me-3"><img src="imgs/icon-wind.png" alt="">18km/h</span>
                            <span class="me-3"><img src="imgs/icon-compass.png" alt="">East</span>
                            </div>
                   



                    </div>
                    <div class="col-lg-4 day2 px-0">
                            <header class="text-center">${days[day1.getDay()]}</header>
                            <div class="inner">
                                <div class="forecast-icon">
                                    <img src="https:${list.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
                                </div>
                                <div class="degree">
                                    <div class="num">${list.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                                </div>
                                <small class="fs-6">${list.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                                <div class="custom">${list.forecast.forecastday[1].day.condition.text}</div>
                            </div>

                    </div>
                     <div class="col-lg-4 day3 px-0">
                            <header class="text-center">${days[day2.getDay()]}</header>
                            <div class="inner">
                                <div class="forecast-icon">
                                    <img src="https:${list.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
                                </div>
                                <div class="degree">
                                    <div class="num">${list.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                                </div>
                                <small class="fs-6">${list.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                                <div class="custom">${list.forecast.forecastday[2].day.condition.text}</div>
                            </div>

                    </div>`

    document.getElementById("weather").innerHTML = blackbox;
}



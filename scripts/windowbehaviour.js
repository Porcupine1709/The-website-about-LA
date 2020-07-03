/*This script calls api to get weather data in LA from climacell, sets the forecast icon '
according to weather data and sets some values to UI when window.onload event is fired*/
let gridGap = localStorage.getItem('gridGap') === 'true'
let insertHeader = localStorage.getItem('insertHeader') === 'true'
let navbarPosition = localStorage.getItem('navbarposition') === 'true'
let _margin = localStorage.getItem('margin')
let _navbar = document.getElementsByClassName('header-container')[0]

/*Makes GET request asyncronously via fetch then parses data to JSON format and returns 17 
element of the JSON*/
async function getDataAsync(item) 
{
  let response = fetch(`https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast?fields=${item}&unit_system=si&lat=42.8237618&lon=-71.2216286`, 
  {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
		"x-rapidapi-key": "<key>"
	}
  })

  let json = await response.then(data => data.json())
  return json[17]
}

/*Sets the icon analysing precipitation type and cloud cover percentage*/
function setWeatherIcon (precipitationType, cloudCover) {
  let icon

  if(cloudCover < 75 && precipitationType === 'rain')
     icon = `<i class='fas fa-cloud-rain'></i>`
  else if (cloudCover > 75 && precipitationType === 'rain')
     icon = `<i class='fas fa-cloud-sun-rain'></i>`
  else if (cloudCover < 75 && precipitationType === 'none')
     icon = `<i class='fas fa-sun'></i>`
  else if (cloudCover > 75 && precipitationType === 'none')
     icon =  `<i class='fas fa-cloud-sun'></i>`

  document.getElementById('icon').innerHTML = icon
}

/*this method asyncronously calls getDataAsync method which returns specific weather data,
when all of the five requests (promises) are resolved renders data on UI*/
async function getWeather() {
  let results = await Promise.all([
    getDataAsync('temp'),
    getDataAsync('humidity'),
    getDataAsync('precipitation'),
    getDataAsync('cloud_cover'),
    getDataAsync('precipitation_type') ])
     .then(result => {
       document.getElementById('temp').innerHTML = result[0].temp.value + ' ' + result[0].temp.units 
       document.getElementById('humidity').innerHTML = result[1].humidity.value + ' ' + result[1].humidity.units 
       document.getElementById('precipitation').innerHTML = result[2].precipitation.value + ' ' + result[2].precipitation.units 
       setWeatherIcon(result[4].precipitation_type.value, result[3].cloud_cover.value)
     })
}

/*Adds method which will be executed when window.onload event is fired*/
window.onload = async () => {
  if(window.location.pathname === '/index.html') {
    //await getWeather()
  }
  if (window.innerWidth > 500) {
    document.getElementById("gridgap").checked = gridGap
    gridGap ? _navbar.style.borderBottom = 'none' : _navbar.style.borderBottom = 'solid black 3px'
    document.getElementById('insertheader').checked = insertHeader
    document.getElementById('navbarposition').checked = navbarPosition
    document.getElementById('setmargin').value = parseInt(_margin)
    document.getElementById('marginpercentage').innerHTML = _margin
  }
  //Adds last modified field to the footer section because this field will be visible on oll devices
  document.getElementById('last-modified').innerHTML = document.lastModified
}

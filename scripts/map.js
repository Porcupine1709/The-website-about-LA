L.mapquest.key = '<key>';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
  center: [34.052235, -118.243683],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

L.mapquest.map('for-divs', {
  center: [34.052235, -118.243683],
  layers: L.mapquest.tileLayer('for-divs'),
  zoom: 12
});

const map = document.getElementById('map')

function openMapInModal(){
  if(window.innerWidth > 600) {
    let modal = document.getElementById('myModal')
    modal.style.display = 'block'
    document.body.style.overflowY = 'hidden'
  }
}

map.addEventListener('click', openMapInModal)
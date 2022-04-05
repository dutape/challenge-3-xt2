

var myMap, preview;
var clicks = 0; 
var btnzoek = document.getElementById('btn-zoek');

document.getElementsByTagName('body').onload = getAPIdata();

function getClicks() {
    clicks += 1;
    console.log(clicks);
	getAPIdata();
    return clicks;
}
function getLat() {
    var latitude = 0;
    var plaatsnaam = document.getElementById('plaatsnaam');
    var onderregel = document.getElementById('onderregel');
    var btnreload = document.getElementById('btn-reload');
    var plaats = document.getElementById('plaats')
    
    btnreload.style.visibility = "hidden";
    
    if (clicks == 0) {
        latitude = 19.741755;
        plaatsnaam.innerHTML = 'Locatie 1:';
        onderregel.innerHTML = '19.741755 ; -155.844437';
        plaats.innerHTML = 'Hawaii, USA';
    }
    else if (clicks == 1) {
        latitude = 52.377956;
        plaatsnaam.innerHTML = 'Locatie 2:';
        onderregel.innerHTML = '52.377956 ; 4.897070';
        plaats.innerHTML = 'Amsterdam, Nederland';
    }
    else if (clicks == 2) {
        latitude = 38.736946;
        plaatsnaam.innerHTML = 'Locatie 3:';
        onderregel.innerHTML = '38.736946 ; -9.142685';
        plaats.innerHTML = 'Lissabon, Portugal';
    }
    else if (clicks == 3) {
        latitude = 35.652832;
        plaatsnaam.innerHTML = 'Locatie 4:';
        onderregel.innerHTML = '35.652832 ; 139.839478';
        plaats.innerHTML = 'Tokyo, Japan';
    }
    else if (clicks == 4) {
        latitude = -22.908333;
        plaatsnaam.innerHTML = 'Locatie 5:';
        onderregel.innerHTML = '-22.908333 ; -43.196388';
        plaats.innerHTML = 'Rio de Janeiro, Brazilie';
    }
    else if (clicks => 5) {
        latitude = 0;
        plaatsnaam.innerHTML = 'Dit waren alle opties om te landen.';
        onderregel.innerHTML = 'Klik op de knop om de pagina te herladen.';
        plaats.innerHTML = '';
        btnreload.style.visibility = "visible";
    }
    return latitude;
}

function getLng() {
    var longitude = 0;

    if (clicks == 0){
        longitude = -155.844437;
    }
    else if (clicks == 1) {
        longitude = 4.897070;
    }
    else if (clicks == 2) {
        longitude = -9.142685;
    }
    else if (clicks == 3) {
        longitude = 139.839478;
    }
    else if (clicks == 4) {
        longitude = -43.196388;
    }
    else if (clicks == 5) {
        longitude = 0;
    }
    
    return longitude;
}

function initMap() {
	// uiterlijk voor de map
	var myStyles =[
		 {
		 	featureType: "poi",
		 	elementType: "labels",
		 	stylers: [{ visibility: "off" }]
		 },
		 {
		 	featureType: 'transit',
		 	elementType: 'labels',
		 	stylers: [{visibility: 'off'}]
		 }
	];
	// opties bepalen voor de map 
	var mapOptions = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 14,
		clickableIcons: false,
		styles: myStyles,
        zoomControl: true,
		mapTypeControl: false,
		streetViewControl: false,
		scaleControl: false,
	};
    var mapOptions2 = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 14,
		clickableIcons: false,
		styles: myStyles,
        draggable: false,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeId: 'satellite'
	};
	// map creeeren en toevoegen aan de pagina
	myMap = new google.maps.Map(document.getElementById('maps'), mapOptions);
    
    
    var locatieMarker = new google.maps.Marker({
		position: {
			lat: getLat(), 
			lng: getLng(),
		},
		map: myMap,
		title: 'Landingsplek'
	});
	
}

//het weer 

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather?&lang=nl';
	var apiKey ='b08112bee4c98fc9346529fac8f909c9';
	var stad = 'den haag';
    var lon = getLng();
    var lat = getLat();
    console.log('Wat is nu de lon ' + lat);
	
	// maak request 
	var request = url +  '&' + 'appid=' + apiKey + '&' + 'lat=' + lat + '&' + 'lon=' + lon;
	
	// pak het huidige weer
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onAPISucces(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	});

}


function onAPISucces(response) {
	var weeradvies = document.getElementById('weeradvies');
	var type = response.weather[0].description;
	// temperatuur is celsius want staat in kelvin 
	var celsius = Math.floor(response.main.temp - 273.15);

	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = celsius + '&#176;C <br>' + type;
	
	if (celsius > 4) {
        weeradvies.innerHTML = 'De temperatuur is goed genoeg om te landen'; 
    }
    else {
        weeradvies.innerHTML = 'Het is erg koud hier.'
    }
}


function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

getAPIdata();



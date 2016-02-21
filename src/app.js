/*
*	Eduardo Gonzalez
*	Miguel Sepulveda
*	Rodolfo Montes
/*


/*
*	AJAX
*/
/*
var ajax = require('ajax');
ajax(
  {
    url: 'http://api.theysaidso.com/qod.json',
    type: 'json'
  },
  function(data, status, request) {
    console.log('Quote of the day is: ' + data.contents.quote);
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);
*/



/*
*		MISC
*/
var UI = require('ui');					//user interface
var Vector2 = require('vector2');	//arrays
var id;

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 0, 
  timeout: 5000
};

var aux_window = null;


/*
*		CATEGORIAS
*/
var categorias = [
  {
    title: "Restaurantes",
    subtitle: "fast food, etc"
  },
  {
    title: "Electronicos",
    subtitle: "Computadoras, Videojuegos, etc"
  },
  {
    title: "Salud",
    subtitle: "Hospitales, Farmacias"
  },
  {
  	title: "Ropa",
  	subtitle: "Camisas, abrigos, etc"
  },
  {
  	title: "Parques",
  	subtitle: "Recreativos, Deportes, etc"
  }
];

var menuCategorias = new UI.Menu({
  sections: [{
    title: 'Lista Categorias',
    items: categorias
  }]
});

var lugar = '{ "nombre":"La Dream Tienda","Distancia":100,"Rating":85,"Categoria":"Electronicos"}';


/*
*		MAIN
*/
var main = new UI.Card({
  	title: 'Street Assistant',
  	icon: 'images/menu_icon.png',
  	subtitle: 'Ubica lugares cercanos!',
  	body: 'Selecciona las categorias de tu interes y recibe alertas cuando te encuentres cerca de algun lugar de tu posible interes. *Nota: Conserva la aplicacion abierta para recibir notificaciones.',
	scrollable: true
});

aux_window = main;
aux_window.show();


/*
*		LOCALIZACION
*/
function locationSuccess(pos) {
	//CHECAR LA BASE DE DATOS
	aux_window.show();
	
	// LOG DEBUG - SHOW LOCATION
  	console.log('Location changed!');
  	console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

Pebble.addEventListener('ready',
  function(e) {
    console.log('ready');
    // Get location updates
    //id = navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
  }
);

navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);

aux_window.show();


/*
*		EVENTOS - BOTONES
*/
main.on('click', 'up', function(e) {
	//MOSTRAR VENTANA ANTERIOR
});

main.on('click', 'select', function(e) {
	aux_window = menuCategorias;
	aux_window.show();
});

main.on('click', 'down', function(e) {
	//MOSTRAR VENTANA SIGUIENTE
});




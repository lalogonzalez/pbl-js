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
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');	//arrays
var id;

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 0, 
  timeout: 5000
};

var aux_window = null;



/*
*		WAKEUP
*/
var Wakeup = require('wakeup');
Wakeup.schedule(
  {
    // Set the wakeup event for one minute from now
    time: Date.now() / 1000 + 60
  },
  function(e) {
    if (e.failed) {
      // Log the error reason
      console.log('Wakeup set failed: ' + e.error);
    } else {
      console.log('Wakeup set! Event ID: ' + e.id);
		//Pebble.sendAppMessage(address, callbackForAck, callbackForNack)
    }
  }
);

// Query whether we were launched by a wakeup event
Wakeup.launch(function(e) {
  if (e.wakeup) {
    	Vibe.vibrate('long');
    	console.log('Woke up to ' + e.id + '! data: ' + JSON.stringify(e.data));
  } else {
    console.log('Regular launch not by a wakeup event.');
  }
});



/*
*		CATEGORIAS
*/
var categorias = [
  {
    title: "Restaurantes",
    subtitle: "fast food, etc",
    icon: "images/no.png"
  },
  {
    title: "Electronicos",
    subtitle: "Computadoras, Videojuegos, etc",
    icon: "images/no.png"
  },
  {
    title: "Salud",
    subtitle: "Hospitales, Farmacias",
    icon: "images/no.png"
  },
  {
  	title: "Ropa",
  	subtitle: "Camisas, abrigos, etc",
    icon: "images/no.png"
  },
  {
  	title: "Parques",
  	subtitle: "Recreativos, Deportes, etc",
    icon: "images/no.png"
  }
];

var menuCategorias = new UI.Menu({
  sections: [{
    title: 'Lista Categorias',
    items: categorias
  }]
});

menuCategorias.on('select', function(e) { //Probablemente esto no funcione :v
  /*
  console.log(e.item.icon);
  if(e.item.icon == "images/no.png"){
    e.item.icon = "images/yes.png";
     menuCategorias.item(e.sectionIndex, e.itemIndex, {title: e.item.title, subtitle: "images/yes.png"});
  } else if(e.item.icon == "images/yes.png"){
	  e.item.icon = "images/no.png";
    menuCategorias.item(e.sectionIndex, e.itemIndex, {title: e.item.title, subtitle: "images/no.png"});
  }
  */
	//aux_window = menuCategorias;
  //aux_window.show();
  //console.log('Currently selected item is #' + e.itemIndex + ' of section #' + e.sectionIndex);
  //console.log('The item is titled "' + e.item.title + '"');
});

menuCategorias.on('click', 'back', function(e) {
	aux_window = main;
	aux_window.show();
});

var lugar = '{ "nombre":"La Dream Tienda","Distancia":100,"Rating":85,"Categoria":"Electronicos"}';


/*
*		MAIN
*/
var main = new UI.Card({
  	title: 'Street Assistant',
  	icon: 'images/logo.png',
  	subtitle: 'Ubica lugares cercanos!',
  	body: 'Selecciona tus categorias preferidas y recibe alertas cuando te encuentres cerca de algun lugar de tu posible interes. *Nota: Conserva la aplicacion abierta para recibir notificaciones.',
	scrollable: true
});


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



/*
*		START
*/
navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
aux_window = main;
aux_window.show();

console.log('ACCOUNT ID: ' + Pebble.getAccountToken());

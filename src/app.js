
/*
*	Eduardo Gonzalez
*	Miguel Sepulveda
*	Rodolfo Montes
/*



/*
*     IMPORTS
*/
var UI = require('ui');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');
var id;

var locationOptions = {
   enableHighAccuracy: true, 
   maximumAge: 0, 
   timeout: 5000
};



/*
*     WINDOWS
*/
var menuCategorias;
var aux_window;
var detailCard;



/*
*     WAKEUP
*/
/*
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
      //Vibe.vibrate('long');
      console.log('Woke up to ' + e.id + '! data: ' + JSON.stringify(e.data));
   } else {
      console.log('Regular launch not by a wakeup event.');
   }
});
*/



/*
*     LOCALIZACION
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
*     AJAX
*/
var ajax = require('ajax');
ajax(
   {
      url: 'http://www.hack.educacioncreativa.org/v1.0/log',
      type: 'json',
		method: 'post',
		data: {token: Pebble.getAccountToken()}
   },
   function(data, status, request) {
      var datos = data;
      var categorias = [];
      var icono;
      for (var i = 0; i < 8; i++) {
         if (datos[i].status == 1) {
            icono = "images/yes.png";
         } else if (datos[i].status === 0) {
            icono = "images/no.png";
         }
         categorias[i] = { title: '' + datos[i].nombre,
                           subtitle: '' + datos[i].sub ,
                           icon: icono
                        };
      }

      menuCategorias = new UI.Menu({
         sections: [{
            title: 'Lista Categorias',
            items: categorias
         }]
      });

   },
   function(error, status, request) {
      console.log('The ajax request failed: ' + error);
   }
);



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
*     CATEGORIAS
*/
menuCategorias = new UI.Menu({
         sections: [{
            title: 'Lista Categorias',
				icon: 'images/no.png'
         }]
      });

menuCategorias.on('click', 'up', function(e) {

});


var ajax_activacion = require('ajax');
menuCategorias.on('select', function(e) {
   //mandar json
   var valor;
   if (menuCategorias[e.itemindex].icon=="images/yes.png") {
      valor = 0;
   } else {
      valor = 1;
   }
   /*
   *     AJAX SEND
   */
   ajax_activacion(
      {
         url: 'http://www.hack.educacioncreativa.org/v1.0/updateCategoria',
         type: 'json',
			method: 'post',
         data: { id: e.itemindex, token:Pebble.getAccountToken(), status:valor}
      },
      function(data, status, request) {
         var cuerpo;
         if (valor == 1){
            cuerpo = "Activado";
         } else {
            cuerpo = "Desactivado";
         }

         detailCard = new UI.Card({
            title: menuCategorias[e.itemIndex].title,
            subtitle: menuCategorias[e.itemIndex].sub,
            body: cuerpo
         });

         aux_window = detailCard;
         aux_window.show();
      },
      function(error, status, request) {
         console.log('The ajax request failed: ' + error);
      }
   );  
});

menuCategorias.on('click', 'down', function(e) {

});

menuCategorias.on('click', 'back', function(e) {
   aux_window = main;
   aux_window.show();
});



/*
*     DETAIL CARD
*/
detailCard = new UI.Card({
            title: 'Provisional'
         });
detailCard.on('click', 'up', function(e) {
	aux_window = main;
   aux_window.show();
});

detailCard.on('click', 'select', function(e) {
	aux_window = main;
   aux_window.show();
});

detailCard.on('click', 'down', function(e) {
	aux_window = main;
   aux_window.show();
});

detailCard.on('click', 'back', function(e) {
	aux_window = main;
   aux_window.show();
});



/*
*		START
*/
navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
aux_window = main;
aux_window.show();
ajax();
ajax_activacion();
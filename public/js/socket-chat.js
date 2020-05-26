var socket = io();

var params = new URLSearchParams(window.location.search);
//si no ingresamos nombre en http:localhost:3000/chat.html?nombre=el nombre
//nos devuelve a la pagina de inicio->localhost:3000/index.html

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

//cuando se dispara. en el servidor se activa
//io.on->console.log("usuario conectado")

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('usuarios conectados', resp);
    });

});
// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información. Esta información sólo se envía
//NO CUANDO SE ABRE NAVEGADOR CLIENTE. SINO CUANDO SE INTERACTUA CON EL.
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//cuando un usuario entra o sale del chat.
//visualizamos los que estan conectados

socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

//Mensaje a un usuario determinado:
//acción de escuchar del cliente

socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);
})
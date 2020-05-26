const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');
const usuarios = new Usuarios();

//el id de cliente, se lo da automaticamente el sistema
//cuando se conecta mediente client.id
io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {

        console.log(data);

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'el nombre y la sala son necesario'
            });
        }

        //para agregar a un usuario a una sala->client.join
        client.join(data.sala);

        usuarios.agregarPersonas(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));


        callback(usuarios.getPersonasPorSala(data.sala));

    });

    //un cliente, manda un mensaje y nosotros lo distrubuimos con
    //'crearMensaje
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });

    //cuando refrescamos la ventana, tb debería de haber desconexion y 
    //nueva conexion, con lo cual, borramos usuario actual y reconectamos el mismo 
    //usuario
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        console.log('borrado', personaBorrada)

        //avisamos a todos los usuarios conectados q uno se desconecta
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        //actualizamos los usuarios que estan conectados
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala());
    });

    //escuchamos los mensaje privados desde el servidor 
    //para enviarselo al usuario q esta escuchando(socket de escucha en cliente)
    //en la "data" tiene q venir el id DE LA PERSONA DESTINO
    //data.para->es el id de la persona destino(que viene en un socket emit)
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});
/* {
    id: 'afjkafdkdfj',
    nombre: 'juan',
    sala: 'video Juegos'
} */

class Usuarios {

    constructor() {
        //personas que estan conectadas.
        this.personas = [];

    }

    //creamos persona y la agregamos al array de personas.
    agregarPersonas(id, nombre, sala) {

        //objeto EMACSCRIPT6
        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }

    //buscamos persona x el ID. Para ello, utilizamos
    //la propiedad de array, filter.abs
    //filter, devuelve un arreglo. En este caso, de un solo
    //usuario
    getPersona(id) {

        let persona = this.personas.filter(persona =>
            persona.id === id)[0];

        return persona;

    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)

        return personasEnSala;
    }

    //devolvemos todas las personas q tengan id distinto al 
    //q me estan enviando.
    //REEEMPLAZAMOS ARRAY personas.
    borrarPersona(id) {

        //obtenemos la persona que VA A SER BORRADA
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id
        });

        return personaBorrada;

    }
}


module.exports = {

    Usuarios
}
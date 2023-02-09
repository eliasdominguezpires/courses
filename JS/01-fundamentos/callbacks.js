setTimeout(() => {
    console.log("Hola Mundo");
}, 800);


const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Nombre'
    }
    setTimeout(() => {
        console.log(usuario);
    }, 900);

    setTimeout(() => {
        callback(usuario);
    }, 1200);
}

getUsuarioById(10, (usuario) => {
    console.log("Enviar una funcion");
    console.log(usuario.id);
});
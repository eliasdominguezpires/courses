// https://nodejs.org/docs/latest-v14.x/api/fs.html
const fs = require('fs'); //File system
const { resolve } = require('path');

const crearArchivo = (base = 5, salida = String) => {
    //https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_writefile_file_data_options_callback
    //fs.writeFile(file, data[, options], callback)
    fs.writeFile(`./salida/tabla-${base}.txt`, salida, (err) => {
        if (err) throw err;

        console.log("Archivo creado");
    })
    
}

const crearArchivoPromise = (base = 5, salida = String) => {
    return new Promise(() => {
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        resolve(`tabla-${base}.txt creado`)
    })
}

const crearArchivoAsync = async (base = 5, salida = String) => {
    try {
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return (`.tabla-${base}.txt creado`)
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo,
    crearArchivoPromise,
    crearArchivoAsync,
}
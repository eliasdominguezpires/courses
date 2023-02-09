
//const { argv } = require('process');
//const { argv, argv } = require('process');
const colors = require('colors');

const argv = require('./config/yargs');
const { crearArchivo, crearArchivoAsync, crearArchivoPromise } = require('./helpers/crearArchivo');
const { multiplicar } = require('./helpers/multiplicacion');

console.clear();

/*
console.log(process.argv);
const [,,arg3 = 'base=5'] = process.argv;
const [, base = 5] = arg3.split('=');
console.log(base);
*/
console.log(argv);

const base = argv.b;

let salida = multiplicar(base, argv.li, argv.l);
/*
console.log("--------------------------------------------");
console.log(salida);
console.log("--------------------------------------------");
crearArchivo(base, salida);
crearArchivoPromise(base, salida)
    .then(salida => console.log(salida))
    .catch(err => console.log(err));
    */
crearArchivoAsync(base, salida)
    .then(salida => console.log(salida.green))
    .catch(err => console.log(err));

    
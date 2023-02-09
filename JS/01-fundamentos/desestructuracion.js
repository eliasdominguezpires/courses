const deadpool = {
    nombre : 'Wade',
    apellido: 'Winston',
    poder: 'regeneracion',
    edad: 35,
    getNombre(){
        return `${this.nombre} ${this.apellido}`
    }
}


console.log(deadpool.getNombre());

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

//console.log(nombre, apellido, poder);

//desestructuracion
const {nombre, apellido, poder} = deadpool;

function imprimeAntiHeroe({nombre, apellido, poder, edad = 0}) {
    console.log(nombre, apellido, poder, edad);
}

imprimeAntiHeroe(deadpool);

//Arreglos
const heroes = ['Dead', 'SuperMan', 'Batman'];

const [h1, h2, h3] = heroes;
const [,,h4] = heroes;

console.log(h1,h2,h3);
console.log(h4);
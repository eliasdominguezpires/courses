/*
    mas ligero su programacion es mas eficiente
    const tiene que estar inicializada, su valor no es mutable
    no se puede modificar su tipo de valor , a no ser que sea un object
*/
const nombre = 'Wolverine';
/* 
    LET podes declarar sin iniciarlizar
    su valor puede variar 
*/
let apellido = 'X-men'; //
var variable = "Se inicializa"; //
if(true){
    const nombre = "otra variable";
    let apellido = "no cambia, ";
    variable = "cambia";
    console.log(apellido);
}
console.log(nombre);
console.log(apellido);
console.log(variable);

const empleados = [
    {
        id: 1,
        nombre: 'uno'
    }, {
        id: 2,
        nombre: 'dos'
    }, {
        id: 3,
        nombre: 'tres'
    },
];

const salarios = [
    {
        id: 1,
        salario: 1000,
    }, {
        id: 2,
        salario: 2000,
    },
];

const getEmpleadoPromise = (id) => {

    return new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => {
            return e.id === id
        });
        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con ID ${id}`)

    });
}

const getSalarioPromise = (id) => {

    return new Promise((resolve, reject) => {
        const salario = salarios.find((s) => {
            return s.id === id
        });
        (salario)
            ? resolve(salario)
            : reject(`No existe Salario con ID ${id}`)

    });
}

const id = 3;
getEmpleadoPromise(id)
    .then(empleado => console.log(empleado))
    .catch(err => console.log(err));


getSalarioPromise(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));


getEmpleadoPromise(id)
    .then(empleado => {
        nombre = empleado;
        return getSalarioPromise(id);
    })
    .then(salario => console.log('El empleado ', nombre, ' Tiene un salario de: ', salario))
    .catch(err => console.log(`${err}`));
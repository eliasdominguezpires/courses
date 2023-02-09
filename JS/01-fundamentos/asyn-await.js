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

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleadoPromise(id);
        const salario = await getSalarioPromise(id);
        return `El salario del empleado: ${empleado} es de ${salario}`;
    } catch (error) {
        throw error; // se lanza si no se desea ejecutar o no es necesario el valor anterior
        // | return error; // 
    }

}

const id = 3;

getInfoUsuario(id)
    .then(msg => {
        console.log("TODO BIEN");
        console.log(msg);
    })
    .catch(err => {
        console.log("TODO MAL");
        console.log(err)
    });
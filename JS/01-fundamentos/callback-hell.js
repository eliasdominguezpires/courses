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


const getEmpleado = (id) => {
    const empleado = empleados.find((e) => {
        return e.id === id
    })
    if (empleado) {
        return empleado;

    } else {
        return `Empleado con ID ${id} no existe`;
    }
}

console.log(getEmpleado(3));

const getEmpleadoCallback = (id, callback) => {
    const empleado = empleados.find((e) => {
        return e.id === id
    })
    if (empleado) {
        callback(null, empleado);

    } else {
        callback(`Empleado con ID ${id} no existe`);
    }
}

const id = 3;

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id)?.salario;

    if (salario) {
        callback(null, salario);
    } else {
        callback(`No existe salario para el id ${id}`);
    }
}

getEmpleadoCallback(id, (err, empleado) => {
    if (err) {
        console.log("Error");
        return console.log(err);
    }

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }
        console.log('El empleado', empleado, 'Tiene un saladio de ', salario);
    })
})


import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer? ',
        choices: [
            {
                value: '1',
                name: `${'1.'.black} Crear lista`,
            }, {
                value: '2',
                name: `${'2.'.black} Listar tareas`,
            }, {
                value: '3',
                name: `${'3.'.black} Listar tareas Completadas`,
            }, {
                value: '4',
                name: `${'4.'.black} Listar tareas Pendientes`,
            }, {
                value: '5',
                name: `${'5.'.black} Completar tarea(s)`,
            }, {
                value: '6',
                name: `${'6.'.black} Borrar tarea`,
            }, {
                value: '7',
                name: '7. Salir',
            }
        ]
    }
]

const inquirerMenu = async () => {
    // console.clear();

    console.log("============================".green);
    console.log("'  SELECCIONE UNA OPCION   '".black);
    console.log("============================\n".green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    console.log('');
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]
    await inquirer.prompt(question);
}


const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const tareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        let idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0'.gray + ' Cancelar',

    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar tarea !',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const completarTarea = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        let idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    tareasBorrar,
    confirmar,
    completarTarea
}
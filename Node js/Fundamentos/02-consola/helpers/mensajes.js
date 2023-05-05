import colors from 'colors';

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();

        console.log("============================".green);
        console.log("'  SELECCIONE UNA OPCION   '".black);
        console.log("============================".green);


        console.log(`${'1'.green}. Crear tarea`);
        console.log(`${'2'.green}. Listar tareas`);
        console.log(`${'2'.green}. Listar tareas completadas`);
        console.log(`${'3'.green}. Listar tareas pendientes`);
        console.log(`${'4'.green}. Completar tares(s)`);
        console.log(`${'5'.green}. Borras tarea`);
        console.log(`${'6'.green}. Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Seleccione un opcion:', (opt) => {
            readline.close();
            resolve(opt);
        })
    })
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPresione ${'ENTER'.black} para continuar\n`, (opt) => {
            console.log({ opt });
            readline.close();
            resolve();
        })
    })

}

module.exports = {
    mostrarMenu,
    pausa
}
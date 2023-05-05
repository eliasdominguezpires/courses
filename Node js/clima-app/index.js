

import { inquirerMenu, leerInput, listarLugares, pausa } from './helpers/inquirer.js';
import { Busquedas } from './models/busqueda.js';



const main = async () => {
    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const busqueda = await leerInput('Ciudad: ');
                //buscar lugar
                const lugares = await busquedas.ciudad(busqueda);
                //seleccionar lugar
                const id = await listarLugares(lugares);
                const selec = lugares.find(l => l.id === id);
                //clima
                //resultado
                console.log(`\n Informacion de la ciudad \n`.green);
                console.log('Ciudad:', selec.nombre);
                console.log('Lat: ', selec.lat);
                console.log('Long: ',selec.lng);
                console.log('Tempreratura:',);
                console.log('Minima: ',);
                break;
            case 2:
                break;
        }

        console.log(opt);
        if (opt !== 3) await pausa();
    } while (opt !== 3)

}

main();
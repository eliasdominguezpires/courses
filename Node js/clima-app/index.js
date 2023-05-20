

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
                if (id === '0') continue;
                const selec = lugares.find(l => l.id === id);

                //Guardar DB
                busquedas.agregarHistoria(selec.nombre);

                //clima
                const clima = await busquedas.climaLugar(selec.lat, selec.lng);

                //resultado
                console.clear();
                console.log(`\n Informacion de la ciudad \n`.green);
                console.log('ID:', selec.id.red);
                console.log('Ciudad:', selec.nombre);
                console.log('Lat: ', selec.lat);
                console.log('Lng: ', selec.lng);
                console.log('Como esta el clima: ', clima.desc);
                console.log('Tempreratura:', clima.temp);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ', clima.max);
                break;
            case 2:
                console.clear();
                busquedas.historialCapitalizado.forEach((historial, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${historial}`);
                })
                break;
        }

        //console.log(opt);
        if (opt !== 3) await pausa();
    } while (opt !== 3)

}

main();
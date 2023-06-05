
import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, tareasBorrar, confirmar, completarTarea } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';


console.clear();
const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        //cargar tareas
        tareas.cargarTareaFromArry(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcion
                const value = await leerInput('Description: ');
                tareas.crearTarea(value);
                break;
            case '2':
                //listar
                //console.log(JSON.stringify(tareas._listado, null, 3));
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await completarTarea(tareas.listadoArr);
                console.log(ids);
                tareas.updateTarea(ids);
                break;
            case '6':
                const id = await tareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro?');
                    if (ok) {
                        tareas.borra(id);
                        console.log(`Tarea borrada ${id}`);

                    }
                };
                break;
        }

        guardarDB(tareas.listadoArr);
        await pausa();
        console.clear();

    } while (opt !== '7')

}


main();
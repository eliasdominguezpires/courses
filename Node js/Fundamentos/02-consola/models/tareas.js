import { Tarea } from "./tarea.js";

class Tareas {
    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = String) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    updateTarea = (ids = []) => {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    };

    borra(key = '') {
        if (this._listado[key]) {
            delete this._listado[key];
        }
    };

    cargarTareaFromArry(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        console.log('');
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'completado'.green
                : 'pendiente'.red;

            console.log(`${idx} ${desc} ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let idx = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            if (completadas && completadoEn) {
                idx++;
                console.log(`${idx} ${desc} ${completadoEn.blue}`);
            } else if (!completadas && !completadoEn) {
                idx++;
                console.log(`${idx} ${desc} ${' :: pendiente'.red}`);

            }

        });
    };

}

export {
    Tareas
}
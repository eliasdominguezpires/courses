
import * as dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import axios from 'axios';
import { log } from 'console';

class Busquedas {
    historial = [];
    dbPath = './db/dababase.json';

    constructor() {
        // TODO: leer db
        this.leerDb();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(" ");
            palabras = palabras.map(l => l[0].trim().toUpperCase() + l.substring(1));

            return palabras.join(" ");
        });
    }

    getParamsMapbox() {

        return {
            'proximity': 'ip',
            'types': 'country,region,locality,place',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
        }
    }
    getParamsOpenWeather() {
        return {
            'units': 'imperial',
            'lang': 'es',
            'appid': process.env.OPENWEATHER_KEY,
        }
    }

    async ciudad(nombre = 'Paraguari') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json`,
                params: this.getParamsMapbox()
            });

            const resp = await instance.get();
            // console.log(JSON.stringify(resp.data.features, null, 5));

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.log(error);
            return [];
        }

    }

    async climaLugar(lat, lon) {
        try {
            // instane axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.getParamsOpenWeather(), lat, lon }
            })
            const resp = await instance.get();
            // console.log(JSON.stringify(resp.data, null, 5));
            const { weather, main } = resp.data;
            return {
                desc: weather[0]?.description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    agregarHistoria(lugar = '') {
        //PREVENIR DUPLICADOS
        if (this.historial.includes(lugar.toLocaleUpperCase())) {
            return;
        }
        //Mostrar las ultimas 20
        this.historial = this.historial.slice(0, 20);

        this.historial.unshift(lugar.toLocaleUpperCase());

        //guardar arhivo
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial,
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDb() {
        // Debe de existir
        if (!fs.existsSync(this.dbPath)) {
            return;
        }
        // Info
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        // console.log("data", data);
        this.historial = data.historial;
    }
}


export {
    Busquedas
}
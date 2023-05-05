import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

class Busquedas {
    historial = ['Paraguari', 'Asuncion', 'Madrid'];

    constructor() {
        // TODO: leer db
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
}


export {
    Busquedas
}
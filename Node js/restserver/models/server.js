const express = require('express')
const cors = require("cors");
const { dbconnection } = require('../database/config');

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.userPath = '/api/user';

        // conectar a base de datos
        this.conectDataBase();

        //Middlewares
        this.middleares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectDataBase() {
        await dbconnection();
    }

    middleares() {
        //CORS
        this.app.use(cors());

        //Lectura Body
        this.app.use(express.json());

        //directorio public
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.userPath, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Puerto :", this.port);
        });
    }
}


module.exports = Server;
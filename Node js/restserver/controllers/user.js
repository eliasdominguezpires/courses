const { response } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");



const getUser = async (req, res = response) => {
    const queryParams = req.query;
    const { page = 0, limit = 5, skip = 0 } = queryParams;
    const filter = { state: true };
    /*
    const usuarios = await Usuario.find(filter)// enviar parametros, filtro
        .limit(limit)
        .skip(skip) //desde, ignora los primeros registros desde el numero pasado como parametro
        ;
    const rows = await Usuario.count(filter);
    */
    //Promise all [] para ejecutar varias peticiones a la vez 
    const [rows, usuarios] = await Promise.all([
        Usuario.count(filter),
        Usuario.find(filter)// enviar parametros, filtro
            .limit(limit)
            .skip(skip) //desde, ignora los primeros registros desde el numero pasado como parametro
    ]);

    res.json({
        msg: "get API - rest controler",
        page,
        rows,
        usuarios
    });
}

const postUser = async (req, res) => {
    const { name, mail, password, rol, } = req.body;
    const usuario = new Usuario({ name, mail, password, rol });

    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar BD
    await usuario.save();

    res.status(201).json({
        msg: "post ",
        usuario
    });
}

const putUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, ...user } = req.body;

    // Validar
    if (password) {
        //encriptar pass
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, user);

    res.json(JSON.parse(JSON.stringify({
        msg: "put ",
        usuario
    })));
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    //ELIMINADO FISICO
    //const usuario = await Usuario.findByIdAndDelete(id);

    //ELIMINADO LOGICO
    const updateState = await Usuario.findByIdAndUpdate(id, { state: "false" });

    res.json({
        msg: "delete ",
        id,
        updateState
    });
}

const patchUser = (req, res) => {
    res.json({
        msg: "patch "
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
}
const Role = require("../models/role");
const Usuario = require("../models/user");

const rolValidate = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`Rol ingresado ${rol} no existe`);
    }
};

const existEmail = async (mail = '') => {
    const existEmail = await Usuario.findOne({ mail });
    if (existEmail) {
        throw new Error(`Correo ingresado ya existe : ${mail}`);
    }
}

const existUserById = async (id = '') => {
    const existUser = await Usuario.findById(id);
    if (!existUser) {
        throw new Error(`Usuario ingresado no existe : ${id}`);
    }
}

module.exports = {
    rolValidate,
    existEmail,
    existUserById
}
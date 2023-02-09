const { response } = require('express');
const { Producto } = require('../models');


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProductosFilter = async (req, res = response) => {

    const { limite = 5, desde = 0, usuario } = req.query;
    const query = { estado: true, usuario };
    console.log(JSON.stringify(query, null, 5));
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);

}

const crearProducto = async (req, res = response) => {
    console.log(JSON.stringify("entro crearProducto"));
    const { estado, usuario, ...body } = req.body;

    //const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });


    /*if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }*/

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    // Guardar DB
    const nuevoProducto = await producto.save();
    console.log(JSON.stringify(nuevoProducto, null, 5));
    await nuevoProducto
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .execPopulate();

    res.status(201).json(nuevoProducto);

}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    console.log(JSON.stringify(producto, null, 5));

    await producto
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .execPopulate();

    res.json(producto);

}

const borrarProducto = async (req, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}




module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductosFilter,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
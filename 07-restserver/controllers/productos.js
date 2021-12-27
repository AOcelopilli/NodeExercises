const { response } = require("express");
const { Producto } = require("../models");

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
  const { limit = 4, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.status(200).json({
    total,
    productos,
  });
};

// obtenerProducto - populate {}

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.status(200).json({
    producto,
  });
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const nombre = body.nombre.toUpperCase();

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe.`,
    });
  }

  // generar la data a guardar
  const data = {
    ...body,
    nombre,
    usuario: req.user._id,
  };

  const producto = new Producto(data);

  // Guardar en DB
  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    const nombre = data.nombre.toUpperCase();

    // Verificar que la producto no exista para evitar duplicidad.
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
      return res.status(401).json({
        msg: `La producto ${productoDB.nombre} ya existe en la base de datos`,
      });
    }

    data.nombre = nombre;
  }

  data.usuario = req.user._id;

  // Actualizar producto
  const producto = await Producto.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  res.status(201).json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    {
      returnDocument: "after",
    }
  );

  res.status(200).json(producto);
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};

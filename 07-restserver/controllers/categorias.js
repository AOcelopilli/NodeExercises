const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const { limit = 4, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario"),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate {}

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario");

  res.json({
    categoria,
  });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe.`,
    });
  }

  // generar la data a guardar
  const data = {
    nombre,
    usuario: req.user._id,
  };

  const categoria = new Categoria(data);

  // Guardar en DB

  await categoria.save();

  res.status(201).json(categoria);
};

// actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(401).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe en la base de datos`,
    });
  }

  const categoria = await Categoria.findByIdAndUpdate(id, { nombre });

  res.json({
    msg: "categoria actualizada",
    categoria,
  });
};

// borrarCategoria - estado:false

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.json(categoria);
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};

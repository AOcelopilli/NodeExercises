const empleados = [
  {
    id: 1,
    nombre: "Angel",
  },
  {
    id: 2,
    nombre: "Fulanita",
  },
  {
    id: 3,
    nombre: "Fulanito",
  },
];

const salarios = [
  {
    id: 1,
    salario: 100,
  },
  {
    id: 2,
    salario: 120,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((emp) => emp.id === id)?.nombre;
    empleado
      ? resolve(empleado)
      : reject(`No se encontraron resultados para el id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario
      ? resolve(salario)
      : reject(`No se encontraron resultados para el salario con el id ${id}`);
  });
};

const getInfoUsuario = async () => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El salario del empleado: ${empleado} es de  ${salario}`;
  } catch (error) {
    throw error;
  }
};

const id = 3;

getInfoUsuario()
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));

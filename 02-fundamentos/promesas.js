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
      : reject(`No se encontraron resultados para el salirio con el id ${id}`);
  });
};

// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));

/* Promesas en cadena. */
const id = 3;

let nombre;

getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log("El empleado: ", nombre, "tiene un salario de: ", salario)
  )
  .catch((err) => console.log(err));

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

const id = 12;

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((emp) => emp.id === id);

  if (empleado) {
    //Se retorna null para el err
    callback(null, empleado);
  } else {
    callback(`Error: Empleado con id ${id} no existe`);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((sal) => sal.id === id)?.salario;

  if (salario) {
    //Se retorna null como valor para el err
    callback(null, salario);
  } else {
    callback(`Error: El empleado con el id ${id} no cuenta con salario`);
  }
};

getEmpleado(id, (err, empleado) => {
  if (err) {
    return console.log(err);
  }
  console.log("Empleado existe");
  console.log(empleado.nombre);

  getSalario(id, (err, salario) => {
    if (err) {
      return console.log(err);
    }

    console.log("El empleado tiene salario");
    console.log(salario);
  });
});

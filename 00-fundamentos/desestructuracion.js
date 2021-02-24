const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneracion",
  // edad: 50,
  getNombre() {
    return `${this.name} ${this.apellido}`;
  },
};

// console.log(deadpool);

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
  console.log(nombre, apellido, poder, edad);
}

// imprimeHeroe(deadpool);

const heroes = ["Deadpool", "Batman", "Superman"];

// const heroe1 = heroes[0];
// const heroe2 = heroes[1];
// const heroe3 = heroes[2];

// console.log(heroe1, heroe2, heroe3);

const [, , heroe3] = heroes;

console.log(heroe3);

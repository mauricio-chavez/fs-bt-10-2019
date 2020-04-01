const objecto = {
  llave: 'valor',
  llaveSiguiente: 'valor2'
}


// Sin destructuring
var llave = objecto.llave
var llaveSiguiente = objecto.llaveSiguiente

// Con destructuring
var { llave, llaveSiguiente } = objecto
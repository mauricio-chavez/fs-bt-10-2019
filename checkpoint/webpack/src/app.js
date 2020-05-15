export const startApp = () => {
  const numeros = [1, 2, 3, 4, 5];
  const numerosUl = document.querySelector('#numeros');

  let items = '';

  numeros.forEach(numero => {
    items += `<li>${numero * 2}</li>\n`;
  });

  numerosUl.innerHTML = items;
};

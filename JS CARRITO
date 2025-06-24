const productos = [
  { id: 1, nombre: "Zapatillas Urbanas", precio: 49.99, imagen: "https://via.placeholder.com/300x200" },
  { id: 2, nombre: "Camisa Casual", precio: 29.99, imagen: "https://via.placeholder.com/300x200" },
  { id: 3, nombre: "Pantalón Jeans", precio: 59.99, imagen: "https://via.placeholder.com/300x200" },
  { id: 4, nombre: "Mochila Urbana", precio: 39.99, imagen: "https://via.placeholder.com/300x200" }
];

const contenedorDestacados = document.getElementById("productos-destacados");
const contenedorLista = document.getElementById("lista-productos");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = [];

function renderProductos(destino) {
  if (!destino) return;

  destino.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" />
      <h4>${prod.nombre}</h4>
      <p>$${prod.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    destino.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  carrito.push(id);
  actualizarContador();
  alert("Producto agregado al carrito");
}

function actualizarContador() {
  if (contadorCarrito) contadorCarrito.textContent = carrito.length;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductos(contenedorDestacados || contenedorLista);
  actualizarContador();
});

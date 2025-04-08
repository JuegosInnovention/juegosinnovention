const palabras = [
  { palabra: "Arbol", imagen: "imagenes/arbol.jpg" },
  { palabra: "Barco", imagen: "imagenes/barco.jpg" },
  { palabra: "Casa", imagen: "imagenes/casa.jpg" },
  { palabra: "Dado", imagen: "imagenes/dado.jpg" },
  { palabra: "Elefante", imagen: "imagenes/elefante.jpg" },
  { palabra: "Foca", imagen: "imagenes/foca.jpg" },
  { palabra: "Gato", imagen: "imagenes/gato.jpg" },
  { palabra: "Helado", imagen: "imagenes/helado.jpg" },
  { palabra: "Isla", imagen: "imagenes/isla.jpg" },
  { palabra: "Jirafa", imagen: "imagenes/jirafa.jpg" },
  { palabra: "Koala", imagen: "imagenes/koala.jpg" },
  { palabra: "Luna", imagen: "imagenes/luna.jpg" },
  { palabra: "Manzana", imagen: "imagenes/manzana.jpg" },
  { palabra: "Nube", imagen: "imagenes/nube.jpg" },
  { palabra: "Ñu", imagen: "imagenes/ñu.jpg" },
  { palabra: "Oso", imagen: "imagenes/oso.jpg" },
  { palabra: "Perro", imagen: "imagenes/perro.jpg" },
  { palabra: "Queso", imagen: "imagenes/queso.jpg" },
  { palabra: "Rana", imagen: "imagenes/rana.jpg" },
  { palabra: "Sol", imagen: "imagenes/sol.jpg" },
  { palabra: "Tigre", imagen: "imagenes/tigre.jpg" },
  { palabra: "Uva", imagen: "imagenes/uva.jpg" },
  { palabra: "Vela", imagen: "imagenes/vela.jpg" },
  { palabra: "Wafle", imagen: "imagenes/waffles.jpg" },
  { palabra: "Xilofono", imagen: "imagenes/xilofono.jpg" },
  { palabra: "Yoyo", imagen: "imagenes/yoyo.jpg" },
  { palabra: "Zorro", imagen: "imagenes/zorro.jpg" }
];

function contarSilabas(palabra) {
  const vocales = palabra.toLowerCase().match(/[aeiouáéíóúü]/g);
  return vocales ? vocales.length : 0;
}

// 📥 Leer configuración guardada
const config = JSON.parse(localStorage.getItem("configuracion")) || {};
const tiempoEntreLetras = parseInt(config.tiempoLetras) || 2;
const cantidadSilabas = parseInt(config.silabas) || 1;

// 🎯 Filtrar palabras por sílabas
const palabrasFiltradas = palabras.filter(p => contarSilabas(p.palabra) === cantidadSilabas);

// 🎮 Variables del juego
let index = 0;
let timeouts = [];

const palabraDiv = document.getElementById("palabra");
const imagenEl = document.getElementById("imagen");
const btnSiguiente = document.getElementById("siguiente");
const btnVolver = document.getElementById("volver");
const temporizadorEl = document.getElementById("temporizador");
const btnVolverConfig = document.getElementById("btnVolverConfig");


function limpiar() {
  palabraDiv.innerHTML = "";
  imagenEl.style.display = "none";
  clearAllTimeouts();
}

function clearAllTimeouts() {
  timeouts.forEach(id => clearTimeout(id));
  timeouts = [];
}

function mostrarPalabra(palabraObj) {
  limpiar();

  const letras = palabraObj.palabra.split("");

  letras.forEach((letra, i) => {
    const t = setTimeout(() => {
      const span = document.createElement("span");
      span.textContent = letra;
      span.style.animation = "fadeIn 0.5s ease";
      palabraDiv.appendChild(span);
    }, tiempoEntreLetras * 1000 * (i + 1));
    timeouts.push(t);
  });

  const imagenTimeout = setTimeout(() => {
    imagenEl.src = palabraObj.imagen;
    imagenEl.style.display = "block";
  }, tiempoEntreLetras * 1000 * (letras.length + 1));
  timeouts.push(imagenTimeout);

  // Temporizador visual (opcional)
  let total = (letras.length + 1) * tiempoEntreLetras;
  temporizadorEl.textContent = `Tiempo: ${total}s`;
  const t = setInterval(() => {
    total--;
    temporizadorEl.textContent = `Tiempo: ${total}s`;
    if (total <= 0) clearInterval(t);
  }, 1000);
}

btnSiguiente.addEventListener("click", () => {
  if (index < palabrasFiltradas.length - 1) {
    index++;
    mostrarPalabra(palabrasFiltradas[index]);
  }
});

btnVolver.addEventListener("click", () => {
  if (index > 0) {
    index--;
    mostrarPalabra(palabrasFiltradas[index]);
  }
});

btnVolverConfig.addEventListener("click", () => {
  window.location.href = "configuracion.html";
});

if (palabrasFiltradas.length > 0) {
  mostrarPalabra(palabrasFiltradas[index]);
} else {
  palabraDiv.textContent = "No hay palabras con esa cantidad de sílabas.";
}
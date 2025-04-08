document.addEventListener("DOMContentLoaded", function () {
    const consonantesDiv = document.getElementById("consonantes");
    const vocalesDiv = document.getElementById("vocales");
    const imagenPalabra = document.getElementById("imagen-palabra");
    const contenedorLetrasEscritas = document.getElementById("contenedor-letras-escritas");
  
    const btnSiguiente = document.getElementById("btnSiguiente");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnComprobar = document.getElementById("btnComprobar");
  
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    const vocales = ["A", "E", "I", "O", "U"];
  
    const palabras = {
      "A": { palabra: "Arbol", imagen: "imagenes/arbol.jpg" },
      "B": { palabra: "Barco", imagen: "imagenes/barco.jpg" },
      "C": { palabra: "Casa", imagen: "imagenes/casa.jpg" },
      "D": { palabra: "Dado", imagen: "imagenes/dado.jpg" },
      "E": { palabra: "Elefante", imagen: "imagenes/elefante.jpg" },
      "F": { palabra: "Foca", imagen: "imagenes/foca.jpg" },
      "G": { palabra: "Gato", imagen: "imagenes/gato.jpg" },
      "H": { palabra: "Helado", imagen: "imagenes/helado.jpg" },
      "I": { palabra: "Isla", imagen: "imagenes/isla.jpg" },
      "J": { palabra: "Jirafa", imagen: "imagenes/jirafa.jpg" },
      "K": { palabra: "Koala", imagen: "imagenes/koala.jpg" },
      "L": { palabra: "Luna", imagen: "imagenes/luna.jpg" },
      "M": { palabra: "Manzana", imagen: "imagenes/manzana.jpg" },
      "N": { palabra: "Nube", imagen: "imagenes/nube.jpg" },
      "Ñ": { palabra: "Ñu", imagen: "imagenes/ñu.jpg" },
      "O": { palabra: "Oso", imagen: "imagenes/oso.jpg" },
      "P": { palabra: "Perro", imagen: "imagenes/perro.jpg" },
      "Q": { palabra: "Queso", imagen: "imagenes/queso.jpg" },
      "R": { palabra: "Rana", imagen: "imagenes/rana.jpg" },
      "S": { palabra: "Sol", imagen: "imagenes/sol.jpg" },
      "T": { palabra: "Tigre", imagen: "imagenes/tigre.jpg" },
      "U": { palabra: "Uva", imagen: "imagenes/uva.jpg" },
      "V": { palabra: "Vela", imagen: "imagenes/vela.jpg" },
      "W": { palabra: "Wafle", imagen: "imagenes/waffles.jpg" },
      "X": { palabra: "Xilofono", imagen: "imagenes/xilofono.jpg" },
      "Y": { palabra: "Yoyo", imagen: "imagenes/yoyo.jpg" },
      "Z": { palabra: "Zorro", imagen: "imagenes/zorro.jpg" }
    };
  
    const orden = Object.keys(palabras);
    let indexActual = 0;
    let palabraActual = "";
    let letrasIngresadas = [];
  
    function crearBotones() {
      letras.forEach((letra) => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.classList.add("letra");
  
        btn.addEventListener("click", () => agregarLetra(letra));
  
        if (vocales.includes(letra)) {
          vocalesDiv.appendChild(btn);
        } else {
          consonantesDiv.appendChild(btn);
        }
      });
    }
  
    function cargarPalabra() {
      const letra = orden[indexActual];
      const data = palabras[letra];
      palabraActual = data.palabra.toUpperCase();
      imagenPalabra.src = data.imagen;
  
      // Reset inputs
      letrasIngresadas = [];
      contenedorLetrasEscritas.innerHTML = "";
  
      for (let i = 0; i < palabraActual.length; i++) {
        const div = document.createElement("div");
        div.classList.add("contenedor-letra");
        contenedorLetrasEscritas.appendChild(div);
      }
    }
  
    function agregarLetra(letra) {
      if (letrasIngresadas.length < palabraActual.length) {
        letrasIngresadas.push(letra);
        contenedorLetrasEscritas.children[letrasIngresadas.length - 1].textContent = letra;
      }
    }
  
    function comprobarPalabra() {
      const formada = letrasIngresadas.join("").toUpperCase();
      if (formada === palabraActual) {
        alert("¡BIEN HECHO!");
      } else {
        alert("SIGUE INTENTANDO");
      }
    }
  
    function palabraSiguiente() {
      indexActual = (indexActual + 1) % orden.length;
      cargarPalabra();
    }
  
    function palabraAnterior() {
      indexActual = (indexActual - 1 + orden.length) % orden.length;
      cargarPalabra();
    }
  
    btnSiguiente.addEventListener("click", palabraSiguiente);
    btnAnterior.addEventListener("click", palabraAnterior);
    btnComprobar.addEventListener("click", comprobarPalabra);
  
    crearBotones();
    cargarPalabra();
  });
  



const imgPalabra = document.getElementById("imagen-palabra");
const contenedorLetras = document.getElementById("contenedor-letras-escritas");
const zonaVocales = document.getElementById("zona-vocales");
const zonaConsonantes = document.getElementById("zona-consonantes");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnComprobar = document.getElementById("btnComprobar");

function mostrarPalabra() {
  const { palabra, imagen } = palabras[indiceActual];
  palabraActual = palabra;
  imgPalabra.src = imagen;
  letrasIngresadas = [];
  actualizarContenedor();
}

function actualizarContenedor() {
  contenedorLetras.innerHTML = "";
  letrasIngresadas.forEach(letra => {
    const span = document.createElement("span");
    span.className = "letra";
    span.textContent = letra;
    contenedorLetras.appendChild(span);
  });
}

function crearBotones(letras, zona) {
  zona.innerHTML = "";
  letras.forEach(letra => {
    const btn = document.createElement("div");
    btn.className = "letra";
    btn.textContent = letra;
    btn.onclick = () => {
      if (letrasIngresadas.length < palabraActual.length) {
        letrasIngresadas.push(letra);
        actualizarContenedor();
      }
    };
    zona.appendChild(btn);
  });
}

function comprobarPalabra() {
  const formada = letrasIngresadas.join("").toUpperCase();
  if (formada === palabraActual) {
    alert("¡BIEN HECHO! 🟢");
  } else {
    alert("SIGUE INTENTANDO 🔴");
  }
}

btnAnterior.onclick = () => {
  indiceActual = (indiceActual - 1 + palabras.length) % palabras.length;
  mostrarPalabra();
};

btnSiguiente.onclick = () => {
  indiceActual = (indiceActual + 1) % palabras.length;
  mostrarPalabra();
};

btnComprobar.addEventListener("click", comprobarPalabra);

// Inicializar
crearBotones(vocales, zonaVocales);
crearBotones(consonantes, zonaConsonantes);
mostrarPalabra();
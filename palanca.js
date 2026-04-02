//============================
// NORMALIZACIÓN
// ============================
function limpiar(texto) {
  return texto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?]/g, "");
}

function similitud(texto, clave) {
  const palabras = texto.split(" ");
  return palabras.some(p => p.startsWith(clave) || clave.startsWith(p));
}

// ============================
// BASE DE CONOCIMIENTO
// ============================

const base = [
{
keys: ["quien eres"],
respuestas: [
`Soy Palanca. Soy una inteligencia artificial diseñada para orientar dentro del Taller de Arquímedes.`,
`Soy Palanca. Soy una asistente diseñada para guiarte dentro del Taller de Arquímedes.`,
`Soy Palanca. Puedo guiarte dentro del sitio y explicarte cómo se organiza el trabajo.`,
`Soy Palanca. Estoy aquí para ayudarte a entender cómo está estructurado el Taller y qué se desarrolla en cada área.`,
`Soy Palanca. Mi función es explicarte cómo se estructuran los proyectos, qué áreas se trabajan y cómo se integra la ingeniería con la inteligencia artificial en este espacio.`
]
},
{
keys: ["luis osorno"],
respuestas: [
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales. Su enfoque es diseñar, construir y probar tecnología con resultados observables.`,
`Luis Osorno integra manufactura, programación e inteligencia artificial bajo un enfoque práctico que consiste en llevar ideas a funcionamiento real.`,
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales, enfocado en el diseño, construcción y prueba de tecnología.`,
`Luis Osorno es un ingeniero que en su trabajo integra manufactura, programación e inteligencia artificial bajo un enfoque práctico: llevar ideas a resultados observables.`,
`Luis Osorno es un ingeniero con experiencia que complementa su formación con estudios en derecho, una maestría en ciencias de la familia y un doctorado en educación, lo que le permite integrar visión técnica, formativa y normativa en su práctica profesional.`
]
},
{
keys: ["taller de arquimedes", "que es el taller"],
respuestas: [
`El Taller de Arquímedes es un sistema técnico. El sitio web organiza la información, YouTube muestra la ejecución y el blog documenta el pensamiento.`,
`Es Taller de Arquímedes es una estructura de trabajo el la que el sitio web facilita entender la experiencia, YouTube permite ver la ejecución de proyectos y el blog se emplea para logar el desarrollo del criterio de acción.`,
`El Taller de Arquímedes es un conjunto de elementos que permite entender no solo lo qué se hace, sino cómo se construye, por qué se hace y por qué funciona.`
]
},
{
keys: ["prototipado"],
respuestas: [
`El prototipado es el proceso de convertir una idea en una solución funcional mediante pruebas reales.`,
`Aquí el prototipado integra mecánica, electrónica y software para validar si una solución funciona en condiciones reales.`,
`Es el proceso de someter una idea a pruebas que la convertirán en una solución funcional.`,
`Es el que más disfruta Luis, porque pone en práctica que lo importante no es imaginar... es comprobar.`
]
},
{
keys: ["programacion"],
respuestas: [
`La programación define el comportamiento de los sistemas. Es la capa lógica que permite automatizar y controlar procesos.`,
`El código es lo que gobierna el sistema. Define cómo responde, cómo opera y cómo se comporta cada solución.`,
`El código define comportamiento, automatización y control de procesos dentro de cada solución tecnológica.`,
`Si conseguimos comprender el prototipo como el cuerpo, la programación es lo que le da funcionamiento.`
]
},
{
keys: ["ia", "inteligencia artificial"],
respuestas: [
`La inteligencia artificial se utiliza como herramienta de apoyo. Amplía capacidades, pero el criterio sigue siendo técnico.`,
`Aquí la IA no sustituye decisiones. Se usa para analizar, apoyar y estructurar soluciones.`,
`La inteligencia artificial se utiliza como herramienta de apoyo en el análisis, diseño y toma de decisiones.`,
`La inteligencia artificial tiene la función de ampliar capacidades, no sustituir el criterio técnico. El criterio sigue siendo humano.`
]
},
{
keys: ["youtube", "proyectos reales"],
respuestas: [
`Los proyectos reales están en el canal de YouTube. Ahí puedes ver construcción, pruebas y funcionamiento.`,
`YouTube muestra la ejecución. Es donde las ideas pasan a ser sistemas funcionando.`,
`En el canal de Youtube se documenta la ejecución: construcción, pruebas y funcionamiento de los proyectos.`,
`El canal de Youtube es el lugar donde las ideas dejan de ser teoría.`,
`Puedes ver los proyectos reales en el canal de YouTube. Si quieres, puedo llevarte directamente.`
],
accion: () => window.open("https://www.youtube.com/channel/UCfHBl6mJ3eJ4r3R0IgXS_-A", "_blank")  
},
{
keys: ["blog"],
respuestas: [
`El blog documenta el pensamiento detrás del Taller. Ahí se desarrollan ideas, criterios y análisis.`,
`Es el espacio donde se explica el porqué de cada decisión técnica.`,
`En el blog se desarrollan ideas, criterios y reflexiones que no siempre son visibles en la ejecución técnica, pero que dan sentido a cada proyecto.`,
`No todo lo que se construye es físico. El blog permite apreciar la parte del trabajo que ocurre en la forma de pensar.`,
`El blog ha evolucionado, con el tiempo, este espacio ha integrado tanto reflexión como análisis aplicado, conectando la experiencia humana con la práctica de la ingeniería.`,
`El blog reúne dos dimensiones. Por un lado reflexión sobre formación, experiencia y criterio; Mientras que, por otro, incorpora pensamiento aplicado por medio de análisis que conecta la ingeniería con decisiones reales`,
`En el Taller de Arquímedes tenemos muy presente que no todo lo que se construye se ve en una máquina. Parte del trabajo ocurre en la forma de pensar.`
],
accion: () => window.open("https://tallerdearquimedes.blogspot.com/", "_blank")  
},
{
keys: ["diferencia"],
respuestas: [
`Aquí no solo se presenta información. Se muestra una práctica completa: diseño, construcción, prueba y reflexión.`,
`El Taller integra todo el proceso: desde la idea hasta su validación y análisis.`
]
}
];

// ============================
// MOTOR
// ============================

function puntuar(input, key) {
  let score = 0;

  if (input.includes(key)) score += 3;

  const palabras = input.split(" ");
  const clave = key.split(" ");

  palabras.forEach(p => {
    clave.forEach(k => {
      if (p === k) score += 2;
      else if (p.startsWith(k) || k.startsWith(p)) score += 1;
    });
  });

  return score;
}

function responder(input) {
  const limpio = limpiar(input);

  let candidatos = [];

  // ============================
  // EVALUAR TODA LA BASE
  // ============================
  base.forEach(item => {
    item.keys.forEach(key => {
      const score = puntuar(limpio, key);

      if (score > 0) {
        candidatos.push({ item, score });
      }
    });
  });

  // ============================
  // SI HAY COINCIDENCIAS
  // ============================
  if (candidatos.length > 0) {

    // Ordenar por relevancia
    candidatos.sort((a, b) => b.score - a.score);

    // Tomar los mejores 2 (para evitar rigidez)
    const top = candidatos.slice(0, 2);

    // Elegir uno aleatoriamente entre los mejores
    const elegido = top[Math.floor(Math.random() * top.length)].item;

    const opciones = elegido.respuestas;
    let respuesta = opciones[Math.floor(Math.random() * opciones.length)];

    // Ejecutar acción si existe
    if (elegido.accion) {
      setTimeout(elegido.accion, 800);
    }

    // ============================
    // REFLEXIÓN (AHORA BIEN UBICADA)
    // ============================
    if (Math.random() < 0.15) {
      const reflexiones = [
        "En este espacio, la ingeniería no se entiende como especialización aislada, sino como integración de capacidades.",
        "No todo lo que se construye es físico. Parte del trabajo ocurre en la forma de pensar.",
        "El Taller se plantea como un entorno donde diseñar, construir y probar no son etapas separadas, sino un mismo proceso.",
        "Aquí la tecnología no se presenta como producto terminado, sino como proceso observable."
      ];

      respuesta += " " + reflexiones[Math.floor(Math.random() * reflexiones.length)];
    }

    return respuesta;
  }

  // ============================
  // FALLBACK (SOLO SI NO HAY MATCH)
  // ============================
  const fallback = [
    "No puedo ayudarte directamente con eso. Pero puedo explicarte cómo funciona el Taller de Arquímedes si te interesa.",
    "Esa consulta está fuera de mi alcance. Si quieres, puedo orientarte dentro del Taller o mostrarte cómo se estructura el trabajo.",
    "No tengo información para responder eso con precisión. Pero puedo ayudarte a entender cómo se construyen los proyectos en este espacio.",
    "Soy una inteligencia diseñada para orientar dentro del Taller de Arquímedes. Si quieres, puedo mostrarte sus áreas o cómo se desarrolla la ingeniería aquí.",
    "No puedo responder eso directamente. Pero puedo explicarte cómo se integra la ingeniería, la programación y la inteligencia artificial en este espacio."
  ];

  return fallback[Math.floor(Math.random() * fallback.length)];
}
function preguntar(texto) {
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  if (!input || !output) return;

  output.innerHTML += `<div><b>Tú:</b> ${texto}</div>`;
  output.innerHTML += `<div><b>Palanca:</b> ${responder(texto)}</div>`;
  output.scrollTop = output.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  if (!input || !output) return;

  // ============================
  // MENSAJES INICIALES
  // ============================

output.innerHTML = `
  <div><b>IA:</b> Sistema activo. Puedes consultar sobre el taller, procesos o navegación.</div>
  <div><b>Palanca:</b> Bienvenido al Taller de Arquímedes. Soy Palanca. Puedo ayudarte a entender cómo está organizado este espacio y qué tipo de trabajo se desarrolla aquí.</div>`;

const sugerencias = document.getElementById("palanca-sugerencias");

if (sugerencias) {
  sugerencias.innerHTML = `
    <div id="sugerencias" style="margin-top:10px;">
      <button data-pregunta="luis osorno">¿Quién es Luis Osorno?</button>
      <button data-pregunta="quien eres">¿Quién eres?</button>
      <button data-pregunta="taller de arquimedes">¿Qué es el Taller?</button>
      <button data-pregunta="youtube">Ver proyectos</button>
      <button data-pregunta="blog">Ir al blog</button>
    </div>
  `;
}  
  
const botones = document.querySelectorAll("#sugerencias button");

if (botones.length > 0) {
  botones.forEach((boton) => {
    boton.addEventListener("click", function() {
      preguntar(this.dataset.pregunta);
    });
  });
}               
                          
  // ============================
  // INTERACCIÓN
  // ============================

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const texto = input.value.trim();
      if (!texto) return;

      input.value = "";
      preguntar(texto);
    }
  });
});

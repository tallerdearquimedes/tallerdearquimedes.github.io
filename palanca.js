// ============================
// NORMALIZACIÓN
// ============================
function limpiar(texto) {
  return texto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?]/g, "");
}

// ============================
// BASE DE CONOCIMIENTO
// ============================

const base = [
{
keys: ["quien eres"],
respuestas: [
`Soy Palanca. Asistente del Taller de Arquímedes. Puedo guiarte dentro del sitio y explicarte cómo se organiza el trabajo.`,
`Soy Palanca. Estoy aquí para ayudarte a entender cómo está estructurado el Taller y qué se desarrolla en cada área.`
]
},
{
keys: ["luis osorno"],
respuestas: [
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales. Su enfoque es diseñar, construir y probar tecnología con resultados observables.`,
`Luis Osorno integra manufactura, programación e inteligencia artificial bajo un enfoque práctico: llevar ideas a funcionamiento real.`
]
},
{
keys: ["taller de arquimedes", "que es el taller"],
respuestas: [
`El Taller de Arquímedes es un sistema técnico. El sitio organiza la información, YouTube muestra la ejecución y el blog documenta el pensamiento.`,
`Es una estructura de trabajo: web para entender, YouTube para ver ejecución y blog para desarrollar el criterio.`
]
},
{
keys: ["prototipado"],
respuestas: [
`El prototipado es el proceso de convertir una idea en una solución funcional mediante pruebas reales.`,
`Aquí el prototipado integra mecánica, electrónica y software para validar si una solución realmente funciona.`
]
},
{
keys: ["programacion"],
respuestas: [
`La programación define el comportamiento de los sistemas. Es la capa lógica que permite automatizar y controlar procesos.`,
`El código es lo que gobierna el sistema. Define cómo responde, cómo opera y cómo se comporta cada solución.`
]
},
{
keys: ["ia", "inteligencia artificial"],
respuestas: [
`La inteligencia artificial se utiliza como herramienta de apoyo. Amplía capacidades, pero el criterio sigue siendo técnico.`,
`Aquí la IA no sustituye decisiones. Se usa para analizar, apoyar y estructurar soluciones.`
]
},
{
keys: ["youtube", "proyectos reales"],
respuestas: [
`Los proyectos reales están en el canal de YouTube. Ahí puedes ver construcción, pruebas y funcionamiento.`,
`YouTube muestra la ejecución. Es donde las ideas pasan a ser sistemas funcionando.`
]
},
{
keys: ["blog"],
respuestas: [
`El blog documenta el pensamiento detrás del Taller. Ahí se desarrollan ideas, criterios y análisis.`,
`Es el espacio donde se explica el porqué de cada decisión técnica.`
]
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

function responder(input) {
  const limpio = limpiar(input);

  for (let item of base) {
    for (let key of item.keys) {
      if (limpio.includes(key)) {
        const opciones = item.respuestas;
        return opciones[Math.floor(Math.random() * opciones.length)];
      }
    }
  }

  return "Puedo orientarte dentro del Taller. Intenta preguntar por una sección o concepto específico.";
}

// ============================
// INICIALIZACIÓN
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {

      const texto = input.value;
      input.value = "";

      output.innerHTML += `<div><b>Tú:</b> ${texto}</div>`;

      const respuesta = responder(texto);

      output.innerHTML += `<div><b>Palanca:</b> ${respuesta}</div>`;

      output.scrollTop = output.scrollHeight;
    }
  });
});
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
`Luis Osorno es un ingenieor que en su trabajo integra manufactura, programación e inteligencia artificial bajo un enfoque práctico: llevar ideas a resultados observables.`,
`Luis Osorno es un ingenierp con experienca que complementa su formación con estudios en derecho, una maestría en ciencias de la familia y un doctorado en educación, lo que le permite integrar visión técnica, formativa y normativa en su práctica profesional.`
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
`El canal de Youtube es el lugar donde las ideas dejan de ser teoría.`
]
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

  return "Si lo deseas, puedo orientarte dentro del Taller. Intenta preguntar por una sección o concepto específico.";
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

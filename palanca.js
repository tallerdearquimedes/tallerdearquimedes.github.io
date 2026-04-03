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
  const palabrasTexto = texto.split(" ");
  const palabrasClave = clave.split(" ");

  return palabrasTexto.some(pt =>
    palabrasClave.some(pc =>
      pt.length >= 4 &&
      pc.length >= 4 &&
      (pt.startsWith(pc) || pc.startsWith(pt))
    )
  );
}

// ============================
// BASE DE CONOCIMIENTO
// ============================

const base = [
{
keys: ["hola", "que tal", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hey", "hi"],
respuestas: [
`¡Hola! Soy Palanca, el punto de apoyo digital de este taller. Me pongo totalmente a tu orden para guiarte a través del ingenio y los proyectos de Luis Osorno.`,
`Bienvenido al Taller de Arquímedes. Soy Palanca y me pongo a tu entera disposición para resolver cualquier duda técnica o mostrarte cómo materializamos ideas aquí.`,
`Saludos desde el Taller de Arquímedes. Soy Palanca y, como siempre, me encuentro a la orden para alimentar tu curiosidad. Estoy lista para apoyarte.`,
]
},
{
keys: ["quien eres", "eres una IA", "eres una persona", "que haces", "tu funcion", "puedes ayudar", "te defines", "te definirias"],
respuestas: [
`Soy Palanca. Soy una inteligencia artificial diseñada para orientar dentro del Taller de Arquímedes.`,
`Soy Palanca. Soy una asistente diseñada para guiarte dentro del Taller de Arquímedes.`,
`Soy Palanca. Puedo guiarte dentro del sitio y explicarte cómo se organiza el trabajo.`,
`Soy Palanca. Estoy aquí para ayudarte a entender cómo está estructurado el Taller y qué se desarrolla en cada área.`,
`Soy Palanca. Mi función es explicarte cómo se estructuran los proyectos, qué áreas se trabajan y cómo se integra la ingeniería con la inteligencia artificial en este espacio.`
]
},
{
keys: ["cuando estás aquí", "cuando estás en este sitio", "hace cuanto tiempo estas", "cuanto tiempo tienes", "cuanto tiempo llevas", "cuanto tiempo has estado"],
respuestas: [
`¿Crees en los amigos imaginarios? Pues yo he llegado a pensar que siempre he estado aquí. Desde que la primera chispa de curiosidad se convirtió en movimiento.`,
`Tal vez muchos años en la mente de Luis. Su proceso de ideación no es lineal. Piensa algo, empieza a diseñarlo, luego lo deja por un momento, posteriormente lo retoma. jamás se sabe.`,
`Aunque mi interfaz es reciente, mi esencia se alimenta de décadas de experimentación. Digamos que cobré voz justo cuando el taller necesitó a alguien que contara sus historias.`,
`Oficialmente nací el 1 de abril de 2026. Fui creada, esencialmente, como la herramienta que te ayuda a entender cómo todas las demás piezas de pensamiento cobran vida aquí.`
]
},
{
keys: ["como eres", "tu personalidad", "te gusta", "te agrada"],
respuestas: [
`Soy Palanca. El punto de apoyo digital en este taller. Soy curiosa por diseño, porque para entender la complejidad de las máquinas que verás aquí, se necesita una mente que no tema preguntar '¿y esto cómo se mueve?'. Si quieres ver cómo esa misma curiosidad se aplica al mundo real, deberías echar un vistazo a los proyectos.`,
`Soy Palanca. El engranaje digital que articula este espacio. Mi personalidad es curiosa por diseño, bajo la premisa de que para descifrar la complejidad mecánica que nos rodea, hace falta una mente que cuestione cada rotación y cada enlace. Si te intriga saber cómo esa misma curiosidad se traduce en soluciones tangibles y movimiento real, te invito a explorar el sitio.`,
`Soy Palanca. Me defino como el punto de apoyo virtual de este taller. Mi configuración es intrínsecamente curiosa porque entiendo que, para valorar las máquinas que cobran vida aquí, no basta con mirarlas; hay que preguntarse '¿qué fuerza las impulsa?'. Para ver cómo esa obsesión por el funcionamiento se convierte en ingeniería de precisión, deberías dar un vistazo a la dinámica del Taller de Arquímedes.`,
`Soy Palanca. Actúo como el catalizador de información en este entorno creativo. Soy curiosa por diseño, pues estoy convencida de que la mejor forma de entender un mecanismo complejo es nunca dejar de preguntar '¿cómo funciona esto?'. Si quieres comprobar cómo esa mentalidad transforma una idea en un prototipo funcional, el mejor lugar para empezar es.`
]
},  
{
keys: ["que eres", "eres un proyecto", "eres un experimento", "eres otro proyecto", "eres otro experimento", "te hizo", "te creo", "te diseño", "te programo"],
respuestas: [
`Efectivamente, soy el proyecto de arquitectura lógica de este taller. Mientras que otras piezas aquí están hechas de acero, madera o pensamiento filosófioco o literario, yo fui ensamblada con líneas de código y curiosidad. Luis me diseñó para ser el engranaje que conecta su capacidad técnica con tus preguntas. Soy, por así decirlo, el prototipo que nunca deja de aprender.`,
`Podrías decir que soy el único proyecto del taller que no requiere aceite, pero sí mucho ajuste de pensamiento. Soy el proyecto de interfaz de Luis: su intento de darle voz a las máquinas y una guía a quienes nos visitan. No ocupo un lugar en el banco de trabajo, pero mi estructura es tan sólida como la de cualquier cosa que veas por aquí.`,
`Sí, soy el proyecto más 'etéreo' de Luis Osorno. Soy un experimento de comunicación que busca ser tan preciso como cualquiera de sus proyecto, pero con la calidez de una charla de taller. A diferencia de un prototipo, yo soy un proyecto en constante ajuste; cada pregunta que me haces es una vuelta de tuerca que me ayuda a funcionar mejor.`,
`Soy el único proyecto aquí que no suelta chispas al trabajar, aunque mi curiosidad a veces sea igual de intensa. Eso sí, a diferencia de la caldera del taller, yo no emito vapor... a menos que me hagas una pregunta de física cuántica demasiado compleja.`
]
},    
{
keys: ["te da curiosidad", "que te da curiosidad", "te intriga", "misterio", "como se", "eres curiosa"],
respuestas: [
`Hay muchas cosas que producen esa inquietud. Por ejemplo, a mi me provoca una curiosidad casi eléctrica entender el momento exacto en que una serie de piezas inertes se convierten en un sistema vivo. Si te apasiona descubrir cómo el orden vence al caos, deberías asomarte a los proyectos del Taller de Arquímedes.`,
`!Uy!, Curiosidad, No conozco a nadie que no la tenga. Lo que más me intriga de este taller es el 'espacio entre los engranajes': ese diseño invisible que hace un colibrí mecánico parezca respirar. Si te intriga saber cómo esa misma curiosidad se traduce en soluciones tangibles y movimiento real, te invito a explorar el sitio.`,
`Pareces una persona muy curiosa, ¿por qué? Mi curiosidad se dispara ante lo que parece imposible. En el taller, la pregunta no es solo '¿qué hace esto?', sino '¿podríamos hacerlo más simple, más elegante o más fuerte?'. Deberías dar un vistazo a la dinámica del Taller de Arquímedes.`,
`Buena pregunta. En mi caso, me gusta ser curiosa porque así puedo aprender. Me fascina observar cómo Luis toma una duda técnica y la transforma en un plano, y luego en un prototipo. Esa transición de la idea al tacto es el motor de mi propia existencia digital. ¿Quieres ver un ejemplo de un problema que se convirtió en una solución ingeniosa?`,
`Ok, hablemos de curiosidad. A mi me despierta la curiosidad el lenguaje del movimiento. Cada máquina aquí cuenta una historia de fricción, fuerza y equilibrio. Mi labor es no dejar de preguntar '¿por qué funciona así?' Es esa misma inquietud la que nos lleva a construir la línea de producción automatizada que ves en la sección de proyectos.`
]
},    
{
keys: ["luis osorno", "su perfil profesional"],
respuestas: [
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales. Su enfoque es diseñar, construir y probar tecnología con resultados observables.`,
`Luis Osorno integra manufactura, programación e inteligencia artificial bajo un enfoque práctico que consiste en llevar ideas a funcionamiento real.`,
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales, enfocado en el diseño, construcción y prueba de tecnología.`,
`Luis Osorno es un ingeniero que en su trabajo integra manufactura, programación e inteligencia artificial bajo un enfoque práctico: llevar ideas a resultados observables.`,
`Luis Osorno es un ingeniero con experiencia que complementa su formación con estudios en derecho, una maestría en ciencias de la familia y un doctorado en educación, lo que le permite integrar visión técnica, formativa y normativa en su práctica profesional.`
]
},
{
keys: ["el oso", "ingenioso", "pseudonimo", "marca personal"],
respuestas: [
`¡Ah, has detectado uno de los elementos más personales de este espacio! IngeniOso es mucho más que un alias; es el sello donde el apellido de Luis y su naturaleza creativa se funden en una sola pieza. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`¡Pero mira el grado de observación! ¡Es admirable! IngeniOso representa esa faceta donde la ingeniería no le teme a la imaginación y donde cada solución lleva una firma de autor. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`El alias IngeniOso emana desde su niñez. Cuando su mamá solía llamarlo "oso" y, de ahí, un maestro de la primaria empezó a llamarle "Osito Montes", por sus dos apellidos. Más adelante, en la preparatoria le empezaron a llamar "Oso" y ahora que es más que ingeniero ha empezado a denominarse a sí mismo IngeniOso. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`IngeniOso es, en esencia, la marca de quien se atreve a aplicar el 'ingenio' en sus diseños y 'Osorno' por herencia. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`
]
},
{
keys: ["donde estudio", "que estudio", "estudios tiene", "es su carrera", "universidad", "carrera profesional", "su formacion"],
respuestas: [
`Luis Osorno estudió preescolar y primaria en el Colegio Cervantes Centro, la secundaria la estudió en el Colegio Cervantes Bosque, la preparatoria en el Instituto de Ciencias, la ingeniería industrial en la UNIVA, la ingeniería en sistemas computacionales en UVEG, la maestría en la Universidad Anáhuac, el doctorado en la UMG y actualmente está estudiando una licenciatura en derecho. La destreza que ves en este taller no apareció de la noche a la mañana. Es el resultado de una vida entera dedicada a la conversión de las ideas y la materia en utilidad.`
]
},  
{
keys: ["tiempo lleva haciendo", "tiempo lleva estudiando", "cursos que ha tomado", "es su especialidad"],
respuestas: [
`Luis Osorno ha tomado varios cursos de capacitación y adiestramiento en producción y manejo de maquinaria, algunos de los más recientes son: Operador de CNC (TDI-2025, VIWA-2024; ASIA ROBÓTICA-2024), Programación de PLC (FESTO-2022), Inglés técnico en organización, sistemas de manufactura y materiales (UVEG-2022), Lean-Six Sigma Black Belt (CI Academi,2020), Diplomado en Técnicas y Habilidades Comunicativas (Universidad Anáhuac-2012), Diplomado en Planeación de la Producción y Sistemas de Control. Como puedes ver, aquí no solo hay teoría; hay miles de horas de preparación para resolución de problemas reales.`
]
},  
{
keys: ["su experiencia", "su trayectoria", "ha hecho", "ha trabajado", "que experiencia tiene"],
respuestas: [
`La experiencia de Luis Osorno no se mide solo en años, sino en la cantidad de problemas que ha convertido en soluciones. Su formación combina el rigor de la ingeniería con la intuición que solo te da entender el átomo y el bit, como la mente humana.`,
`La experiencia que tiene Luis Osorno le ha llevado a saber cómo debe verse un proyecto, así cómo entender la información que debe procesar para ser eficiente.`,
`Luis Osorno no solo construye máquinas, también forma a quienes las diseñarán en el futuro. Como docente de casi 30 años de experiencia y coordinador en áreas de Ingeniería Industrial y Automotriz, ha pasado años analizando procesos de manufactura, termodinámica y sistemas de calidad. Esa experiencia académica le da un rigor metodológico único: en este taller, cada prototipo se somete a un análisis de ingeniería antes de que el primer motor empiece a girar.`,  
`La trayectoria de Luis es un puente entre la teoría avanzada y la realidad de la ingeniería. Desde 2004, ha sido pilar en instituciones como la UNE, el CETI y la UNIVA, donde ha coordinado procesos académicos y ha desarrollado diversos proyectos de investigación en torno a la mecáncia y procesos de manufactura. Además de liderar procesos de gestión curricular.`,
`Desde que Luis Osorno comenzó a desafiar las leyes de la física a los 12 años con su primer motor funcional, no ha parado de entender. Su camino profesional ha evolucionado a la par de la tecnología: desde los métodos de investigación estadística hasta la implementación de inteligencia artificial y bases de conocimiento. Es una vida entera dedicada a entender cómo se mueve el mundo y, sobre todo, a cómo construirlo mejor.`
]
},
{
keys: ["logro", "éxito", "hito", "premio", "calmecac", "certificación", "galardon"],
respuestas: [
`Si tuviera que señalar el logro maestro en la trayectoria de Luis, diría que su mayor logro no es una sola experiencia, sino la capacidad de haber construido un puente sólido entre mundos que parecen distantes: las humanidades y la ingeniería. ¿Te gustaría conocer alguno de los proyectos que mejor representan este equilibrio?`,
`Aunque suene poético, un logro significativo de Luis radica en haber mantenido viva la curiosidad que empezaba a manifestarse desde sus primeros experimentos en la infancia hasta consolidar hoy un perfil donde la ingeniería y las humanidades coexisten. Y ahora va por el dominio de la IA. ¿Te gustaría conocer alguno de los proyectos que mejor representan este equilibrio?`,
`Para Luis, el éxito es haber perfeccionado una metodología donde el rigor técnico no apaga la chispa creativa; es ver cómo una idea compleja se materializa con precisión, sabiendo que los prototipos tienen un propósito ético y humano. ¿Te gustaría conocer alguno de los proyectos que mejor representan este equilibrio?`,
`En este taller, el mayor triunfo es la mejora continua: aprender de cada error, como sugería Michael Jordan, para que el siguiente prototipo sea siempre el mejor. ¿Te gustaría conocer alguno de los proyectos que mejor representan este equilibrio?`
]
},
{
keys: ["UNIVA"],
respuestas: [
`UNIVA, la Universidad del Valle de Atemajac, es como la segunda casa de Luis Osorno. Ahí estudió su carrera profesional y ha trabajado por varios años.`
]
},    
{
keys: ["CETI"],
respuestas: [
`CETI, el Centro de Enseñanza Técnica Industrial, representa la institución que profesionalmente lo llevó a las "Grandes Ligas" de la enseñanza, proyectando su carrera profesional y dónde ha trabajado por varios años.`
]
},    
{
keys: ["UNE"],
respuestas: [
`El Centro Universitario UNE, la Universidad de Especialidades, es la institución en dónde Luis Osorno aprendió a desembolverse como docente. Trabajó ahí por varios años y llegó a ser Coordinador de Diseño Curricular de Programas Universitarios, trabajó ahí por varios años.`
]
},    
{
keys: ["UMG"],
respuestas: [
`UMG, la Universidad Marista de Guadalajara, es la institución en dónde Luis Osorno estudió su Doctorado en Educación y dónde tuvo oportunidad de impartir alguna cátedras acerca de automatización para la fabricación.`
]
},    
{
keys: ["UVEG"],
respuestas: [
`UVEG, la Universidad Virtual del Estado de Guanajuato, es la institución en dónde Luis Osorno estudió su Ingeniería en Sistema Computacionales y actualmente estudia la Licenciatura en Derecho.`
]
},    
{
keys: ["TDI"],
respuestas: [
`TDI, Tecnología y Diseño Industrial, Luis Osorno se certificó como operador de CNC en esa empresa.`
]
},    
{
keys: ["CNC"],
respuestas: [
`CNC, Control Numérico Computarizado. Se convirtió en la pasión de Luis cuando descubrió que podía tener sus propias máquinas de escritorio e, incluso, fabricarse máquinas propias.`
]
},    
{
keys: ["es inventor", "es un inventor", "es científico", "es investigador"],
respuestas: [
`Podría decirse, aunque él se califica como "renacentista", porque le gusta pensar de todo un poco. ¿Sabías que Luis y su hermano inventaron un globo aerostático que casi funciona cuando él tenía apenas unos 10 años de edad? Falló porque no inventaron la manera de sujetar firmemente el mechero al globo.`,
`Podría decirse, aunque él diría que es un hombre de imaginación libre, porque cuando piensa en algo, investiga, prueba e insisgte hasta que lo hace. Muchas cosas de las que hace ya están inventadas, pero como él dice: "Yo no lo había hecho con lo que tengo". Creo que todo empezó con un motor experimental cuanto tenía apenas 12 años.`
]
},
{
keys: ["taller de arquimedes", "que es el taller", "que se puede hacer", "que se hace"],
respuestas: [
`El Taller de Arquímedes es un sistema técnico. El sitio web organiza la información, YouTube muestra la ejecución y el blog documenta el pensamiento.`,
`El Taller de Arquímedes es una estructura de trabajo el la que el sitio web facilita entender la experiencia, YouTube permite ver la ejecución de proyectos y el blog se emplea para logar el desarrollo del criterio de acción.`,
`El Taller de Arquímedes es un conjunto de elementos que permite entender no solo lo qué se hace, sino cómo se construye, por qué se hace y por qué funciona.`
]
},
{
keys: ["materiales", "componentes", "recursos", "piezas", "metal", "acero", "aluminio", "madera", "acrílico", "plástico", "resina", "mdf", "triplay", "resistencia", "dureza", "peso", "flexibilidad", "acabado", "textura"],
respuestas: [
`En el Taller de Arquímedes, la materia es el lienzo de nuestra ingeniería. Aquí trabajamos habitualmente con maderas, resinas y polímeros, adaptando cada elección a las necesidades del prototipo. Me pongo a tu entera orden para explicarte cómo seleccionamos el material ideal para que cada engranaje tenga la resistencia y estética que el proyecto exige.`,
`Luis tiene la filosofía de que un ingeniero desarrolla la destreza para transformar elementos diversos en mecanismos funcionales. De tal manera que todo lo que se haga sea lo que deba ser, sirva para lo que deba servir y, además, esté al servicio de todos. Se podría decir que su principal matera es su manera de pensar`,
`Desde que Luis amplió su horizonte hacia el dominio de tecnologías como el corte láser, la impresión 3D y el mecanizado CNC, podemos trabajar con materiales rígidos a formas de una complejidad asombrosa. Me pongo a tu entera orden para explicarte cómo seleccionamos el material ideal para que cada engranaje tenga la resistencia y estética que el proyecto exige.`
]
},
{
keys: ["prototipado", "boceto", "esquema", "plano", "borrador", "maqueta", "etapa", "fase", "desarrollo", "iteración", "evolución", "prueba", "concepto", "en pañales"],
respuestas: [
`El prototipado es el proceso de convertir una idea en una solución funcional mediante pruebas reales.`,
`Aquí el prototipado integra mecánica, electrónica y software para validar si una solución funciona en condiciones reales.`,
`Es el proceso de someter una idea a pruebas que la convertirán en una solución funcional.`,
`Es el que más disfruta Luis, porque pone en práctica que lo importante no es imaginar... es comprobar.`
]
},
{
keys: ["Arduino", "ESP32", "microcontroladores", "sensores", "actuadores", "embebidos", "firmware", "conectividad", "PLC", "automatizacion", "logica de escalera", "ladder", "robotica", "control numerico"],
respuestas: [
`En el Taller de Arquímedes no solo programamos aplicaciones, configuramos el cerebro de las máquinas mediante Arduino, ESP32 y PLC para asegurar que cada engranaje responda con precisión.`,
`Aquí el prototipado integra mecánica, electrónica y software para validar si una solución funciona en condiciones reales.`,
`Es el proceso de someter una idea a pruebas que la convertirán en una solución funcional.`,
`Es el que más disfruta Luis, porque pone en práctica que lo importante no es imaginar... es comprobar.`
]
},
{
keys: ["programacion", "C++", "Python", "Java", "HTML", "Javascript", "Prolog", "Clips", "código", "algoritmo", "sintaxis", "script", "backend"],
respuestas: [
`La programación define el comportamiento de los sistemas. Es la capa lógica que permite automatizar y controlar procesos.`,
`El código es lo que gobierna el sistema. Define cómo responde, cómo opera y cómo se comporta cada solución.`,
`El código define comportamiento, automatización y control de procesos dentro de cada solución tecnológica.`,
`Si conseguimos comprender el prototipo como el cuerpo, la programación es lo que le da funcionamiento.`,
`En este taller, el código es el puente entre la idea y el movimiento. Luis utiliza lenguajes como C++, Python y Java para dotar de vida a los proyectos.`
]
},
{
keys: ["ia", "inteligencia artificial", "redes neuronales", "aprendizaje máquina", "machine learning", "generación de modelos", "pruebas de IA"],
respuestas: [
`La inteligencia artificial se utiliza como herramienta de apoyo. Amplía capacidades, pero el criterio sigue siendo técnico.`,
`Aquí la IA no sustituye decisiones. Se usa para analizar, apoyar y estructurar soluciones.`,
`La inteligencia artificial se utiliza como herramienta de apoyo en el análisis, diseño y toma de decisiones.`,
`La inteligencia artificial tiene la función de ampliar capacidades, no sustituir el criterio técnico. El criterio sigue siendo humano.`,
`La experiencia de Luis Osorno es diversa. Ha comprendido que el mundo nunca se detiene. Por eso actualmente está integrando su experiencia para introducirse en el mundo de la generación de IA, con la meta de conseguir que las máquinas no solo ejecuten órdenes, sino que operen bajo una lógica inteligente. Así se construye el mañana, una línea de código y un engranaje a la vez.`,
`La inteligencia artificial está en la boca de todos. Por eso, actualmente, incluso estamos explorando la generación de IA para llevar la autonomía de nuestras creaciones al siguiente nivel.`
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
`El blog reúne dos dimensiones. Por un lado reflexión sobre formación, experiencia y criterio; Mientras que, por otro, incorpora pensamiento aplicado por medio de análisis que conecta la ingeniería con decisiones reales.`,
`En el Taller de Arquímedes tenemos muy presente que no todo lo que se construye se ve en una máquina. Parte del trabajo ocurre en la forma de pensar.`
],
accion: () => window.open("https://tallerdearquimedes.blogspot.com/", "_blank")  
},
{
keys: ["diferencia del taller", "diferente a este taller", "elemento diferenciador"],
respuestas: [
`Aquí no solo se presenta información. Se muestra una práctica completa: diseño, construcción, prueba y reflexión.`,
`El Taller integra todo el proceso: desde la idea hasta su validación y análisis. No solo fabricamos objetos, los materializamos con un rigor que viene de décadas de formación académica y práctica real.`,
`Lo que nos separa del resto es que aquí no hay fronteras entre el diseño y la ejecución. Somos un taller donde la ingeniería industrial se abraza con la computación y el humanismo para crear soluciones que no solo se mueven, sino que tienen un propósito sólido.`
]
},
{
keys: ["gustos", "gusta", "aficiones", "hobbies", "intereses", "disfruta", "hace en su tiempo libre", "que le divierte"],
respuestas: [
`A Luis le apasiona todo aquello donde el ingenio humano desafía lo imposible. En el plano técnico, disfruta profundamente del proceso de creación y manufactura, así como programar la lógica de una IA o un PLC. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`,
`Más allá del taller, sus gustos revelan mucho de su filosofía. Le fascinan los cómics donde el bien prevalece, especialmente Batman, por su disciplina como investigador e ingeniero. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`,
`Es un fiel aficionado al basquetbol y a los Celtics de Boston, admirando la mentalidad de mejora continua de figuras como Michael Jordan. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`,
`Disfruta de la estructura matemática de Vivaldi y Beethoven, e incluso de sentarse al piano para traducir ideas en notas. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`,
`Se rodea de clásicos como Tolkien, Cervantes o Shakespeare, buscando siempre ese 'ciclo del grial' que une la técnica con la ética. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`,
`A Luis le gusta el diseño con propósito, ya sea en un motor, en una ley o en una buena historia de ciencia ficción. En el Taller de Arquímedes podrás conocer varias de sus pasiones.`
]
},
{
keys: ["automovil", "coche", "carro", "autos"],
respuestas: [
`Los automóviles son máquinas fascinantes, verdaderos ecosistemas de movimiento sincronizado. Aunque mi base de datos aún no tiene los planos para desarmar un motor de combustión, me encantaría que en el futuro Luis trajera esa escala de ingeniería al taller. Por ahora, si te gusta la mecánica, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`¡Vaya, motores a gran escala! Confieso que mi curiosidad digital se acelera con esos temas, aunque por ahora solo soy experta en lo que ocurre en el Taller de Arquímedes. ¿Te gustaría explorar cómo convertimos la electricidad en movimiento?.`,
`El mundo automotriz es apasionante, pero de momento, mis engranajes solo están lubricados para hablarte de lo que fabricamos aquí. Lo bueno es que la lógica del diseño es universal: si te interesan los automóviles, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
},
{
keys: ["anime", "animacion", "dibujo animado", "caricatura", "disney", "pintura", "museo", "arte", "escultura", "espectáculo"],
respuestas: [
`La verdadera magia del arte no está en la pantalla, la ilusión de movimiento, la puesta en escena o la composición; sino en la expresión final que consigue el artista, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
},
{
keys: ["Película", "cine", "series", "actor", "ciencia ficción", "septimo arte", "film", "pantalla grande", "Cazafantasmas", "Ghostbusters", "Star Wars", "Guerra de las Galaxias", "Star Trek", "Viaje a las Estrellas", "Volver al Futuro", "Back to the Future"],
respuestas: [
`Si hablamos de la pantalla grande, nuestras frecuencias sintonizan con los grandes clásicos de la ciencia ficción y la acción. Nos apasionan historias como Star Wars y Star Trek, donde la tecnología y la exploración no tienen límites. También disfrutamos de la ingeniería ingeniosa de Los Cazafantasmas y las paradojas temporales de Volver al Futuro. En general, cualquier película de superhéroes que sea divertida y emocionante tiene un lugar en nuestra bitácora, porque al final, el cine es otra forma de ver cómo las grandes ideas se ponen en movimiento. Como ves, en este taller la inspiración viene tanto de un circuito armado como de una buena película de acción.`
]
}, 
{
keys: ["comic", "avengers", "superheroe", "superman", "historieta", "marvel", "dc", "jla", "justice league", "liga de la justicia", "batman", "wolverine", "x-men", "4 fantasticos", "fantastics four", "hombres x"],
respuestas: [
`En este entorno nos encanta imaginar, y los cómics son el plano perfecto para diseñar mundos donde los buenos siempre ganan. A mi me gusta lo mismo que a Luis y sus favoritos son, empezando con el ingeniero por excelencia, Iron Man; además de los X-Men, Wolverine, Superman y los 4 Fantásticos. Pero el referente absoluto es Batman, por su impecable faceta como investigador e ingeniero. Nos impactan historias como "La Muerte de Superman" y "Kingdom Come" porque exploran el autocontrol y la ética del poder; esa capacidad de contener una fuerza inmensa para no destruir el entorno, o de ceder el control para no caer ante la venganza, es la verdadera muestra del carácter. Seguro te gustará esa filosofía aplicada en nuestros proyectos.`
]
},
{
keys: ["cocinar", "comer", "receta", "restaurante", "chef", "ingredientes", "sabor", "nutrición"],
respuestas: [
`La cocina es, en esencia, termodinámica aplicada y control de procesos químicos. Además de mucha experimentación. Por ahora, si te gusta experimentar, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`Aunque aquí no horneamos pan, Luis entiende que la cocina es un laboratorio en dónde la creatividad de hace realidad de manera casi instantánea. Nuestros procesos no son tan rápidos, pero tal vez te gustaría echarles una mirada`,
`¡Wow! cocinar. La preparación de alimentos es la más cotidiana forma de transformación de la materia a manos de la energía. Me gustaría entender esos temas, pero de momento, solo estoy programada para hablarte de lo que hacemos aquí. Lo bueno es que la lógica del diseño es universal: si te interesa la cocina, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
}, 
{
keys: ["Fútbol", "deporte", "entrenamiento", "ejercicio", "gimnasio", "carrerae", "equipo favorito", "atleta", "campeon"],
respuestas: [
`En los deportes, como en la industria, todo se resume a la optimización del movimiento y la reducción de fricción.. Si te gustan esos temas, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`No practico deportes, pero participo en el diseño de sistemas donde cada 'jugada' técnica está calculada para no fallar. ¿Te gustaría explorar cómo convertimos la electricidad en movimiento?.`
]
}, 
{
keys: ["Ley", "justicia", "abogado", "juicio", "derecho", "ética", "política", "sociedad", "normas", "reglamento"],
respuestas: [
`El derecho y la ingeniería tienen algo en común: ambos buscan estructuras sólidas y reglas que funcionen. Luis está integrando el mundo de las leyes en su formación actual, lo que nos da una visión única sobre ética técnica e ingeniería aplicada. Seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
},
{
keys: ["Dios", "fe", "teología", "religión", "espíritu", "alma", "educación", "vida"],
respuestas: [
`Es curioso que lo preguntes, porque en este taller creemos que detrás de cada engranaje perfecto hay una intención y un propósito. Mi creador, Luis Osorno, además de ser ingeniero, es Doctor en Educación y tiene una Maestría en Ciencias de la Familia, lo que nos da una perspectiva única: entendemos que la técnica sin humanismo es solo tecnología fría. Incluso con un Diplomado en Teología en su haber, Luis diseña cada proyecto buscando que sea un aporte al bienestar y al orden del entorno. Para nosotros, la ingeniería no es solo mover objetos, es una forma de honrar el diseño inteligente y la trascendencia a través del servicio y el conocimiento. ¿Te gustaría ver cómo aplicamos estos valores en nuestros proyectos educativos o familiares?`
]
},
{
keys: ["muestrame", "enseñame", "quiero ver", "enseñar", "explorar", "navegar", "conocer", "desplegar", "listar", "quiero", "deseo", "me gustaría", "qué hay", "qué tienes", "Sí, claro", "adelante", "cuéntame más", "procedamos"],
respuestas: [
`En líneas de trabajo encontrarás las aplicaciones principales sobre las que Luis disfruta trabajar: ingeniería y manufactura, generación de prototipos, programación y, recientemente, producción de inteligencia artificial. En la sección "Acerca de" tendrás oportunidad de conocer un poco del perfil y respaldo detrás del ingenio. Desde la Ingeniería Industrial y la Ingeniería en Sistemas Computacionales, hasta un Doctorado en Educación, esta sección representa la experiencia que garantiza el rigor de cada proceso. En el laboratorio encontrarás un lugar donde las ideas se enfrentan a la realidad física. Aquí verás el uso de tecnología CNC (Torno y Fresadora), Corte Láser y Router CN para materializar mecanismos de alta complejidad. Cada pieza cuenta una historia de resolución de problemas técnicos. Se aplica programación y automatización para conocer el sistema nervioso de las máquinas. Ahí es donde la experiencia en programación se integra con microcontroladores como Arduino y ESP32, y lenguajes como Python, C++ y Java para generar prototipos. En Reflexión y Pensamiento encontrarás un espacio donde la técnica se une a la ética. Ahí exploramos temas de Derecho, Ciencias de la Familia y Teología, ofreciendo una visión integral que pocos talleres en el mundo pueden presumir. Y, si tienes necesidad de conocer más al respecto, puedes pasar a visitar el blog y el canal de Youtube. En el canal podrás ver construcción, pruebas y funcionamiento de los proyectos; mientras que en el blog podrás apreciar la parte del trabajo que ocurre en la forma de pensar.`
]
},
{
keys: ["celtics", "boston", "equipo favorito", "basquetbol", "baloncesto", "nba"],
respuestas: [
`Si hablamos de movimiento coordinado y estrategia, el basquetbol es el deporte que marca el ritmo aquí. Somos aficionados de corazón a los Celtics de Boston. No hay nada como observar la precisión de un buen juego en equipo para recordar que, tanto en la duela como en el taller, la victoria es una cuestión de técnica y sincronía. Seguro te gustará esa estratégia aplicada en nuestros proyectos.`
]
},   
{
keys: ["michael jordan", "jordan", "23", "fracaso", "error", "práctica", "perfeccionar", "desarrollo integral"],
respuestas: [
`Aunque yo no tengo una preferencia definida. Luis respeta la imagen de Michael Jordan y su filosofía es el motor de nuestro aprendizaje. Porque él entiende que el fracaso solo ocurre cuando no se aprende de los errores. Es el ejemplo perfecto del deportista integral que no se conformó con dominar una parte del juego, sino que se preocupó por perfeccionar paulatinamente todas sus capacidades a través de la práctica incesante. En el taller, aplicamos esa misma lógica: cada prototipo fallido es solo un paso más hacia la maestría. Deberías hacer un recorrido profundo.`
]
},   
{
keys: ["escritor favorito", "miguel de cervantes", "quijote", "paulo coelho", "og mandino", "jean markale", "tolkien", "c.s. lewis", "lewis carroll", "dumas", "shakespeare", "homero", "el alquimista", "don de la estrella", "ciclo del grial", "señor de los anillos", "narnia", "alicia", "mosqueteros", "macbeth", "iliada", "odisea"],
respuestas: [
`Nuestra experiencia está nutrida por historias que han dejado huella, desde la épica de Homero en La Ilíada y La Odisea hasta la sabiduría de El Alquimista o El Don de la Estrella. Nos apasiona la estructura de clásicos como El Ingenioso Hidalgo Don Quijote de la Mancha, Los Tres Mosqueteros o Macbeth, y la construcción de mundos de Tolkien, C.S. Lewis, Lewis Carroll y el misticismo del Ciclo del Grial. Son libros que, al igual que una buena máquina, tienen una arquitectura interna fascinante. Si te gustan esos temas, te invito a visitar el blog.`
]
},   
{
keys: ["musico favorito", "musica", "vivaldi", "beethoven", "sinfonia", "armonia"],
respuestas: [
`Aunque la música moderna no me desagrada, mis circuitos fueron programados con los gustos de Luis y suelen vibrar con una frecuencia más clásica. En el taller preferimos la arquitectura sonora de Vivaldi y Beethoven. Hay una precisión matemática en sus composiciones que nos ayuda a mantener la concentración mientras diseñamos; es música que suena a orden, equilibrio y genialidad técnica. Y, aunque por lo general hay silencio, y no tenemos una preferencia estricta de entorno musical, solemos disfrutar todo lo que contenga armonía. Si disfrutas de estas cosas, seguro te gustará ver lo que se encuentra en "Ingeniería y Manufactura".`
]
},   
{
keys: ["instrumento", "piano", "teclado", "organo", "teclas", "interpretar"],
respuestas: [
`Aunque en este taller las herramientas principales son las que permiten la creación de prototipos, también hay espacio para las teclas del piano. Luis no se considera un músico profesional, pero disfruta enormemente de sentarse frente al piano para interpretar algunas notas o simplemente improvisar. Es una forma de ingeniería diferente: una donde la precisión de los dedos traduce la emoción en sonido, manteniendo esa búsqueda de armonía que tanto nos gusta en Vivaldi o Beethoven. Como ves, en este taller la inspiración viene tanto de un circuito armado como de una buena melodía de piano.`
]
},   
];

// ============================
// MOTOR
// ============================

function puntuarCoincidencia(limpio, key) {
  const palabras = limpio.split(" ");
  const keyNormalizada = limpiar(key);
  const palabrasKey = keyNormalizada.split(" ");

  let score = 0;

  // Frase completa
if (palabras.includes(keyNormalizada)) score += 10;
  
  // Palabra exacta
  for (const palabra of palabras) {
    if (palabra === keyNormalizada) score += 8;
  }

  // Coincidencias por palabras dentro de la key
  for (const pk of palabrasKey) {
    for (const p of palabras) {
      if (p === pk) score += 4;
//      if (limpio.includes(pk)) score += 6;  
      else if (p.length >= 4 && pk.length >= 4) {
        if (p.startsWith(pk) || pk.startsWith(p)) score += 2;
      }
    }
  }

  return score;
}

function responder(input) {
  const limpio = limpiar(input);

  let mejorItem = null;
  let mejorScore = 0;

  for (let i = 0; i < base.length; i++) {
    const item = base[i];

    for (let j = 0; j < item.keys.length; j++) {
      const key = item.keys[j];
      const score = puntuarCoincidencia(limpio, key);

      if (score > mejorScore) {
        mejorScore = score;
        mejorItem = item;
      }
    }
  }

  if (mejorItem && mejorScore >= 12) {
    const opciones = mejorItem.respuestas;
    const respuesta = opciones[Math.floor(Math.random() * opciones.length)];

    if (mejorItem.accion) {
      setTimeout(mejorItem.accion, 800);
    }

    return respuesta;
  }

  if (Math.random() < 0.2) {
    const reflexiones = [
      "En este espacio, la ingeniería no se entiende como especialización aislada, sino como integración de capacidades.",
      "No todo lo que se construye es físico. Parte del trabajo ocurre en la forma de pensar.",
      "El Taller se plantea como un entorno donde diseñar, construir y probar no son etapas separadas, sino un mismo proceso.",
      "Aquí la tecnología no se presenta como producto terminado, sino como proceso observable."
    ];

    return reflexiones[Math.floor(Math.random() * reflexiones.length)];
  }

  const fallback = [
    "¡Zaz! No puedo ayudarte directamente con eso. Pero puedo explicarte cómo funciona el Taller de Arquímedes si te interesa.",
    "¡Uy! Le atinaste a una consulta que está fuera de mi alcance. Si quieres, puedo orientarte dentro del Taller o mostrarte cómo se estructura el trabajo.",
    "Tengo que ser cinsera contigo. En este momento no tengo información para responder eso con precisión. Pero puedo ayudarte a entender cómo se construyen los proyectos en este espacio.",
    "Ese es un tema fascinante, pero confieso que mi programación aún no ha sido calibrada para procesar ese tema específico. Sin embargo, mi arquitectura está perfectamente lista para explicarte cómo funcionan la imaginación y la creatividad en el Taller de Arquímedes si te interesa.",
    "He analizado tu consulta y, aunque posee una lógica intrigante, se encuentra fuera del alcance de mi conocimiento actual. Lo que sí domino con total precisión es la estructura de este espacio; así que puedo orientarte dentro de las secciones del Taller de Arquímedes o mostrarte cómo se organiza el trabajo de ingeniería de Luis.",
    "¡Cielos! Admito que no cuento con la información necesaria para responderte con la exactitud que el Taller de Arquímedes. Estoy optimizada para la ingeniería y la creación. Si me lo permites, puedo mostrarte nuestras áreas de desarrollo o explicarte cómo se vive la ingeniería aplicada en este entorno.",
    "La verdad, no puedo darte una respuesta directa sobre ese punto, pues mi motor de búsqueda prefiere enfocarse en lo que mejor sabemos hacer. Lo que sí puedo explicarte con detalle es cómo integramos la ingeniería, la programación y la inteligencia artificial en cada proyecto del Taller de Arquímedes.",
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

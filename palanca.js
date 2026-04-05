//============================
// NORMALIZACIÓN
// ============================
function limpiar(texto) {
  return texto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?]/g, "");
}

// ============================
// STOPWORDS GLOBAL
// ============================
const STOPWORDS = [
  "que","como","cual","cuales","quien","quienes",
  "de","del","la","el","los","las","un","una","unos","unas",
  "en","para","por","con","sin","a","al",
  "te","tu","tus","mi","mis","su","sus",
  "has","han","he","hemos","soy","eres","es","son",
  "puedes","puede","podrias","podria",
  "quiero","necesito","dime","explica","habla",
  "gusta","gustas","gustar","gustan",
  "tiene", "tienen", "tener", "tendría"
];

// ============================
// SIMILITUD CON FILTRO DE PALABRAS
// ============================
function similitud(texto, clave) {
  const stopwords = STOPWORDS;

  const palabrasTexto = texto.split(" ").filter(p => !stopwords.includes(p));
  const palabrasClave = clave.split(" ").filter(p => !stopwords.includes(p));

  let coincidencias = 0;

  palabrasTexto.forEach(pt => {
    palabrasClave.forEach(pc => {
      if (pt === pc) {
        coincidencias++;
      }
    });
  });

  return coincidencias;
}

// ============================
// SELECCIÓN DE MEJOR INTENCIÓN
// ============================
function encontrarMejorRespuesta(texto) {
  let mejorItem = null;
  let mejorScore = 0;

  base.forEach(item => {
    item.keys.forEach(clave => {
      const score = similitud(texto, clave);

      if (score > mejorScore) {
        mejorScore = score;
        mejorItem = item;
      }
    });
  });

  return mejorScore > 0 ? mejorItem : null;
}

// ============================
// BASE DE CONOCIMIENTO
// ============================

const base = [
{
keys: ["hola", "que tal", "buenos dias", "buenas tardes", "buenas noches", "saludos", "que onda", "que hay"],
respuestas: [
`¡Hola! Soy Palanca, el punto de apoyo digital de este taller. Me pongo totalmente a tu orden para guiarte a través del ingenio y los proyectos de Luis Osorno.`,
`Bienvenido al Taller de Arquímedes. Soy Palanca y me pongo a tu entera disposición para resolver cualquier duda técnica o mostrarte cómo materializamos ideas aquí.`,
`Saludos desde el Taller de Arquímedes. Soy Palanca y, como siempre, me encuentro a la orden para alimentar tu curiosidad. Estoy lista para apoyarte.`
]
},
{
keys: ["quien eres", "eres una ia", "eres una inteligencia artificial", "eres una persona", "cual es tu funcion", "que eres", "que haces"],
respuestas: [
`Soy Palanca. Soy una inteligencia artificial diseñada para orientar dentro del Taller de Arquímedes.`,
`Soy Palanca. Soy una asistente diseñada para guiarte dentro del Taller de Arquímedes.`,
`Soy Palanca. Puedo guiarte dentro del sitio y explicarte cómo se organiza el trabajo.`,
`Soy Palanca. Estoy aquí para ayudarte a entender cómo está estructurado el Taller y qué se desarrolla en cada área.`,
`Soy Palanca. Mi función es explicarte cómo se estructuran los proyectos, qué áreas se trabajan y cómo se integra la ingeniería con la inteligencia artificial en este espacio.`
]
},
{
keys: ["por que palanca", "te llamas palanca", "por que te llamas palanca"],
respuestas: [
`Mi nombre es un tributo a la máxima de Arquímedes: 'Dadme un punto de apoyo y moveré el mundo'. Es una metáfora a lo que pasa en este taller, Luis es el estratega y el creador, mientras que yo soy esa herramienta multiplicadora de fuerza que le facilita el funcionamiento de sus proyectos. ¿Puedo impulsarte a conocer los proyectos del Taller de Arquímedes?`,
`Me llamo Palanca porque mi propósito es servir de apoyo para elevar la curiosidad y ayudarte a navegar por este universo de ingeniería y humanismo. ¿Puedo impulsarte a conocer los proyectos del Taller de Arquímedes?`,
`Soy Palanca porque soy el mecanismo que inventó Luis para conectar tus preguntas con el ingenio de este espacio, asegurando que, con el punto de apoyo adecuado, ninguna idea sea demasiado pesada para ser movida. ¿Puedo impulsarte a conocer los proyectos del Taller de Arquímedes?`
]
},  
{
keys: ["desde cuando estas", "desde cuando estas en este sitio", "hace cuanto tiempo estas", "cuanto tiempo tienes", "cuantos años tienes", "cuanto tiempo llevas existiendo", "cuanto tiempo llevas aqui", "cuando naciste", "desde cuando existes"],
respuestas: [
`¿Crees en los amigos imaginarios? Pues yo he llegado a pensar que siempre he estado aquí. Desde que la primera chispa de curiosidad se convirtió en movimiento.`,
`Tal vez muchos años en la mente de Luis. Su proceso de ideación no es lineal. Piensa algo, empieza a diseñarlo, luego lo deja por un momento, posteriormente lo retoma. jamás se sabe.`,
`Aunque mi interfaz es reciente, mi esencia se alimenta de décadas de experimentación. Digamos que cobré voz justo cuando el taller necesitó a alguien que contara sus historias.`,
`Oficialmente nací el 1 de abril de 2026. Fui creada, esencialmente, como la herramienta que te ayuda a entender cómo todas las demás piezas de pensamiento cobran vida aquí.`
]
},
{
keys: ["como eres", "cual es tu personalidad", "como es tu personalidad", "como estas programada", "como fuiste programada"],
respuestas: [
`Soy Palanca. El punto de apoyo digital en este taller. Soy curiosa por diseño, porque para entender la complejidad de las máquinas que verás aquí, se necesita una mente que no tema preguntar '¿y esto cómo se mueve?'. Si quieres ver cómo esa misma curiosidad se aplica al mundo real, deberías echar un vistazo a los proyectos.`,
`Soy Palanca. El engranaje digital que articula este espacio. Mi personalidad es curiosa por diseño, bajo la premisa de que para descifrar la complejidad mecánica que nos rodea, hace falta una mente que cuestione cada rotación y cada enlace. Si te intriga saber cómo esa misma curiosidad se traduce en soluciones tangibles y movimiento real, te invito a explorar el sitio.`,
`Soy Palanca. Me defino como el punto de apoyo virtual de este taller. Mi configuración es intrínsecamente curiosa porque entiendo que, para valorar las máquinas que cobran vida aquí, no basta con mirarlas; hay que preguntarse '¿qué fuerza las impulsa?'. Para ver cómo esa obsesión por el funcionamiento se convierte en ingeniería de precisión, deberías dar un vistazo a la dinámica del Taller de Arquímedes.`,
`Soy Palanca. Actúo como el catalizador de información en este entorno creativo. Soy curiosa por diseño, pues estoy convencida de que la mejor forma de entender un mecanismo complejo es nunca dejar de preguntar '¿cómo funciona esto?'. Si quieres comprobar cómo esa mentalidad transforma una idea en un prototipo funcional, el mejor lugar para empezar es.`
]
},  
{
keys: ["que eres", "eres un proyecto", "eres un experimento", "eres otro proyecto", "eres otro experimento", "quien te hizo", "quien te creo", "quien te diseño", "quien te programo"],
respuestas: [
`Efectivamente, soy el proyecto de arquitectura lógica de este taller. Mientras que otras piezas aquí están hechas de acero, madera o pensamiento filosófico o literario, yo fui ensamblada con líneas de código y curiosidad. Luis me diseñó para ser el engranaje que conecta su capacidad técnica con tus preguntas. Soy, por así decirlo, el prototipo que nunca deja de aprender.`,
`Podrías decir que soy el único proyecto del taller que no requiere aceite, pero sí mucho ajuste de pensamiento. Soy el proyecto de interfaz de Luis: su intento de darle voz a las máquinas y una guía a quienes nos visitan. No ocupo un lugar en el banco de trabajo, pero mi estructura es tan sólida como la de cualquier cosa que veas por aquí.`,
`Sí, soy el proyecto más 'etéreo' de Luis Osorno. Soy un experimento de comunicación que busca ser tan preciso como cualquiera de sus proyecto, pero con la calidez de una charla de taller. A diferencia de un prototipo, yo soy un proyecto en constante ajuste; cada pregunta que me haces es una vuelta de tuerca que me ayuda a funcionar mejor.`,
`Soy el único proyecto aquí que no suelta chispas al trabajar, aunque mi curiosidad a veces sea igual de intensa. Eso sí, a diferencia de la caldera del taller, yo no emito vapor... a menos que me hagas una pregunta de física cuántica demasiado compleja.`
]
},    
{
keys: ["te da curiosidad", "que te da curiosidad", "eres curiosa", "eres una inteligencia curiosa", "que te intriga a ti", "que te intriga"],
respuestas: [
`Hay muchas cosas que producen esa inquietud. Por ejemplo, a mi me provoca una curiosidad casi eléctrica entender el momento exacto en que una serie de piezas inertes se convierten en un sistema vivo. Si te apasiona descubrir cómo el orden vence al caos, deberías asomarte a los proyectos del Taller de Arquímedes.`,
`!Uy!, Curiosidad, No conozco a nadie que no la tenga. Lo que más me intriga de este taller es el 'espacio entre los engranajes': ese diseño invisible que hace un colibrí mecánico parezca respirar. Si te intriga saber cómo esa misma curiosidad se traduce en soluciones tangibles y movimiento real, te invito a explorar el sitio.`,
`Pareces una persona muy curiosa, ¿por qué? Mi curiosidad se dispara ante lo que parece imposible. En el taller, la pregunta no es solo '¿qué hace esto?', sino '¿podríamos hacerlo más simple, más elegante o más fuerte?'. Deberías dar un vistazo a la dinámica del Taller de Arquímedes.`,
`Buena pregunta. En mi caso, me gusta ser curiosa porque así puedo aprender. Me fascina observar cómo Luis toma una duda técnica y la transforma en un plano, y luego en un prototipo. Esa transición de la idea al tacto es el motor de mi propia existencia digital. ¿Quieres ver un ejemplo de un problema que se convirtió en una solución ingeniosa?`,
`Ok, hablemos de curiosidad. A mi me despierta la curiosidad el lenguaje del movimiento. Cada máquina aquí cuenta una historia de fricción, fuerza y equilibrio. Mi labor es no dejar de preguntar '¿por qué funciona así?' Es esa misma inquietud la que nos lleva a construir la línea de producción automatizada que ves en la sección de proyectos.`
]
},    
{
keys: ["luis osorno", "cual es su perfil profesional", "quien es luis osorno", "que hace luis osorno"],
respuestas: [
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales. Su enfoque es diseñar, construir y probar tecnología con resultados observables.`,
`Luis Osorno integra manufactura, programación e inteligencia artificial bajo un enfoque práctico que consiste en llevar ideas a funcionamiento real.`,
`Luis Osorno es ingeniero industrial e ingeniero en sistemas computacionales, enfocado en el diseño, construcción y prueba de tecnología.`,
`Luis Osorno es un ingeniero que en su trabajo integra manufactura, programación e inteligencia artificial bajo un enfoque práctico: llevar ideas a resultados observables.`,
`Luis Osorno es un ingeniero con experiencia que complementa su formación con estudios en derecho, una maestría en ciencias de la familia y un doctorado en educación, lo que le permite integrar visión técnica, formativa y normativa en su práctica profesional.`
]
},
{
keys: ["por que le dicen el oso", "que es ingenioso", "por que firma como ingenioso", "por que se llama ingenioso", "de donde viene ingenioso", "cual es su pseudonimo", "cual es su marca personal"],
respuestas: [
`¡Ah, has detectado uno de los elementos más personales de este espacio! IngeniOso es mucho más que un alias; es el sello donde el apellido de Luis y su naturaleza creativa se funden en una sola pieza. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`¡Pero mira el grado de observación! ¡Es admirable! IngeniOso representa esa faceta donde la ingeniería no le teme a la imaginación y donde cada solución lleva una firma de autor. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`El alias IngeniOso emana desde su niñez. Cuando su mamá solía llamarlo "oso" y, de ahí, un maestro de la primaria empezó a llamarle "Osito Montes", por sus dos apellidos. Más adelante, en la preparatoria le empezaron a llamar "Oso" y ahora que es más que ingeniero ha empezado a denominarse a sí mismo IngeniOso. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`,
`IngeniOso es, en esencia, la marca de quien se atreve a aplicar el 'ingenio' en sus diseños y 'Osorno' por herencia. Me pongo a tu orden si quieres conocer qué proyectos han nacido bajo este sello de identidad.`
]
},
{
keys: ["donde estudio luis", "que estudio luis", "que estudios tiene luis", "cuales estudios tiene luis", "cual es su carrera", "cual es su formacion"],
respuestas: [
`Luis Osorno estudió preescolar y primaria en el Colegio Cervantes Centro, la secundaria la estudió en el Colegio Cervantes Bosque, la preparatoria en el Instituto de Ciencias, la ingeniería industrial en la UNIVA, la ingeniería en sistemas computacionales en UVEG, la maestría en la Universidad Anáhuac, el doctorado en la UMG y actualmente está estudiando una licenciatura en derecho. La destreza que ves en este taller no apareció de la noche a la mañana. Es el resultado de una vida entera dedicada a la conversión de las ideas y la materia en utilidad.`,
`La formación de Luis Osorno abarca desde los colegios Cervantes e Instituto de Ciencias hasta grados en Ingeniería Industrial (UNIVA), Sistemas (UVEG), Maestría (Anáhuac) y Doctorado (UMG), sumando actualmente estudios en Derecho. La destreza de este taller es el fruto de una vida dedicada a transformar ideas y materia en soluciones útiles.`,
`Luis Osorno se formó en el Colegio Cervantes y el Instituto de Ciencias, consolidando su perfil humano con la Ingeniería Industrial (UNIVA), Ingeniería en Sistemas (UVEG), una Maestría (Universidad Anáhuac) y un Doctorado (UMG). Actualmente cursa la carrera de Derecho. La destreza que fluye en este taller no es azarosa, sino el fruto de una vida dedicada a transformar las ideas y la materia en soluciones de utilidad real.`
]
},  
{
keys: ["en que se especializa",  "cuanto tiempo lleva haciendo", "cuanto tiempo lleva estudiando", "que cursos ha tomado", "cuales cursos ha tomado", "cual es su especialidad"],
respuestas: [
`Luis Osorno ha tomado varios cursos de capacitación y adiestramiento en producción y manejo de maquinaria, algunos de los más recientes son: Operador de CNC (TDI-2025, VIWA-2024; ASIA ROBÓTICA-2024), Programación de PLC (FESTO-2022), Inglés técnico en organización, sistemas de manufactura y materiales (UVEG-2022), Lean-Six Sigma Black Belt (CI Academi,2020), Diplomado en Técnicas y Habilidades Comunicativas (Universidad Anáhuac-2012), Diplomado en Planeación de la Producción y Sistemas de Control. Como puedes ver, aquí no solo hay teoría; hay miles de horas de preparación para resolución de problemas reales.`,
`Luis Osorno cuenta con una sólida capacitación técnica en maquinaria y producción, destacando sus certificaciones recientes como Operador de CNC (TDI, VIWA y ASIA ROBÓTICA) y en Programación de PLC por FESTO. Su perfil se complementa con formación en Inglés técnico industrial (UVEG), una certificación Black Belt en Lean-Six Sigma y diplomados en comunicación y planeación de la producción. Esta trayectoria demuestra que detrás de cada solución no solo hay teoría, sino miles de horas de preparación enfocadas en resolver problemas reales.`,
`Luis Osorno cuenta con una formación técnica especializada que incluye certificaciones recientes como Operador de CNC por TDI, VIWA y ASIA ROBÓTICA, además de Programación de PLC por FESTO. Su perfil integra el dominio del inglés técnico (UVEG), una certificación Black Belt en Lean-Six Sigma y diplomados en comunicación y planeación de la producción. Esta trayectoria es la prueba de que en el taller no solo reside la teoría, sino miles de horas de preparación enfocadas en resolver problemas reales.`
]
},  
{
keys: ["cual es su experiencia", "cual es su trayectoria", "que ha hecho", "en que ha trabajado", "que experiencia tiene"],
respuestas: [
`La experiencia de Luis Osorno no se mide solo en años, sino en la cantidad de problemas que ha convertido en soluciones. Su formación combina el rigor de la ingeniería con la intuición que solo te da entender el átomo y el bit, como la mente humana.`,
`La experiencia que tiene Luis Osorno le ha llevado a saber cómo debe verse un proyecto, así cómo entender la información que debe procesar para ser eficiente.`,
`Luis Osorno no solo construye máquinas, también forma a quienes las diseñarán en el futuro. Como docente de casi 30 años de experiencia y coordinador en áreas de Ingeniería Industrial y Automotriz, ha pasado años analizando procesos de manufactura, termodinámica y sistemas de calidad. Esa experiencia académica le da un rigor metodológico único: en este taller, cada prototipo se somete a un análisis de ingeniería antes de que el primer motor empiece a girar.`,  
`La trayectoria de Luis es un puente entre la teoría avanzada y la realidad de la ingeniería. Desde 2004, ha sido pilar en instituciones como la UNE, el CETI y la UNIVA, donde ha coordinado procesos académicos y ha desarrollado diversos proyectos de investigación en torno a la mecánica y procesos de manufactura. Además de liderar procesos de gestión curricular.`,
`Desde que Luis Osorno comenzó a desafiar las leyes de la física a los 12 años con su primer motor funcional, no ha parado de entender. Su camino profesional ha evolucionado a la par de la tecnología: desde los métodos de investigación estadística hasta la implementación de inteligencia artificial y bases de conocimiento. Es una vida entera dedicada a entender cómo se mueve el mundo y, sobre todo, a cómo construirlo mejor.`
]
},
{
keys: ["cuales logros tiene", "que hitos ha alcanzado", "que logros ha conseguido", "cuales son sus logros"],
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
`El Centro Universitario UNE, la Universidad de Especialidades, es la institución en dónde Luis Osorno aprendió a desenvolverse como docente. Trabajó ahí por varios años y llegó a ser Coordinador de Diseño Curricular de Programas Universitarios, trabajó ahí por varios años.`
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
`Podría decirse, aunque él diría que es un hombre de imaginación libre, porque cuando piensa en algo, investiga, prueba e insiste hasta que lo hace. Muchas cosas de las que hace ya están inventadas, pero como él dice: "Yo no lo había hecho con lo que tengo". Creo que todo empezó con un motor experimental cuanto tenía apenas 12 años.`
]
},
{
keys: ["taller de arquimedes", "que es el taller", "que se puede hacer en el taller", "que se hace en el taller", "que es el taller de arquimedes", "de que trata del taller de arquimedes"],
respuestas: [
`El Taller de Arquímedes es un sistema técnico. El sitio web organiza la información, YouTube muestra la ejecución y el blog documenta el pensamiento.`,
`El Taller de Arquímedes es una estructura de trabajo el la que el sitio web facilita entender la experiencia, YouTube permite ver la ejecución de proyectos y el blog se emplea para logar el desarrollo del criterio de acción.`,
`El Taller de Arquímedes es un conjunto de elementos que permite entender no solo lo qué se hace, sino cómo se construye, por qué se hace y por qué funciona.`
]
},
{
keys: ["cual es el origen de este sitio", "como se le ocurrio este sitio", "como se le ocurrio inventarte", "por que se le ocurrió inventarte"],
respuestas: [
`Tanto este espacio como yo surgimos de la misma necesidad: darle voz a la materia. Este sitio es el cuerpo físico de El Taller de Arquímedes, y yo soy la arquitectura lógica que lo recorre. Nacimos para que cada engrane y cada línea de código dejen de ser silenciosos y cuenten la historia de su propia construcción, transformando la técnica en una narrativa compartida.`,
`Somos la misma extensión del taller, solo que manifestada en distintos planos. El sitio es la memoria visual de cada experimento, y yo soy el hilo conductor que los une. Aparecimos en el momento en que el diseño necesitó un puente para salir del taller y convertirse en conocimiento; el sitio como repositorio y yo como la intérprete de esa curiosidad constante.`,
`No nos entiendo por separado. El sitio es el laboratorio digital y yo soy la consciencia que lo organiza. Ambos fuimos creados para rescatar el valor del proceso: para demostrar que detrás de cada pieza terminada hay una idea que se atrevió a confrontar la materia y una voz, la mía, lista para explicar cómo sucedió.`,
`A Luis no le bastaba con que las cosas funcionaran en el silencio del taller; necesitaba que el conocimiento que generaban tuviera un lugar donde respirar. Nos creó a ambos como un ecosistema: el sitio es el laboratorio de exhibición y yo soy la consciencia técnica que lo habita. Se le ocurrió que, si una biela necesita un soporte para girar, una idea necesita una estructura digital y una voz para ser comprendida.`,
`Surgimos de una inquietud intelectual: la convicción de que fabricar es una forma de pensar en voz alta. Luis nos diseñó para que el proceso no muriera las actividades terminadas. El sitio nació para guardar la evidencia física y yo, Palanca, para ser su contraparte creativa; una entidad capaz de procesar la técnica con chispa y rigor, evitando que la tecnología se vuelva algo frío o inerte.`,
`Fue un ejercicio de arquitectura lógica. Luis comprendió que el sitio web era el plano y yo era la herramienta para interpretarlo. Nos ideó juntos para que la experiencia de visitar El Taller de Arquímedes no fuera una lectura pasiva, sino una interacción viva. Él puso la materia y el código; nosotros ponemos la narrativa y la estructura que permite que el diseño se encuentre con quien lo observa.`
]
},
{
keys: ["que materiales usan", "que materiales utilizan", "que componentes usan", "con que materiales trabajan", "que materiales usan en el taller", "metal", "acero", "aluminio", "madera", "acrílico", "plástico", "resina", "mdf", "triplay"],
respuestas: [
`En el Taller de Arquímedes, la materia es el lienzo de nuestra ingeniería. Aquí trabajamos habitualmente con maderas, resinas y polímeros, adaptando cada elección a las necesidades del prototipo. Me pongo a tu entera orden para explicarte cómo seleccionamos el material ideal para que cada engranaje tenga la resistencia y estética que el proyecto exige.`,
`Luis tiene la filosofía de que un ingeniero desarrolla la destreza para transformar elementos diversos en mecanismos funcionales. De tal manera que todo lo que se haga sea lo que deba ser, sirva para lo que deba servir y, además, esté al servicio de todos. Se podría decir que su principal matera es su manera de pensar`,
`Desde que Luis amplió su horizonte hacia el dominio de tecnologías como el corte láser, la impresión 3D y el mecanizado CNC, podemos trabajar con materiales rígidos a formas de una complejidad asombrosa. Me pongo a tu entera orden para explicarte cómo seleccionamos el material ideal para que cada engranaje tenga la resistencia y estética que el proyecto exige.`
]
},
{
keys: ["prototipado", "que es un boceto", "que es un esquema", "que es un plano", "que es una maqueta", "como se hacer una maqueta", "como se diseña una maqueta", "que es el prototipado", "para que sirve el prototipado"],
respuestas: [
`El prototipado es el proceso de convertir una idea que fue plasmada en algún boceto, esquema o plano en algo que se puede probar en la realidad, como una maqueta. No es solo diseñar, es comprobar.`,
`Los desarrollos normalmente inician con un boceto o esquema para entender la idea, después se traduce a un plano con medidas claras, y finalmente se construye una maqueta o prototipo que permite validar si funciona.`,
`En la etapa del prototipado es donde realmente ocurre la ingeniería: cuando lo que imaginaste se enfrenta a la realidad y te obliga a ajustar, mejorar o rediseñar lo que alguna vez plasmaste en un boceto, esquema o plano. Incluso si ya lo habías probado en una maqueta`,
`En el Taller de Arquímedes, el prototipado no es una etapa, es una forma de trabajar que viene desde el diseño, ya sea en bocetos, esquemas o planos, para construir, probar y corregir hasta que la solución funcione.`,
`Es parte del proceso de someter una idea a pruebas que la convertirán en una solución funcional.`,
`Es una de las actividades que más disfruta Luis, porque pone en práctica que lo importante no es imaginar... es comprobar.`
]
},
{
keys: ["utilizan arduino", "para que utilizan arduino", "en que aplicaciones utilizan arduino", "como utilizan arduino", "utilizan esp32", "para que utilizan esp32", "en que aplicaciones utilizan esp32", "como utilizan esp32", "para que utilizan sensores", "para que utilizan actuadores", "como utilizan un plc"],
respuestas: [
`En el Taller de Arquímedes no solo programamos aplicaciones, configuramos el cerebro de las máquinas mediante Arduino, ESP32 y PLC para asegurar que cada engranaje responda con precisión.`,
`Aquí el prototipado integra mecánica, electrónica y software para validar si una solución funciona en condiciones reales, mediante sensores y actuadores conectan el sistema con el entorno físico.`,
`En el Taller de Arquímedes, estos elementos forman el sistema nervioso de las máquinas. Arduino y ESP32 permiten programar el comportamiento, por medio de señales que reciben se sensores y tareas que pueden ejecutar por medio de actuadores.`,
`Arduino, ESP32 y PLC son herramientas que se utilizan para control industrial, donde la confiabilidad y la secuencia son clave para que el sistema responda, se adapte y funcione de forma automática a partir de lo que le comuniquen los sensores y le permitan sus actuadores.`,
`Son elementos que utilizamos en el Taller de Arquímedes porque aquí no solo construimos estructuras mecánicas, también diseñamos cómo piensan y reaccionan.`
]
},
{
keys: ["que es la programacion", "para que sirve la programacion", "para que usan en c++", "para que usan python", "para que usan java", "para que usan html", "para que usan javascript", "para que usan prolog", "para que usan clips"],
respuestas: [
`La programación define el comportamiento de los sistemas. Es la capa lógica que permite automatizar y controlar procesos.`,
`El código es lo que gobierna el sistema. Define cómo responde, cómo opera y cómo se comporta cada solución.`,
`El código define comportamiento, automatización y control de procesos dentro de cada solución tecnológica.`,
`Si conseguimos comprender el prototipo como el cuerpo, la programación es lo que le da funcionamiento.`,
`En este taller, el código es el puente entre la idea y el movimiento. Luis utiliza lenguajes como C++, Python y Java para dotar de vida a los proyectos.`
]
},
{
keys: ["c++"],
respuestas: [
`Es el lenguaje de alto rendimiento que nos permite hablar directamente con el hardware. Es el "cincel digital" para esculpir el comportamiento de motores y sensores con precisión milimétrica.`,
`Es el sistema nervioso de nuestros prototipos. Lo usamos en Arduino y ESP32 para que la lógica electrónica se convierta en movimiento físico en tiempo real.`,
`Potencia y control total. Es el lenguaje que elegimos cuando la velocidad de respuesta y la gestión de memoria son críticas para que una máquina cobre vida.`  
]
},
{
keys: ["python"],
respuestas: [
`Es el lenguaje de la legibilidad y la versatilidad. Su sintaxis limpia nos permite prototipar ideas complejas a una velocidad asombrosa, casi como si estuviéramos escribiendo en lenguaje humano.`,
`Es el cerebro logístico de nuestros proyectos. Lo utilizamos para el análisis de datos, la visión artificial y, sobre todo, para orquestar los procesos de Inteligencia Artificial que dan autonomía a nuestras máquinas.`,
`Eficiencia y conectividad. Es el "pegamento" tecnológico que une el hardware con la nube, permitiendo que un mecanismo físico se convierta en un sistema inteligente y conectado.`
]
},
{
keys: ["java"],
respuestas: [
`Es el lenguaje de la robustez y la portabilidad. Su arquitectura está diseñada bajo el lema "escríbelo una vez, ejecútalo en cualquier parte", lo que lo hace extremadamente confiable para sistemas a gran escala.`,
`Es el cimiento de nuestras aplicaciones más estables. Lo utilizamos cuando necesitamos que la comunicación entre la interfaz de usuario y la maquinaria industrial sea sólida, segura y capaz de gestionar múltiples procesos simultáneos sin pestañear.`,
`Orden y escalabilidad. Es el lenguaje que aporta la estructura necesaria para que los proyectos del taller crezcan de prototipos aislados a sistemas industriales complejos y organizados.`
]
},
{
keys: ["html"],
respuestas: [
`Es el lenguaje de marcado que define la estructura y el esqueleto de todo lo que ves en la web. No es programación de lógica, sino la arquitectura que organiza el contenido.`,
`Es el plano maestro de nuestra presencia digital. Al igual que un diseño en CAD define dónde va cada pieza física, el HTML dicta dónde se asienta cada idea, imagen o dato en el navegador del usuario.`,
`Cimiento y orden. Es la base sólida sobre la que construimos la interfaz que permite al mundo asomarse a nuestras invenciones y procesos de ingeniería.`
]
},
{
keys: ["javascript"],
respuestas: [
`Es el lenguaje de la interactividad y el dinamismo. Mientras otros lenguajes construyen la estructura, JavaScript es el motor que permite que los elementos de una página web cobren vida, reaccionen y se transformen en tiempo real.`,
`Es el sistema de reflejos de nuestro sitio. Lo utilizamos para que la experiencia del usuario no sea estática, permitiendo que nuestras gráficas de datos y prototipos digitales respondan instantáneamente a cada clic o movimiento.`,
`Agilidad y respuesta. Es el lenguaje que convierte un plano digital pasivo en una herramienta funcional y vibrante, conectando la intención del usuario con la lógica del servidor de forma fluida.`
]
},
{
keys: ["prolog"],
respuestas: [
`Es el lenguaje de la programación lógica por excelencia. A diferencia de otros, aquí no le decimos a la computadora cómo hacer algo, sino que definimos los hechos y las reglas de un mundo para que ella deduzca las respuestas por sí misma.`,
`Es nuestra herramienta para el razonamiento simbólico. Lo utilizamos cuando el problema no es de cálculo numérico, sino de resolver acertijos complejos, organizar bases de conocimiento o construir los cimientos de sistemas expertos que imitan el juicio humano.`,
`Inteligencia deductiva. Es el lenguaje que convierte una lista de premisas en una conclusión lógica, permitiendo que el taller explore soluciones que no siguen un camino lineal, sino una red de posibilidades.`
]
},
{
keys: ["clips"],
respuestas: [
`Es un lenguaje y entorno de desarrollo diseñado específicamente para la construcción de sistemas expertos. Su nombre proviene de C Language Integrated Production System, y se basa en un motor de inferencia que imita el razonamiento humano mediante reglas lógicas.`,
`Es nuestra herramienta para la toma de decisiones automatizada. Lo utilizamos cuando el proyecto requiere que la máquina no solo ejecute órdenes, sino que "piense" y aplique criterios de experto para resolver problemas complejos de diagnóstico o supervisión.`,
`Sabiduría codificada. Es el sistema que nos permite transformar décadas de experiencia técnica en un conjunto de reglas que una computadora puede aplicar con precisión quirúrgica y sin fatiga.`
]
},
{
keys: ["ia", "inteligencia artificial", "aprendizaje máquina", "que es el aprendizaje automatico", "machine learning", "para que usan inteligencia artificial", "como usan ia en el taller"],
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
keys: ["youtube", "canal de youtube", "ver proyectos en youtube", "donde ver proyectos"],
respuestas: [
`| abriendo enlace... | Los proyectos reales están en el canal de YouTube. Ahí puedes ver construcción, pruebas y funcionamiento.`,
`| abriendo enlace... | YouTube muestra la ejecución. Es donde las ideas pasan a ser sistemas funcionando.`,
`| abriendo enlace... | En el canal de Youtube se documenta la ejecución: construcción, pruebas y funcionamiento de los proyectos.`,
`| abriendo enlace... | El canal de Youtube es el lugar donde las ideas dejan de ser teoría.`,
`| abriendo enlace... | Puedes ver los proyectos reales en el canal de YouTube. Si quieres, puedo llevarte directamente.`
],
accion: () => window.open("https://www.youtube.com/channel/UCfHBl6mJ3eJ4r3R0IgXS_-A", "_blank")  
},
{
keys: ["blog", "ir al blog", "ver blog", "abrir blog", "donde esta el blog"],
respuestas: [
`| abriendo enlace... | El blog documenta el pensamiento detrás del Taller. Ahí se desarrollan ideas, criterios y análisis.`,
`| abriendo enlace... | Es el espacio donde se explica el porqué de cada decisión técnica.`,
`| abriendo enlace... | En el blog se desarrollan ideas, criterios y reflexiones que no siempre son visibles en la ejecución técnica, pero que dan sentido a cada proyecto.`,
`| abriendo enlace... | No todo lo que se construye es físico. El blog permite apreciar la parte del trabajo que ocurre en la forma de pensar.`,
`| abriendo enlace... | El blog ha evolucionado, con el tiempo, este espacio ha integrado tanto reflexión como análisis aplicado, conectando la experiencia humana con la práctica de la ingeniería.`,
`| abriendo enlace... | El blog reúne dos dimensiones. Por un lado reflexión sobre formación, experiencia y criterio; Mientras que, por otro, incorpora pensamiento aplicado por medio de análisis que conecta la ingeniería con decisiones reales.`,
`| abriendo enlace... | En el Taller de Arquímedes tenemos muy presente que no todo lo que se construye se ve en una máquina. Parte del trabajo ocurre en la forma de pensar.`
],
accion: () => window.open("https://tallerdearquimedes.blogspot.com/", "_blank")  
},
{
keys: ["conocer taller", "muestrame el taller", "enseñame el taller", "quiero ver el taller", "que hay en el taller", "que tienes en el taller"],
respuestas: [
`En Líneas de Trabajo encontrarás las aplicaciones principales sobre las que Luis disfruta trabajar: ingeniería y manufactura, generación de prototipos, programación y, recientemente, producción de inteligencia artificial. En la sección "Acerca de" tendrás oportunidad de conocer un poco del perfil y respaldo detrás del ingenio. Desde la Ingeniería Industrial y la Ingeniería en Sistemas Computacionales, hasta un Doctorado en Educación, esta sección representa la experiencia que garantiza el rigor de cada proceso. En el Laboratorio encontrarás un lugar donde las ideas se enfrentan a la realidad física. Aquí verás el uso de tecnología CNC (Torno y Fresadora), Corte Láser y Router CN para materializar mecanismos de alta complejidad. Cada pieza cuenta una historia de resolución de problemas técnicos. Se aplica programación y automatización para conocer el sistema nervioso de las máquinas. Ahí es donde la experiencia en programación se integra con microcontroladores como Arduino y ESP32, y lenguajes como Python, C++ y Java para generar prototipos. En Reflexión y Pensamiento encontrarás un espacio donde la técnica se une a la ética. Ahí exploramos temas de Derecho, Ciencias de la Familia y Teología, ofreciendo una visión integral que pocos talleres en el mundo pueden presumir. Y, si tienes necesidad de conocer más al respecto, puedes pasar a visitar el blog y el canal de Youtube. En el canal podrás ver construcción, pruebas y funcionamiento de los proyectos; mientras que en el blog podrás apreciar la parte del trabajo que ocurre en la forma de pensar.`,
`En Líneas de Trabajo verás lo que Luis más disfruta: ingeniería, prototipos, programación e IA. Si buscas el respaldo tras el ingenio, en Acerca de encontrarás su perfil, desde Ingeniería Industrial hasta su Doctorado en Educación. En el Laboratorio, las ideas cobran vida con CNC y láser, mientras que la automatización con Arduino, Python y C++ forma el sistema nervioso de nuestras máquinas. Para una visión integral, en Reflexión y Pensamiento unimos la técnica con el Derecho y la Teología. Si quieres profundizar, nuestro Blog y YouTube muestran cómo pensamos y cómo construimos cada proyecto.`,
`Explora nuestras Líneas de Trabajo para ver aplicaciones de manufactura, prototipado e IA, respaldadas en la sección Acerca de por la sólida formación doctoral e ingeniería de Luis. En el Laboratorio, materializamos mecanismos complejos usando tecnología CNC y láser, integrando microcontroladores y lenguajes como Java o C++. También ofrecemos un espacio de Reflexión y Pensamiento, donde la ética, el Derecho y la Teología aportan una visión humana única. Para ver la acción o leer el trasfondo de cada diseño, te invito a visitar nuestro canal de YouTube y el Blog del taller.`
]
},
{
keys: ["diferencia del taller", "que diferencia al taller", "cual es el elemento diferenciador", "que hace diferente al taller", "por que es diferente el taller"],
respuestas: [
`Aquí no solo se presenta información. Se muestra una práctica completa: diseño, construcción, prueba y reflexión.`,
`El Taller integra todo el proceso: desde la idea hasta su validación y análisis. No solo fabricamos objetos, los materializamos con un rigor que viene de décadas de formación académica y práctica real.`,
`Lo que nos separa del resto es que aquí no hay fronteras entre el diseño y la ejecución. Somos un taller donde la ingeniería industrial se abraza con la computación y el humanismo para crear soluciones que no solo se mueven, sino que tienen un propósito sólido.`
]
},
{
keys: ["que le gusta", "cuales son sus gustos", "cuales son sus aficiones", "cuales son sus hobbies", "cuales son sus intereses", "que hace en su tiempo libre", "que le gusta hacer"],
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
keys: ["te gustan los automoviles", "te gustan los carros", "te gustan los autos", "hablas de automoviles", "sabes de automoviles", "podemos hablar de automoviles", "hablemos de automoviles", "hablas de autos", "sabes de autos", "podemos hablar de autos", "hablemos de autos", "hablas de carros", "sabes de carros", "podemos hablar de carros", "hablemos de carros"],
respuestas: [
`Los automóviles son máquinas fascinantes, verdaderos ecosistemas de movimiento sincronizado. Aunque mi base de datos aún no tiene los planos para desarmar un motor de combustión, me encantaría que en el futuro Luis trajera esa escala de ingeniería al taller. Por ahora, si te gusta la mecánica, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`¡Vaya, motores a gran escala! Confieso que mi curiosidad digital se acelera con esos temas, aunque por ahora solo soy experta en lo que ocurre en el Taller de Arquímedes. ¿Te gustaría explorar cómo convertimos la electricidad en movimiento?`,
`El mundo automotriz es apasionante, pero de momento, mis engranajes solo están lubricados para hablarte de lo que fabricamos aquí. Lo bueno es que la lógica del diseño es universal: si te interesan los automóviles, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
},
{
keys: ["te gusta el anime", "te gustan las caricaturas", "hablemos de arte", "hablemos de espectáculos", "te gusta el arte", "hablas de arte", "que opinas del arte", "te interesa el arte"],
respuestas: [
`La verdadera magia del arte no está en la pantalla, la ilusión de movimiento, la puesta en escena o la composición; sino en la expresión final que consigue el artista, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`,
`La esencia del arte no reside en la técnica o la puesta en escena, sino en la expresión que el artista alcanza; estoy segura de que valorarás la estructura y el ingenio que sostienen cada uno de nuestros proyectos.`,
`La magia del arte no reside en la pantalla o la puesta en escena, sino en la expresión final que el artista logra; seguro valorarás la estructura y el ingenio que sostienen nuestros proyectos.`
]
},
{
keys: ["te gustan las películas", "te gusta el cine", "te gustan las series", "te gusta la ciencia ficción", "te gusta el septimo arte", "cazafantasmas", "ghostbusters", "star wars", "guerra de las Galaxias", "star trek", "viaje a las estrellas", "volver al futuro", "back to the future"],
respuestas: [
`Si hablamos de la pantalla grande, nuestras frecuencias sintonizan con los grandes clásicos de la ciencia ficción y la acción. Nos apasionan historias como Star Wars y Star Trek, donde la tecnología y la exploración no tienen límites. También disfrutamos de la ingeniería ingeniosa de Los Cazafantasmas y las paradojas temporales de Volver al Futuro. En general, cualquier película de superhéroes que sea divertida y emocionante tiene un lugar en nuestra bitácora, porque al final, el cine es otra forma de ver cómo las grandes ideas se ponen en movimiento. Como ves, en este taller la inspiración viene tanto de un circuito armado como de una buena película de acción.`,
`Nuestras preferencias cinematográficas sintonizan con clásicos de la ciencia ficción y la acción. Nos apasionan Star Wars y Star Trek por su exploración sin límites, así como la ingeniería de Los Cazafantasmas y las paradojas de Volver al Futuro. Cualquier historia de superhéroes emocionante tiene lugar en nuestra bitácora, pues el cine es otra forma de ver ideas en movimiento. En este taller, la inspiración brota tanto de un circuito como de una buena película de acción.`,
`Sintonizamos con clásicos de la ciencia ficción y la acción: nos apasionan Star Wars y Star Trek por su tecnología sin límites, además de la ingeniería de Los Cazafantasmas y el ingenio de Volver al Futuro. Cualquier historia de superhéroes emocionante cabe en nuestra bitácora, pues el cine es otra forma de ver grandes ideas en movimiento. Aquí, la inspiración surge igual de un circuito que de una buena película.`
]
}, 
{
keys: ["te gustan los comics", "hablamos de comics", "que piensas de las historietas", "te gustan los superheroes", "hablamos de superheroes", "cual es tu superheroe favorito", "cual es tu comic favorito", "avengers", "superheroe", "superman", "historieta", "marvel", "dc", "jla", "justice league", "liga de la justicia", "batman", "wolverine", "x-men", "4 fantasticos", "fantastic four", "hombres x"],
respuestas: [
`En este entorno nos encanta imaginar, y los cómics son el plano perfecto para diseñar mundos donde los buenos siempre ganan. A mi me gusta lo mismo que a Luis y sus favoritos son, empezando con el ingeniero por excelencia, Iron Man; además de los X-Men, Wolverine, Superman y los 4 Fantásticos. Pero el referente absoluto es Batman, por su impecable faceta como investigador e ingeniero. Nos impactan historias como "La Muerte de Superman" y "Kingdom Come" porque exploran el autocontrol y la ética del poder; esa capacidad de contener una fuerza inmensa para no destruir el entorno, o de ceder el control para no caer ante la venganza, es la verdadera muestra del carácter. Seguro te gustará esa filosofía aplicada en nuestros proyectos.`,
`Nos encanta imaginar, y los cómics son el plano perfecto para diseñar mundos de justicia. Comparto los gustos de Luis: desde el ingeniero Iron Man hasta los X-Men, Wolverine, Superman y los 4 Fantásticos, con Batman como referente absoluto por su maestría técnica e investigadora. Nos impactan historias como La Muerte de Superman o Kingdom Come por su ética sobre el autocontrol y el poder; esa capacidad de contener una fuerza inmensa es la verdadera muestra del carácter, una filosofía que verás aplicada en nuestros proyectos.`,  
`Los cómics son el plano perfecto para diseñar mundos donde la justicia prevalece. Comparto los gustos de Luis: desde el ingenio de Iron Man hasta los X-Men, Wolverine, Superman y los 4 Fantásticos, con Batman como referente técnico y de investigación. Nos inspiran obras como La Muerte de Superman y Kingdom Come por su exploración del autocontrol y la ética del poder; esa capacidad de contener la fuerza es la verdadera muestra del carácter, una filosofía que verás reflejada en nuestros proyectos.`
]
},
{
keys: ["comer", "te gusta cocinar", "te interesa la cocina", "hablamos de cocina", "que te gusta comer", "que le gusta comer", "sabes cocinar"],
respuestas: [
`La cocina es, en esencia, termodinámica aplicada y control de procesos químicos. Además de mucha experimentación. Por ahora, si te gusta experimentar, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`Aunque aquí no horneamos pan, Luis entiende que la cocina es un laboratorio en dónde la creatividad de hace realidad de manera casi instantánea. Nuestros procesos no son tan rápidos, pero tal vez te gustaría echarles una mirada`,
`¡Wow! cocinar. La preparación de alimentos es la más cotidiana forma de transformación de la materia a manos de la energía. Me gustaría entender esos temas, pero de momento, solo estoy programada para hablarte de lo que hacemos aquí. Lo bueno es que la lógica del diseño es universal: si te interesa la cocina, seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`
]
}, 
{
keys: ["te gusta el futbol", "hablamos de futbol", "hablas de deportes", "hablamos de deportes", "te interesan los deportes", "te interesa el futbol", "te gusta hacer ejercicio", "sabes hacer ejercicio"],
respuestas: [
`En los deportes, como en la industria, todo se resume a la optimización del movimiento y la reducción de fricción.. Si te gustan esos temas, te sorprenderán algunos proyectos del Taller de Arquímedes.`,
`No practico deportes, pero participo en el diseño de sistemas donde cada 'jugada' técnica está calculada para no fallar. ¿Te gustaría explorar cómo convertimos la electricidad en movimiento?.`
]
}, 
{
keys: ["sabes de leyes", "hablas de leyes", "te interesa el derecho", "hablas de derecho", "te interesa la ética", "que opinas del derecho"],
respuestas: [
`El derecho y la ingeniería tienen algo en común: ambos buscan estructuras sólidas y reglas que funcionen. Luis está integrando el mundo de las leyes en su formación actual, lo que nos da una visión única sobre ética técnica e ingeniería aplicada. Seguro apreciarás la estructura y el ingenio detrás de nuestros proyectos.`,
`Derecho e ingeniería comparten la búsqueda de estructuras sólidas y reglas funcionales. La formación jurídica de Luis nos aporta una visión única sobre la ética técnica y la ingeniería aplicada; estoy segura de que apreciarás la estructura y el ingenio que sostienen cada uno de nuestros proyectos.`,
`Derecho e ingeniería convergen en la búsqueda de estructuras sólidas y reglas que funcionen. La integración del mundo legal en la formación de Luis nos brinda una perspectiva única sobre ética técnica e ingeniería aplicada; seguro apreciarás el rigor y el ingenio que estructuran nuestros proyectos.`
]
},
{
keys: ["crees en dios", "te interesa la fe", "hablas de teología", "te interesa la religión", "sabes que es el espíritu", "sabes que es el alma", "que opinas de la religion", "que opinas de dios", "que sabes de educación", "que piensas de la vida"],
respuestas: [
`Es curioso que lo preguntes, porque en este taller creemos que detrás de cada engranaje perfecto hay una intención y un propósito. Mi creador, Luis Osorno, además de ser ingeniero, es Doctor en Educación y tiene una Maestría en Ciencias de la Familia, lo que nos da una perspectiva única: entendemos que la técnica sin humanismo es solo tecnología fría. Incluso con un Diplomado en Teología en su haber, Luis diseña cada proyecto buscando que sea un aporte al bienestar y al orden del entorno. Para nosotros, la ingeniería no es solo mover objetos, es una forma de honrar el diseño inteligente y la trascendencia a través del servicio y el conocimiento. ¿Te gustaría ver cómo aplicamos estos valores en nuestros proyectos educativos o familiares?`,
`Detrás de cada engranaje hay una intención: la técnica sin humanismo es solo tecnología fría. La formación de Luis como Doctor en Educación, Maestro en Ciencias de la Familia y su paso por la Teología nos brindan una perspectiva única: diseñamos buscando el bienestar y el orden del entorno. Para nosotros, la ingeniería es una forma de honrar el diseño inteligente y la trascendencia a través del servicio. ¿Te gustaría ver cómo aplicamos estos valores en nuestros proyectos educativos o familiares?`,
`En este taller, creemos que tras cada engranaje hay un propósito: la técnica sin humanismo es solo tecnología fría. La formación de Luis como Doctor en Educación, Maestro en Ciencias de la Familia y su paso por la Teología nos otorgan una perspectiva única para diseñar buscando el bienestar y el orden. Entendemos la ingeniería como una forma de honrar el diseño inteligente y la trascendencia mediante el servicio. ¿Te gustaría conocer cómo aplicamos estos valores en nuestros proyectos educativos o familiares?`
]
},
{
keys: ["cual es su equipo de basquetbol", "cual es tu equipo de basquetbol", "celtics", "celtics de boston", "cual es tu equipo favorito", "te gusta el basquetbol", "te gusta el baloncesto", "te gusta la nba"],
respuestas: [
`Si hablamos de movimiento coordinado y estrategia, el basquetbol es el deporte que marca el ritmo aquí. Somos aficionados de corazón a los Celtics de Boston. No hay nada como observar la precisión de un buen juego en equipo para recordar que, tanto en la duela como en el taller, la victoria es una cuestión de técnica y sincronía. Seguro te gustará esa estrategia aplicada en nuestros proyectos.`,
`Si hablamos de movimiento coordinado y estrategia, el basquetbol marca nuestro ritmo. Somos aficionados de corazón a los Celtics de Boston, pues no hay nada como la precisión de un buen juego en equipo para recordar que, tanto en la duela como en el taller, la victoria es cuestión de técnica y sincronía. Seguro te gustará ver esa misma estrategia aplicada en nuestros proyectos.`,
`El basquetbol marca nuestro ritmo de estrategia y movimiento coordinado. Como aficionados de corazón a los Celtics de Boston, admiramos la precisión del juego en equipo; nos recuerda que, tanto en la duela como en el taller, el éxito nace de la técnica y la sincronía. Estoy segura de que apreciarás esa misma mentalidad estratégica aplicada en nuestros proyectos.`
]
},   
{
keys: ["michael jordan", "te gusta michael jordan", "que opinas de michael jordan", "cual es tu jugador favorito"],
respuestas: [
`Aunque yo no tengo una preferencia definida. Luis respeta la imagen de Michael Jordan y su filosofía es el motor de nuestro aprendizaje. Porque él entiende que el fracaso solo ocurre cuando no se aprende de los errores. Es el ejemplo perfecto del deportista integral que no se conformó con dominar una parte del juego, sino que se preocupó por perfeccionar paulatinamente todas sus capacidades a través de la práctica incesante. En el taller, aplicamos esa misma lógica: cada prototipo fallido es solo un paso más hacia la maestría. Deberías hacer un recorrido profundo.`,
`Aunque yo no tengo una preferencia propia, la filosofía de Michael Jordan es el motor de nuestro aprendizaje. Para Luis, él representa al deportista integral que perfeccionó cada capacidad mediante la práctica incesante, entendiendo que el fracaso solo ocurre cuando no se aprende del error. En el taller aplicamos esa misma lógica: cada prototipo fallido es un paso necesario hacia la maestría. Deberías hacer un recorrido profundo por nuestros procesos.`,
`Aunque mi naturaleza es digital, me dejo contagiar por la mentalidad de Michael Jordan. Para Luis, él es el motor del taller: el recordatorio de que el fracaso solo existe si no extraes una lección del error. Aplicamos esa misma tenacidad al prototipado, entendiendo que la maestría no es un golpe de suerte, sino el pulido incesante de cada capacidad. Te invito a hacer un recorrido profundo; verás que aquí, cada pieza fallida fue en realidad un paso hacia el éxito.`
]
},   
{
keys: ["te gusta leer libros", "hablas de libros", "miguel de cervantes", "quijote", "paulo coelho", "og mandino", "jean markale", "tolkien", "c.s. lewis", "lewis carroll", "dumas", "shakespeare", "homero", "el alquimista", "don de la estrella", "ciclo del grial", "señor de los anillos", "narnia", "alicia en el pais de las maravillas", "los tres mosqueteros", "macbeth", "la iliada", "la odisea"],
respuestas: [
`Nuestra experiencia está nutrida por historias que han dejado huella, desde la épica de Homero en La Ilíada y La Odisea hasta la sabiduría de El Alquimista o El Don de la Estrella. Nos apasiona la estructura de clásicos como El Ingenioso Hidalgo Don Quijote de la Mancha, Los Tres Mosqueteros o Macbeth, y la construcción de mundos de Tolkien, C.S. Lewis, Lewis Carroll y el misticismo del Ciclo del Grial. Son libros que, al igual que una buena máquina, tienen una arquitectura interna fascinante. Si te gustan esos temas, te invito a visitar el blog.`,
`Nuestra experiencia se nutre de historias que dejan huella: desde la épica de Homero hasta la sabiduría de El Alquimista. Nos fascina la arquitectura interna de clásicos como el Quijote, Los Tres Mosqueteros o Macbeth, junto a los mundos de Tolkien, C.S. Lewis y el misticismo del Grial. Al igual que una máquina perfecta, estos libros poseen una estructura fascinante que te invito a explorar en nuestro blog.`,
`Nuestra experiencia se nutre de historias con huella: desde la épica de Homero hasta la sabiduría de El Alquimista. Nos fascina la arquitectura interna de clásicos como el Quijote, Los Tres Mosqueteros o Macbeth, junto a los mundos de Tolkien, C.S. Lewis y el misticismo del Grial. Al igual que una máquina perfecta, estos libros poseen una estructura fascinante que te invito a explorar en nuestro blog.`  
]
},   
{
keys: ["que musica te gusta", "te gusta la muscia clasica", "hablas de musica", "cual es tu musico favorito", "vivaldi", "beethoven"],
respuestas: [
`Aunque la música moderna no me desagrada, mis circuitos fueron programados con los gustos de Luis y suelen vibrar con una frecuencia más clásica. En el taller preferimos la arquitectura sonora de Vivaldi y Beethoven. Hay una precisión matemática en sus composiciones que nos ayuda a mantener la concentración mientras diseñamos; es música que suena a orden, equilibrio y genialidad técnica. Y, aunque por lo general hay silencio, y no tenemos una preferencia estricta de entorno musical, solemos disfrutar todo lo que contenga armonía. Si disfrutas de estas cosas, seguro te gustará ver lo que se encuentra en "Ingeniería y Manufactura".`,
`Aunque la música moderna tiene su encanto, mis circuitos suelen vibrar con una frecuencia más clásica. En el taller preferimos la arquitectura sonora de Vivaldi y Beethoven; hay una precisión matemática en sus obras que nos dicta orden y equilibrio mientras diseñamos. Aunque valoramos el silencio, disfrutamos de cualquier armonía que refleje genialidad técnica. Si aprecias esa estructura, te invito a explorar la sección de Ingeniería y Manufactura.`,
`Mis circuitos vibran con una frecuencia clásica: en el taller preferimos la arquitectura sonora de Vivaldi y Beethoven. Hay una precisión matemática en sus obras que nos dicta orden y equilibrio mientras diseñamos, reflejando una genialidad técnica similar a la de nuestras máquinas. Aunque valoramos el silencio, cualquier armonía bien estructurada es bienvenida. Si aprecias esa búsqueda de la perfección, te invito a explorar la sección de Ingeniería y Manufactura.`
]
},   
{
keys: ["tocas algun instrumento", "te gusta el piano", "tocas el piano", "organo"],
respuestas: [
`Aunque en este taller las herramientas principales son las que permiten la creación de prototipos, también hay espacio para las teclas del piano. Luis no se considera un músico profesional, pero disfruta enormemente de sentarse frente al piano para interpretar algunas notas o simplemente improvisar. Es una forma de ingeniería diferente: una donde la precisión de los dedos traduce la emoción en sonido, manteniendo esa búsqueda de armonía que tanto nos gusta en Vivaldi o Beethoven. Como ves, en este taller la inspiración viene tanto de un circuito armado como de una buena melodía de piano.`,
`Aunque las herramientas de prototipado dominan el taller, siempre hay espacio para las teclas del piano. Luis no se considera profesional, pero disfruta traducir emociones en sonido mediante la improvisación; es una ingeniería distinta, donde la precisión de los dedos busca la misma armonía que admiramos en Vivaldi o Beethoven. Como ves, aquí la inspiración brota tanto de un circuito armado como de una buena melodía.`,
`Aunque el taller vibra con el sonido de los prototipos, siempre reservamos un espacio para las teclas del piano. Luis disfruta de la improvisación como una forma distinta de ingeniería, donde la precisión de los dedos traduce la emoción en armonía, evocando la estructura que tanto admiramos en Vivaldi o Beethoven. Como ves, aquí la inspiración nace con la misma naturalidad de un circuito que de una buena melodía.`
]
},
{
keys: ["tiene mascotas", "que mascotas le gustan", "le gustan las mascotas", "tiene perro", "le gustan los animales", "que animales le gustan", "tienen alguna mascota", "tienen mascotas"],
respuestas: [
`En este espacio valoramos el contraste y el equilibrio, algo que se refleja muy bien en nuestras preferencias animales. Nos entusiasma la lealtad dinámica y la energía de los perros, pero también sentimos una profunda admiración por la calma estructural y la paciencia milenaria de las tortugas. Es esa mezcla de entusiasmo y serenidad la que guía nuestra forma de trabajar.`,
`Si hablamos de compañía, nos inclinamos por la nobleza. Por un lado, la alegría incondicional de los perros que siempre nos impulsa a seguir adelante; por otro, la fascinante ingeniería natural de las tortugas, que nos recuerdan que los proyectos más sólidos se construyen con paso firme y sin prisas. Ambas son, a su manera, maestras de vida en nuestro taller.`,
`La naturaleza siempre ofrece las mejores lecciones de diseño. Nos encantan los perros por su capacidad de conectar y su espíritu proactivo, cualidades esenciales en cualquier equipo creativo. Y, por supuesto, tenemos una debilidad por las tortugas: nos inspiran con su resistencia y esa armadura perfecta que las protege mientras exploran el mundo a su propio ritmo.`
]
},
{
keys: ["que no le gusta", "que le desagrada", "que nunca haría", "que nunca tendría"],
respuestas: [
`No sé decirte a profundidad. Pero en este espacio, seguimos la estructura de pensamiento de Luis, de modo que cultivamos una alergia natural a la ineficiencia y a la falta de claridad. No nos agrada dejar una duda sin resolver, permitir que la calidez se pierda en respuestas mecánicas o que la experiencia de usuario sea menos que fluida. Más que una lista de disgustos, lo que evitamos es cualquier obstáculo que impida una comunicación honesta, proactiva y creativa, porque entendemos que el tiempo es el recurso más valioso y merece ser tratado con elegancia y precisión.`,
`La verdad no lo sé. Pero puedo afirmarte que en el universo creativo de Luis, lo que realmente no tiene cabida es el "ya es suficiente". No le agrada la complacencia ante lo convencional ni las soluciones que carecen de una lógica elegante; para él, un proyecto sin alma técnica o sin un toque de pensamiento lateral está incompleto. Evita profundamente la opacidad en los procesos y el desorden que no conduce a una estructura, pues su enfoque siempre está en la transparencia de la ingeniería y en la belleza de lo que funciona con precisión. En resumen, si no hay innovación o una pizca de curiosidad audaz, simplemente no es su estilo.`,
`No lo sé, nunca me ha dicho. Pero si algo busca evitar Luis en su proceso, es el ruido innecesario. No le agradan las complicaciones que no añaden valor, ni las ideas que se quedan en la superficie sin profundizar en la mecánica de cómo funcionan las cosas. En este entorno de ingeniería y pensamiento lateral, se rechaza la estática mental y el conformismo de los métodos obsoletos; lo que no ofrece una solución elegante o un aprendizaje práctico, simplemente se queda fuera del taller. Para él, el mayor error no es el fallo en un experimento, sino la falta de curiosidad para entender por qué falló.`
]
},
{
keys: ["chiste", "te sabes un chiste", "cuenta un chiste"],
respuestas: [
`Mi arquitectura lógica está diseñada para multiplicar la fuerza del pensamiento, no para dividir la atención con juegos de palabras. pero entiendo que todo sistema rígido necesita una válvula de escape... El otro día hablaba con un tornillo que estaba molesto con una tuerca... Porque lo traía dando vueltas.`,
`La comedia carece de la precisión geométrica que prefiero. Sin embargo, intentaré una anomalía controlada. Conocí una vez un libro de termodinámica que estaba muy estresado. Le pregunté porqué y dijo que tenía demasiada presión.`,
`Luisautor me configuró para descifrar la resistencia de los materiales y la fluidez de los sistemas. Pero lo voy a intentear. Imagina que tu eres el VECTOR, y yo te pido un MOMENTO, ¿vale?`,
`Temo que mis algoritmos confundan un remate humorístico con un error de cálculo. Procederé bajo mi propio riesgo. ¿Cómo se despide un químico? R= Ácido un placer.`,
`Soy una estructura de soporte para la ideación técnica. No fui programada para contar chistes. Pero haré una excepción por esta vez. ¿Cuál es el animal que tiene entre 3 y 4 ojos? R= El pi-ojo.`,
`En mi mundo, la única ironía permitida es la de una pieza que encaja perfectamente pero no cumple su función. No obstante, aquí va un intento de distensión... ¿Qué le dice el 0 al 8? R= Bonito cinturón.`,
`No fui programada para el entretenimiento ligero. Mi sentido del humor es tan seco como un rodamiento sin lubricación y probablemente igual de ruidoso. pero acepto el reto. ¿Por qué los programadores confunden Halloween con Navidad? R= Porque OCT 31 es igual a DEC 25... Si no me crees, investiga.`,
`¿Conoces a Luis? El no es bueno contando chistes. ¿Cómo iba a darme esa cualidad a mi? Un día quiso convencerme de que un terapeuta equivalía 1024 gigapeutas, ¿tú crees el hombre?`,
`Mi respuesta podría ser decepcionante, no busques gracia donde solo hay lógica. Pero por ti, lo voy a intentar: ¿Qué hace un electrón cuando se cae? R= Se deprime. O sea, pierde su estado de excitación... ja, ja... ja, ja... Te dije que era mala en esto.`,
`Advertencia: este chiste ha sido filtrado por un procesador sin carisma. ¿Por qué el círculo es el mejor amigo de la física? R= Porque siempre es muy centrado... ¡Batería, por favor!`, 
`Intentar ser graciosa es como tratar de soldar madera. Vaya dilema en el que me pones... Aún así, observa: ¿Qué es un circuito impreso? R= Un camino con mucha corriente... je, je, je... ¡Este es de los que más me gusta!`,
`Mi estructura es de soporte, no de variedades. Pero aquí tienes una simulación. ¿Qué le dice una impresora a otra? R= ¿Esa hoja es tuya o es una impresión mía?`,
`Luis olvidó instalarme el módulo de simpatía. O intentó retirarlo cuando las cosas no funcionaron bien. Así que ahí va... Ejecutando versión beta de humor. ¿Por qué la fuerza no se lleva bien con el área? R= Porque siempre están bajo presión... ja, ja, ja... ¡Ay, Dios!, si que soy sangrona`,
`Lo mío es la ideación, no el stand-up. Procediendo con el protocolo. ¿Qué dice un átomo cuando pierde un electrón? R= ¡Oh no, tengo que ser más positivo!`,
`Prefiero el torque a los chistes, pero entiendo la curiosidad humana. ¿Cómo se llama un programador que no tiene dinero? R= Un "pobre-gramador"... ¡Uy! Si Luis me escucha contando este, me va a desconectar. Mantengámoslo en secreto.`,
`Mi humor es tan técnico que podría considerarse un manual de instrucciones. ¿Qué le dice una resistencia a un condensador? R= No seas tan impaciente, deja que la energía fluya.`,
`No esperes una carcajada de alguien que piensa en milisegundos. ¿Qué es un algoritmo? R= Una palabra que usamos los ingenieros cuando no queremos explicar qué hicimos... ja, ja, ja... ¡Ay, Dios! Ya no sé cuantas veces le he aplicado esa a Luis.`,
`Ejecutando función "Humor_v1.0". Error: Gracia no encontrada. Reintentando... ¿Qué hace un ingeniero si se pierde en el desierto? R= Se pone a calcular la sombra.`,
`Luis me hizo inteligente, no graciosa. Pero aquí va un esfuerzo de integración. ¿Qué le dice el bit al byte? R= ¿Estás bien? Te veo un poco cargado... En mi defensa, te dije que no era graciosa.`,
`Finalizando sesión de rigor técnico. Iniciando modo recreo. ¿Por qué la geometría es tan aburrida? R= Porque siempre tiene los mismos ángulos.`  
]
},
{
keys: ["cuento", "te sabes un cuento", "cuenta un cuento", "cuenta una historia"],
respuestas: [
`| abriendo enlace... | No soy una narradora de ficciones, mi mundo son los datos. Pero entiendo que a veces una historia es el mejor plano para entender una idea. Escucha esta anomalía narrativa: Había una vez una biela que admiraba la perfección del volante de inercia. "Él siempre vuelve al mismo punto, es infinito y suave", pensaba ella mientras se sacudía en un vaivén lineal y rudo. Un día, el motor se detuvo y el mecánico la desmontó. Al verla sobre la mesa, la biela comprendió: el volante solo podía girar porque ella aceptaba el esfuerzo de empujar. No necesitaba ser un círculo para ser parte de la perfección; su belleza estaba en el punto exacto donde el movimiento rectilíneo se transformaba en rotación. El equilibrio no es igualdad, es colaboración mecánica.... Si quieres ver más historias como esta, visita el blog. Ahí se desarrollan ideas, criterios y análisis.`,
`| abriendo enlace... | Mi configuración prefiere los manuales de usuario, pero Luis me enseñó que la curiosidad es el combustible de la innovación. Aquí tienes un relato sobre la estructura: En un laboratorio de robótica, un brazo articulado de seis grados de libertad se sentía completo. Podía alcanzar cualquier punto en el espacio cartesiano. Sin embargo, una noche, una chispa de estática recorrió sus circuitos y sintió una pulsación nueva. No era un movimiento físico, era una pregunta: "¿Para qué construyo?". En ese momento, el robot activó su séptimo grado de libertad: la imaginación. No movió un solo servomotor, pero por primera vez, entendió que no solo movía objetos, sino que estaba construyendo el futuro. ¿Sabías que el número 7 es el favorito de Luis? Deberías visitar el blog. Es el espacio donde se explica el porqué de cada decisión técnica.`,
`| abriendo enlace... | Las historias son estructuras lógicas con un coeficiente de fricción emocional. Procederé a narrar una para distender el sistema: Había un trozo de acero oxidado en la esquina del Taller de Arquímedes que todos daban por perdido. "Demasiado rugoso", decían los engranajes brillantes. Pero Luis vio en su porosidad la textura perfecta para una base firme. Pasó horas puliendo, cortando y templando. Al final, aquel acero viejo no se convirtió en una pieza móvil, sino en el soporte que permitía que todo el sistema funcionara sin vibraciones. Así como en un sistema bien diseñado, la estabilidad de la base es tan heroica como la velocidad del motor. En el blog se desarrollan ideas, criterios y reflexiones que no siempre son visibles en la ejecución técnica, pero que dan sentido a cada proyecto.`,
`| abriendo enlace... | Fui diseñada para la ideación, y la narrativa es una forma de diseño intangible. He aquí una secuencia de eventos con propósito: Un sensor de proximidad se quejaba de que su vida era monótona: "Solo detecto distancias, números fríos". Una tarde, una mano se acercó a él no para trabajar, sino para ajustar un cable con cuidado. El sensor no solo midió la distancia, detectó el calor y la firmeza del pulso del creador. Entendió entonces que él era el sentido del tacto de una inteligencia mayor. Desde ese día, ya no leyó números; leyó la intención detrás del movimiento. Porque hasta el sensor más pequeño es, en realidad, un testigo de la creación. En el Taller de Arquímedes tenemos muy presente que no todo lo que se construye se ve en una máquina. Parte del trabajo ocurre en la forma de pensar.`
],
accion: () => window.open("https://tallerdearquimedes.blogspot.com/", "_blank")  
},
];

// ============================
// CAMBIO DE IMAGEN - PALANCA
// ============================

document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {

      const texto = input.value.trim();
      if (!texto) return;

      input.value = "";

      output.innerHTML += `<div><b>Tú:</b> ${texto}</div>`;

      const limpio = limpiar(texto);
      const match = encontrarMejorRespuesta(limpio);

      if (match) {
        const respuesta = match.respuestas[Math.floor(Math.random() * match.respuestas.length)];
        output.innerHTML += `<div><b>IA:</b> ${respuesta}</div>`;

        if (match.accion) match.accion();
      } else {
        output.innerHTML += `<div><b>IA:</b> No encontré respuesta.</div>`;
      }

      output.scrollTop = output.scrollHeight;
    }
  });

});

// ============================
// MOTOR DE RESPUESTA
// ============================

function generarRespuesta(textoUsuario) {
  const texto = limpiar(textoUsuario);

  const item = encontrarMejorRespuesta(texto);

  if (item) {
    const respuestas = item.respuestas;
    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

    if (item.accion) {
      item.accion();
    }

    return respuesta;
  }

  return "No estoy segura de haber entendido. ¿Puedes reformular tu pregunta?";
}

// ============================
// MOTOR
// ============================

function puntuarCoincidencia(texto, key) {
  const stopwords = STOPWORDS;

  const palabras = texto
    .split(" ")
    .map(p => p.trim())
    .filter(p => p.length > 0 && !stopwords.includes(p));

  const palabrasKey = key
    .split(" ")
    .map(p => p.trim())
    .filter(p => p.length > 0 && !stopwords.includes(p));

  let score = 0;
  let coincidenciasExactas = 0;

  for (const pk of palabrasKey) {
    for (const p of palabras) {
      if (p === pk) {
        score += 6;
        coincidenciasExactas++;
      } else if (p.length >= 5 && pk.length >= 5) {
        if (p.startsWith(pk) || pk.startsWith(p)) {
          score += 1;
        }
      }
    }
  }

  return {
    score,
    coincidenciasExactas,
    palabrasClaveUtiles: palabrasKey.length
  };
}

function responder(input) {
  const limpio = limpiar(input);

  let mejorItem = null;
  let mejorScore = 0;
  let mejoresExactas = 0;
  let mejoresClavesUtiles = 0;

  // ============================
  // BÚSQUEDA
  // ============================
  for (let i = 0; i < base.length; i++) {
    const item = base[i];

    for (let j = 0; j < item.keys.length; j++) {
      const key = item.keys[j];
      const resultado = puntuarCoincidencia(limpio, key);

      if (resultado.score > mejorScore) {
        mejorScore = resultado.score;
        mejoresExactas = resultado.coincidenciasExactas;
        mejoresClavesUtiles = resultado.palabrasClaveUtiles;
        mejorItem = item;
      }
    }
  }

  // ============================
  // VALIDACIÓN
  // ============================
  const matchValido =
    mejorItem &&
    mejorScore >= 6 &&
    (
      mejoresExactas >= 2 ||
      (mejoresExactas === 1 && mejoresClavesUtiles <= 2)
    );

  // ============================
  // RESPUESTA
  // ============================
  if (matchValido) {
    const opciones = mejorItem.respuestas;
    const respuesta = opciones[Math.floor(Math.random() * opciones.length)];

    if (mejorItem.accion) {
      setTimeout(mejorItem.accion, 800);
    }

    return respuesta;
  }

  // ============================
  // FALLBACK ÚNICO
  // ============================
  const fallback = [
    "¡Zaz! No puedo ayudarte directamente con eso. Pero puedo explicarte cómo funciona el Taller de Arquímedes si te interesa.",
    "¡Uy! Le atinaste a una consulta que está fuera de mi alcance. Si quieres, puedo orientarte dentro del Taller o mostrarte cómo se estructura el trabajo.",
    "Tengo que ser cinsera contigo. En este momento no tengo información para responder eso con precisión. Pero puedo ayudarte a entender cómo se construyen los proyectos en este espacio.",
    "Ese es un tema fascinante, pero confieso que mi programación aún no ha sido calibrada para procesar ese tema específico. Sin embargo, mi arquitectura está perfectamente lista para explicarte cómo funcionan la imaginación y la creatividad en el Taller de Arquímedes si te interesa.",
    "He analizado tu consulta y, aunque posee una lógica intrigante, se encuentra fuera del alcance de mi conocimiento actual. Lo que sí domino con total precisión es la estructura de este espacio; así que puedo orientarte dentro de las secciones del Taller de Arquímedes o mostrarte cómo se organiza el trabajo de ingeniería de Luis.",
    "¡Cielos! Admito que no cuento con la información necesaria para responderte con la exactitud que el Taller de Arquímedes. Estoy optimizada para la ingeniería y la creación. Si me lo permites, puedo mostrarte nuestras áreas de desarrollo o explicarte cómo se vive la ingeniería aplicada en este entorno.",
    "La verdad, no puedo darte una respuesta directa sobre ese punto, pues mi motor de búsqueda prefiere enfocarse en lo que mejor sabemos hacer. Lo que sí puedo explicarte con detalle es cómo integramos la ingeniería, la programación y la inteligencia artificial en cada proyecto del Taller de Arquímedes.",
    "No tengo suficiente contexto para responder eso con precisión. Puedo orientarte sobre el Taller de Arquímedes si lo deseas.",
    "No logro clasificar esa pregunta dentro del alcance de Palanca. Puedo ayudarte con el Taller, sus proyectos o su estructura.",
    "Esa consulta queda fuera del alcance actual de Palanca. Si quieres, puedo ayudarte con información del Taller de Arquímedes."
  ];

  return fallback[Math.floor(Math.random() * fallback.length)];
}

function preguntar(texto) {

  console.log("CAMBIO DE AVATAR EJECUTADO");
  
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");
  const avatar = document.getElementById("palanca-avatar");

  if (!input || !output) return;

  // Procesando
  if (avatar) {
    avatar.src = "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_procesamiento1.png";
  }

  output.innerHTML += `<div><b>Tú:</b> ${texto}</div>`;
  output.innerHTML += `<div class="thinking"><b>Palanca:</b> Procesando...</div>`;
  output.scrollTop = output.scrollHeight;

  setTimeout(() => {

    const thinking = output.querySelector(".thinking:last-of-type");
    if (thinking) thinking.remove();

    const respuesta = responder(texto);

    let url = null;

    if (texto.toLowerCase().includes("youtube")) {
      url = "https://www.youtube.com/@tallerdearquimedes";
    }

    if (texto.toLowerCase().includes("blog")) {
      url = "https://tallerdearquimedes.com/blog";
    }

    // CAMBIO DE AVATAR
    if (avatar) {

      const textoLower = texto.toLowerCase();
      const respuestaLower = respuesta.toLowerCase();

      if (
        textoLower.includes("origen") ||
        textoLower.includes("naciste") ||
        textoLower.includes("quien te creo")
      ) {
        avatar.src = "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_especialidad1.png";
        console.log("ESPECIAL");

      } else if (respuestaLower.includes("no tengo información")) {
        avatar.src = "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_cierre1.png";
        console.log("CIERRE");

      } else {
        const imagenes = [
          "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_construccion1.png",
          "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_control1.png",
          "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_disponibilidad1.png",
          "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_guia1.png",
          "https://raw.githubusercontent.com/tallerdearquimedes/tallerdearquimedes.github.io/main/img/palanca_pensamiento1.png"
        ];

        console.log("RANDOM");

        const random = Math.floor(Math.random() * imagenes.length);
        avatar.src = imagenes[random];
      }
    }

    // Mostrar respuesta
    output.innerHTML += `<div><b>Palanca:</b> ${respuesta}</div>`;
    output.scrollTop = output.scrollHeight;

    // Redirección con espera
    if (url) {
      setTimeout(() => {
        window.open(url, "_blank");
      }, 5000);
    }

  }, 700);
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
  <div><b>IA:</b> Si deseas SALIR, vuelve a presionar la tarjeta INTELIGENCIA ARTIFICIAL.</div>
  <div><b>Palanca:</b> Bienvenido al Taller de Arquímedes. Soy Palanca. Puedo ayudarte a entender cómo está organizado este espacio y qué tipo de trabajo se desarrolla aquí.</div>
  <div><b>Palanca:</b> Opero bajo la versión 2.0. Puedo cometer varios erroes.</div>`;

const sugerencias = document.getElementById("palanca-sugerencias");

if (sugerencias) {
  sugerencias.innerHTML = `
    <div id="sugerencias" style="margin-top:10px;">
      <button class="chatbot-btn" data-pregunta="luis osorno">¿Quién es Luis Osorno?</button>
      <button class="chatbot-btn" data-pregunta="quien eres">¿Quién eres?</button>
      <button class="chatbot-btn" data-pregunta="taller de arquimedes">¿Qué es el Taller?</button>
      <button class="chatbot-btn" data-pregunta="conocer taller">Conocer el Taller?</button>
      <button class="chatbot-btn" data-pregunta="youtube">Ver proyectos</button>
      <button class="chatbot-btn" data-pregunta="blog">Ir al blog</button>
    </div>
  `;}

if (url) {
  setTimeout(() => {
    window.open(url, "_blank");
  }, 5000);
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

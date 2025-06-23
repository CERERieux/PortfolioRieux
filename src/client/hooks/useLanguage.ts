import { useEffect, useState } from "react";
import { useSettingStore } from "../store/settingPortfolio";

type Projects =
  | "Home"
  | "HomeBottom"
  | "HomeMisc"
  | "MenuProject"
  | "DemoMenuTitles"
  | "GameMenuTitles"
  | "MainMenuTitles"
  | "ProfileMenuTitles"
  | "Shortener"
  | "Sudoku"
  | "SugAndIssues"
  | "SugAndIssuesMisc"
  | "PomClock"
  | "Markdown"
  | "Calculator"
  | "Converter";
interface UseLanguageProps {
  project: Projects;
}

const TEXT_FILLER = {
  English: {
    Home: [
      "Welcome, I'm Erik Rodriguez!",
      "From Mexico, Mexico City.",
      "Projects",
      `This project gives you a small space where you can share a bit about yourself to other people!

I could say it's like a demo for a simple system where users can share review books (or anything) that they have read. When you visit a profile, you can see what books this user have in their library and their bio (if they have share anything).
As user, aside from your library, you can have your personal notes, look the short links you have created through my Shortener URL and check the issues or suggestions that you have made, in a personal space.
`,
      "(You need to create an account, but you only need an username and a password, no email or that kind of data!)",
      "Shortener URL",
      `This project let you create short links!
You enter your long link and I will give you an 8 character string.
If you have an account and you are logged in, your short link will be saved into your account, you do not have to worry about it if you forget.

You can find more info in the page.`,
      `A Sudoku game!
At the start, you get 1 random puzzle out of 7, the difficulty can vary, maybe you get an easy 1, maybe you get the hardest from the 7. Give it a try and test your luck and mind!
For more, you can press the button at the top inside the page. It contains more info about the game, like the rules.

Good luck and have fun!`,
      "Demo Projects",
      `Here you can find some of the exercises I did for the FreeCodeCamp certifications with some modifications and styles added.
From the ones I think are the best to show, whether it's for the style or utility, like the Pomodoro Clock or the Translator between UK English and USA English.
To the simpler ones, like just a machine that display quotes that I get from an API.
You can see what main tools I used for each demo when you hover the preview window.
I thought in putting a description for each demo, but I think the title of each exercise and this little introduction can be enough. 
But if at the end I feel the project needs more info or an introduction, it will be available at the top of each page, next to the main title.`,
      `I invite you to check some of my projects above.
If you already did, thank you. I appreciate the opportunity you are giving me by doing so!
Oh! If you have a recommendation or issue, remember you can post it in the `,
      "Corner of Issues & Suggestions",
      `.
You can find it in the menu at the top right or clicking in the link of this paragraph.`,
    ],
    HomeBottom: [
      "About me!",
      "Hi! I'm Erik or known as Rieux by my friends. :)",
      "I studied 3 years at the Higher School of Computing (ESCOM in Spanish)",
      `, but due personal issues, by mid-2019, I decided to drop out.
After settling those issues, I decided to resume my studies by myself.`,
      "I realized that solving problems through programming is something I really like",
      ", or I find myself coming back to this haha.",
      "Between my successes, I can share that ",
      `I was in the honor roll of the ESCOM.
I led teams in school projects`,
      ", for some reason I ended up in the leading position most of the time. I don't mind it and it lets me know better the people around me. ",
      "And I helped my classmates to understand the subjects.",
      "Usually they were the ones who asked me for help.",
      "After having experienced my first job as a web developer, ",
      "Seeing a system working, is nice and makes me want to continue giving my best to give a quality result. ",
      `So I would like to enter into a new company to`,
      "exploit my skills to the best of my ability, helping through programming and building a product that helps people to satisfy their needs!",
    ],
    HomeMisc: [
      "Tools I can use.",
      "And trying to learn more!",
      "Portfolio made by Erik ",
      "(CERERieux on GitHub!)",
      "Background made by ",
      "Projects",
      "About Me",
      "Contact",
      "Contact Me!",
      `You can contact me through my LinkedIn or email!
You can find those at the top of the home page or you can click the following buttons:`,
      `I prefer this way than doing a personalized form.
I think it can be easier to contact me and for me to know that someone is trying to reach out to me.
I'll contact you back as soon as I can! And thanks for check out my portfolio.`,
      "Close",
      "Erik's Portfolio - Jr. Full Stack Developer and Programmer",
    ],
    MenuProject: [
      "Projects",
      `Thanks for checking my demos if you do!
And if you have a recommendation or issue, remember you can post it in the Corner of Issues & Suggestions.`,
      `(All the sections in this portfolio are FCC certificate exercises, except for the home page and the user system.
I modified them enough to be able to use them as 1 "system", I wanted to include them to show that after all the learning where you only do small programs, you could make something nice with them.
For it I decided to do my portfolio like this, where you can have an account with 1 library, notes, short links and post your recommendations or issues with the whole app.
Also a game that you can play and a very few demos that you really could use for personal use. 
I decided to omit some exercises, like the anonymous board where anyone can post anything in some threads, because in the long run, I didn't wanted to moderate the content that users could post. I prefer to use that time to learn more and do better apps.)`,
      "You can check my ",
      "FCC certifications here!",
    ],
    DemoMenuTitles: [
      "Projects Menu",
      "Pomodoro Clock",
      "UK-USA Translator",
      "Markdown Parser",
      "Calculator",
      "Unit Converter",
      "Drum Machine",
      "Quote Machine",
      "Back",
      "Background made by ",
    ],
    GameMenuTitles: ["Sudoku", "Back"],
    MainMenuTitles: [
      "Home",
      "Your Profile",
      "Shortener URL",
      "Game",
      "Demo Projects",
      "Issues & Suggestions",
      "Log In",
      "Log Out",
    ],
    ProfileMenuTitles: [
      "Profile Menu",
      "Library",
      "Notes",
      "URLs",
      "Issues",
      "Back",
      "Looks like this user hasn't put any book in their library.",
      "Loading user library...",
      "Loading user...",
    ],
    Shortener: [
      "Shortener URL",
      "Welcome to my shortener of links!",
      "Here you can send me your very ",
      "very ",
      `long link and I'll send you in return a short link.
The way to use it,`,
      " you have to go to ",
      " and add your short Link at the end!",
      "This way you can share those tedious and long links in a shorter way!",
      `Oh! And if you have an account in my portfolio and you are logged in,
your can view all the short links you have made so you don't have to remember each one of them!`,
      `Don't worry, I don't collect any personal data or I do not do any way of tracking with this tool.
I only did it because I thought would be nice to learn how to do my personal shortener link and use it from time to time.
Remember to be careful with links on internet!`,
      "Short URL",
      "Original URL",
      "Enter your link here!",
      "Create!",
    ],
    Sudoku: [
      "Sudoku Rules",
      "- You only can enter 1 number per square.",
      "- Numbers only can go from 1 to 9.",
      "- Do not repeat the same number in a column, a row and an area.",
      "(Areas are squares of 3x3, in this case, each area have an unique color to easily spot them.)",
      `You win if you can fill the 9x9 grid with 0 errors!
There are 7 different puzzles and 1 is picked randomly. You can use the options on the left to interact with the game.`,
      "Good luck and have fun!",
      "Solve",
      "Verify Coord",
      "New Sudoku",
      "Reset",
      "Please ensure that the coordinate is a valid one. Example: A1, B3, I9, etc.",
      "Please, only put valid values in the number field. Example: 1,4,5,9.",
      "Verify a Coordinate",
      `This only verify if the input you want to do is valid in the current Sudoku!
It doesn't reveal if it's actually correct or not.`,
      "Coordinate",
      "Number",
      "Verify",
      "Result",
      "It's a valid value",
      "Invalid value",
      "Your input conflict in",
      "Are you sure do you want the answer of this Sudoku?",
      "Cancel",
      "Solve",
      "Are you sure do you want to reset this Sudoku?",
      "Reset",
    ],
    SugAndIssues: [
      "Corner of Issues and Suggestions",
      `This is a place where you can send me your recommendations or complaints about my portfolio! 
Something in the visual interface bothers you? Send your comment.
There is a bug or an error that you found while using my portfolio? Let me know and I'l try to fix it as quickly as possible.
Do you have an idea that you think will be great to add? Post it here.
Do not doubt to send your issue or suggestion, it's very likely I will read it. And thanks for reading and using this app if you do!`,
      "Add New Comment",
      "Filter",
      "There is no result that coincide with your search!",
      "Loading",
      "Project",
      "Title",
      "Description",
      "Created By",
      "Status",
      "Any",
      "Pending",
      "Read",
      "Trying to fix",
      "Completed",
      "Ignored",
      "Created On",
      "Updated On",
      "Reset Filter",
      "Issue",
    ],
    SugAndIssuesMisc: [
      "Your comment was sent successfully! I'll try to read it, later!",
      "Please don't leave required fields empty.",
      "Send me your comment here!",
      "Project",
      "Title",
      "Description",
      "Send it!",
      "Cancel",
      "Note",
      `Issues sent only can be deleted by me. And only I can update its status.
Have in mind this when you send your issue or suggestion!`,
      "Description of your issue or suggestion here!",
    ],
    PomClock: [
      "Pomodoro Clock",
      "What is a Pomodoro Clock?",
      "More than a clock, it's a technique!",
      "Developed by Francesco Cirillo",
      " in the late 1980s, the Pomodoro technique is a ",
      "time management method",
      " where it uses a kitchen timer to break ",
      "work",
      " into intervals, typically ",
      "25 minutes",
      " in length, separated by ",
      "short breaks",
      ", typically ",
      "5–10 minutes",
      " in length.",
      "In the case of this clock, you can put ",
      " and ",
      " sessions of 60 minutes at maximum and 1 minute at minimum.",
      "An alarm will be set off when a session ends, to indicate you that you can start work again, or take a small break from your activity!",
      "You need to pause the clock if you want to modify the session length.",
      "Photo from",
      "on",
      "Image from",
    ],
    Markdown: [
      "Are you sure do you want to delete the content?",
      "Cancel",
      "Delete",
      "Markdown parser",
      "What is Markdown?",
      "Markdown is a ",
      "lightweight markup language",
      " that you can use to add formatting elements to plaintext text documents.",
      "Created by John Gruber in 2004",
      ", Markdown is now one of the world's most popular markup languages.",
      "I left you an example of how to use Markdown in the text area located on the top of the screen and how the result looks like in the preview under it!",
      "You can expand the preview zone with the ",
      "green button",
      " located on the right side of the screen.",
      "If you want start a clean document, just delete the content with the ",
      "yellow button",
      ", after confirm that you want to delete the content, the text area will be clean and ready to display your inputs!",
      "Or you can edit the current example.",
      "Enter your content in the next area, the results will be shown below.",
      "Delete Content",
      "Expand",
      "Minimize",
      `# Markdown Parser
## A preview of what you can do with Markdown!

You can put a link that send you to a Youtube video: [OMORI - Forest Frenzy](https://www.youtube.com/watch?v=r4XqG6nnvkY).
(**Note:** This link will not open a new window...)  

You can put a bit of code, look: \`let x = 9\`.

\`\`\`
// You can also do a multi-line code:
function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
        return multiLineCode;
    }
}
\`\`\`

An unordered list item:
- Flowers
- Sugar
  - Brown
  - Refined
  - Colored
- Eggs

An ordered list item:
1. Please break the egg and separate the yolk.
2. Mix with flour until you have a solid dough.

A blockquote:
>A person who never made a mistake never tried anything new 
*-Albert Einstein*

An image of mountains:
![The Everest](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1024px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg)*A stunning view of a mountain.*`,
    ],
    Calculator: [
      "Calculator",
      "This calculator is a simple one, but you can control it with the keyboard!",
      "Controls:",
      "- Use ",
      "Space",
      " key to turn ON the calculator.",
      "- Use any ",
      "Numerical Key",
      " for digits from 0 to 9.",
      "Backspace",
      " key to delete your last input.",
      "Esc",
      " key to reset the display.",
      "Symbol Keys",
      " for operations (., +, -, *, /).",
      "Enter",
      " key to get the result of your operation.",
      "Turn ON the calculator to use",
      "Log:",
    ],
    Converter: [
      "What do you want to convert to?",
      "(If input is left empty, it will take '1' as the base unit.)",
      "Convert",
      "Result:",
      "Your result will be shown here!",
    ],
  },
  Español: {
    Home: [
      "Bienvenido, soy Erik Rodriguez!",
      "Soy de México, Ciudad de México.",
      "Proyectos",
      `Este proyecto te da un pequeño espacio donde puedes compartir un poco sobre ti a otra gente!

Podría decir que es como una demostración para un sistema simple, donde los usuarios pueden compartir sus reseñas de libros (o cosas en general) que hayan leído. Cuando visitas un perfil, puedes ver las reseñas de los libros que el usuario ha compartido, y un poco sobre la persona (si esta ha compartido algo).
Como usuario, además de tu librería, puedes tener notas personales, mirar los links cortos que has creado a través de mi Acortador de URL y revisar los problemas o sugerencias que has hecho, en un espacio personal. 
`,
      `(Necesitarás crear una cuenta, pero solo necesitas un nombre de usuario y una contraseña, no email o ese tipo de información!) 
(Solo disponible en Inglés.)`,
      "Acortador de URL",
      `Este proyecto te permite crear links cortos!
Tu ingresas tu link largo y te daré una cadena de 8 caracteres.
Si tienes una cuenta y estás conectado en ella, tu link corto será guardado en esta, no tendrás que preocuparte si llegas olvidar tu link.

Puedes encontrar más información dentro de la página.`,
      `Un juego de Sudoku!
Al principio te mostraré 1 de los 7 posibles sudokus, la dificultad puede variar, tal vez te toque uno fácil, tal vez tengas que resolver el más difícil de los 7. ¡Dale una oportunidad y pon a prueba tu suerte y habilidad mental!
Para más información, puedes presionar el botón hasta arriba dentro de la página. Contiene información acerca de las reglas del juego.

¡Buena suerte y que te diviertas!`,
      "Proyectos de demostración",
      `Aquí podrás encontrar algunos de los ejercicios de FreeCodeCamp que hice para las certificaciones de la página, con algunas modificaciones y estilización añadida.
Desde los que pienso son los mejores para mostrar, ya sea por la utilidad o por como se ve visualmente, como el Reloj Pomodoro o el Traductor de Inglés Britanico a Inglés Estadounidense.
Hasta los muy simples, como una máquina que solo muestra frases obtenidas de una API.
Puedes ver las herramientas principales que usé para cada demostración cuando pasas el cursor encima de la vista previa.
Pensé en poner una descripción para cada demostración, pero creo que el título de cada ejercicio y esta introducción es suficiente. 
Si pienso que el proyecto necesita más información o introducción, esta estará en un botón en la parte superior de cada página, al lado del título principal.`,
      `Te invito a que revises algunos de mis proyectos.
Y si ya lo hiciste, gracias, ¡Aprecio la oportunidad que me estas dando al hacerlo!
¡Cierto! Si tienes una recomendación o problema, recuerda que puedes compartirla en el `,
      "Rincón de Problemas y Sugerencias",
      `.
Puedes encontrarlo en el menú en la parte superior derecha o haciendo clic en el link de este párrafo.`,
    ],
    HomeBottom: [
      "Sobre Mí!",
      "Hola! Soy Erik o conocido como Rieux por mis amigos. :)",
      "Estudié 3 años en la Escuela Superior de Computación ESCOM",
      `, pero por problemas personales, a mediados de 2019, decidí abandonar la escuela.
Después de resolver estos problemas, decidí retomar mis estudios pero por mi cuenta.`,
      "Descubrí que resolver problemas a través de la programación es algo que me gusta mucho",
      ", o me encuentro volviendo a esto todo el rato jaja.",
      "Entre mis logros, puedo compartir que ",
      `fui parte del cuadro de honor de la ESCOM.
Fui líder en mis proyectos escolares`,
      ", por alguna razón terminaba estando en esa posición la mayoría de las veces. No me molesta ya que me permite conocer mejor a las personas a mi alrededor.",
      "Y ayudaba a mis compañeros a entender los temas de las clases.",
      "Por lo general eran ellos los que se acercaban a mí a preguntar sobre ello.",
      "Después de haber experimentado mi primer trabajo como desarrollador web, ",
      "ver un sistema funcionando, es bonito y dan ganas de seguir dando lo mejor para dar un resultado de calidad.",
      `Así que me gustaría entrar a una nueva empresa para`,
      "explotar mis habilidades lo mejor posible, ayudando mediante la programación y construyendo un producto que ayudé a la gente a satisfacer sus necesidades!",
    ],
    HomeMisc: [
      "Herramientas que puedo usar",
      "Y tratando de aprender más!",
      "Portafolio hecho por Erik ",
      "(CERERieux en GitHub!)",
      "Fondo hecho por ",
      "Proyectos",
      "Sobre Mí",
      "Contacto",
      "Contactame!",
      `Puedes contactar conmigo a través de LinkedIn o correo.
Puedes encontrar esos medios hasta arriba de la página o puedes hacer clic en los siguientes botones:`,
      `Prefiero esta forma que hacer un formulario personalizado.
Pienso que es más fácil contactarme y para mi saber que alguien está tratando de mandarme un mensaje.
Te responderé lo más rápido que pueda! Y gracias por revisar mi portafolio.`,
      "Cerrar",
      "Portafolio de Erik - Jr. Full Stack Developer y Programador",
    ],
    MenuProject: [
      "Proyectos",
      `¡Gracias de antemano si revisas una de mis demostraciones!
Si tienes una recomendación o problema, recuerda compartirla en el Rincón de Problemas y Sugerencias.
Y si el título está en Inglés, entonces no está disponible en Español, como el traductor.`,
      `(Todas las secciones en este portafolio son certificaciones de FCC, excepto la página inicial y el sistema de cuentas.
Modifiqué los ejercicios lo suficiente para poder usarlos como 1 “sistema”, quería incluirlos de alguna manera para mostrar que después de hacer ejercicios pequeños, podrías hacer algo bueno con ellos.
Por ello decidí hacer mi portafolio de esta manera, donde podrías con una cuenta tener 1 librería, notas, links cortos y compartir tus recomendaciones y problemas con la app en su totalidad.
También un juego que puedas jugar y algunas demostraciones que sí podrían ser de uso personal.
Decidí omitir algunos ejercicios de certificación, como un tablero anónimo donde los usuarios pueden publicar lo que sea en hilos, porque a la larga no quería moderar el contenido que los usuarios podrían compartir. Prefiero usar ese tiempo en aprender más y mejorar mi trabajo.)`,
      "Puedes ver mis ",
      "certificaciones de FCC aquí!",
    ],
    DemoMenuTitles: [
      "Menu Proyectos",
      "Reloj Pomodoro",
      "UK-USA Translator",
      "Analizador Markdown",
      "Calculadora",
      "Convertidor de Unidades",
      "Drum Machine",
      "Quote Machine",
      "Atrás",
      "Fondo hecho por ",
    ],
    GameMenuTitles: ["Sudoku", "Atrás"],
    MainMenuTitles: [
      "Inicio",
      "Tu Perfil",
      "Acortador de URL",
      "Juego",
      "Proyectos Demostración",
      "Sugerencias y Problemas",
      "Iniciar Sesión",
      "Cerrar Sesión",
    ],
    ProfileMenuTitles: [
      "Menu Perfil",
      "Librería",
      "Notas",
      "URLs",
      "Problemas",
      "Atrás",
      "Parece que esta persona no tiene libros en la Librería.",
      "Cargando Librería",
      "Loading perfil...",
    ],
    Shortener: [
      "Acortador de URL",
      "Bienvenido a mi acortador de links!",
      "Aquí puedes mandarme tu link muy ",
      "muy",
      ` largo y te mandaré de vuelta un link corto.
La forma de usarlo,`,
      " tienes que ir a ",
      " y añadir tu link corto al final!",
      "De esta forma puedes compartir esos tediosos y largos links en una forma sencilla!",
      `Oh! Si tienes una cuenta en mi portafolio y estás conectado en ella, 
      puedes ver todos los links cortos que has creado, así no tienes que acordarte de ellos!`,
      `No te preocupes, no guardo datos personales o hago algún tipo de rastreo con esta herramienta.
Solo lo hice porque pensé que sería bueno aprender a hacer mi propio acortador de links y usarlo a veces.
Recuerda ser cuidadoso con los links que veas en internet!`,
      "URL Corto",
      "URL Original",
      "¡Introduce tu link aquí!",
      "¡Crear!",
    ],
    Sudoku: [
      "Reglas de Sudoku",
      "- Solo puedes poner 1 número por casilla.",
      "- Los números solo pueden ir del 1 al 9.",
      "- No repitas el mismo número en una fila, columna y área.",
      "(Áreas son cuadros de 3x3, en este caso, cada área tiene un color único para facilitar su identificación.)",
      `¡Ganas cuando hayas completado todas las casillas con 0 errores!
Hay 7 diferentes tableros y 1 es elegido al azar. Puedes usar los botones en la izquierda para interactuar con el juego.`,
      "Buena suerte y diviértete.",
      "Resolver",
      "Verificar Coord",
      "Nuevo Sudoku",
      "Reiniciar",
      "Por favor verifica que la coordenada es válida. Ejemplo: A1, B3, I9, etc.",
      "Por favor solo pon valores válidos en la casilla “Número”. Ejemplo: 1,4,5,9.",
      "Verificar una Coordenada",
      `Esta opción solo verifica si el valor que quieres introducir es válido en el tablero actual. 
No revela si el número es correcto o no.`,
      "Coordenada",
      "Número",
      "Verificar",
      "Resultado",
      "Es un número valido",
      "Número invalido",
      "Tu respuesta conflictúa en",
      "¿De verdad quieres ver la respuesta de este Sudoku?",
      "Cancelar",
      "Resolver",
      "¿Quieres reiniciar este Sudoku?",
      "Reiniciar",
    ],
    SugAndIssues: [
      "Rincón de problemas y sugerencias",
      `Este es un lugar donde me puedes mandar tus recomendaciones y quejas acerca de mi portafolio!
¿Algo en la interfaz visual te molesta? Mandame tu comentario.
¿Hay un error que encontraste usando mi portafolio? Házmelo saber y trataré de corregirlo lo más rápido posible.
¿Piensas que tu idea es buena y quisieras verla aquí? Compártela aquí.
No dudes en mandar tus problemas y sugerencias, es muy probable que lo leeré. ¡Y gracias de antemano si es que lees esto y usas mi app!`,
      "Añadir Commentario Nuevo",
      "Filtro",
      "¡No hay resultado que coincida con tu búsqueda!",
      "Cargando",
      "Proyecto",
      "Título",
      "Descripción",
      "Autor",
      "Estado",
      "Cualquiera",
      "Pendiente",
      "Leído",
      "Tratando de arreglar",
      "Completado",
      "Ignorado",
      "Creado",
      "Actualizado",
      "Reiniciar Filtro",
      "Tema",
    ],
    SugAndIssuesMisc: [
      "Tu comentario fue mandado correctamente! Trataré de leerlo luego.",
      "Por favor no dejes campos requeridos vacíos.",
      "¡Mandame tu comentario aquí!",
      "Proyecto",
      "Título",
      "Descripción",
      "¡Mandar!",
      "Cancelar",
      "Nota",
      `Los problemas que se mandan, solo pueden ser borrados por mi. 
Y soy el único que puede actualizar el estado de la petición.
¡Ten en mente esto cuando mandes tu comentario!`,
      "¡Descripción de tu problema o sugerencia aquí!",
    ],
    PomClock: [
      "Reloj Pomodoro",
      "¿Qué es un Reloj Pomodoro?",
      "¡Más que un reloj, es una técnica!",
      "Desarrollada por Francesco Cirillo",
      " a finales de los 80, la técnica Pomodoro es un ",
      "método de gestión de tiempo",
      " el cual usa un reloj de cocina para romper el ",
      "trabajo",
      " en intervalos, por lo general de ",
      "25 minutos",
      ", separados por periodos de ",
      "cortos descansos",
      ", típicamente de ",
      "5–10 minutos",
      " de longitud",
      "En caso de este reloj, tú puedes definir el ",
      " y los ",
      ", con un máximo de 60 y mínimo de 1 minuto para ambos intervalos.",
      "Una alarma iniciará cuando un periodo acabe, para indicar que puedes descansar o trabajar de nuevo en tu actividad!",
      "Necesitas pausar el reloj si quieres modificar la longitud de los periodos.",
      "Foto de",
      "en",
      "Imagen de",
    ],
    Markdown: [
      "¿Quieres borrar el contenido?",
      "Cancelar",
      "Borrar",
      "Analizador Markdown",
      "¿Qué es Markdown?",
      "Markdown es un ",
      "lenguaje de marcado ligero",
      " que se usa para añadir formato a textos simples.",
      "Creado por John Gruber en 2004",
      ", Markdown es uno de los lenguajes de marcado más populares en el mundo.",
      "Te dejo un ejemplo de como usar Markdown en el área de texto, ubicado en la parte superior de la pantalla y como el resultado se ve en la parte inferior!",
      "Puedes expandir la zona de vista previa con el ",
      "botón verde",
      " ubicado en la parte de la derecha.",
      "Puedes empezar con un documento limpio borrando el contenido con el ",
      "botón amarillo",
      ". Después de confirmar que quieres borrar el contenido, el área de texto estará limpia y lista para mostrar tu contenido!",
      "O puedes editar el ejemplo.",
      "Introduce tu contenido en el área de al lado, tus resultados se mostrarán abajo.",
      "Borrar Contenido",
      "Expandir",
      "Minimizar",
      `# Analizador Markdown
## Un adelanto de lo que puedes hacer con Markdown!


Puedes poner un link que te redirige a un video de Youtube: [OMORI - Forest Frenzy](https://www.youtube.com/watch?v=r4XqG6nnvkY).
(**Nota:** Este link no abrirá una ventana nueva...)  


Puedes poner un poco de código, mira: \`let x = 9\`.


\`\`\`
// También puedes poner múltiples líneas de código:
function otroEjemplo(primeraLinea, ultimaLinea) {
    if (primeraLinea == '\`\`\`' && ultimaLinea == '\`\`\`') {
        return codigoMultilinea;
    }
}
\`\`\`


Una lista desordenada de objetos:
- Flores
- Azúcar
  - Café
  - Refinada
  - Coloreada
- Huevos


Una lista ordenada de objetos:
1. Por favor rompa el huevo y separe la yema.
2. Mezcle con harina hasta que obtenga una masa sólida.


Una cita:
>Una persona que nunca ha cometido un error nunca ha intentado algo nuevo
*-Albert Einstein*


Una imagen de montañas:
![The Everest](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1024px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg)*Una hermosa vista de una montaña.*`,
    ],
    Calculator: [
      "Calculadora",
      "Esta es una calculadora simple, pero puedes controlarla con el teclado!",
      "Controles:",
      "- Usa la tecla ",
      "Espacio",
      " para encender la calculadora.",
      "- Usa cualquier ",
      "Tecla Numérica",
      " para los números de 0 a 9.",
      "Retroceder",
      " para borrar el último símbolo.",
      "Escape",
      " para reiniciar la pantalla de la calculadora.",
      "con los símbolos",
      " “.” , “+”, ”-”, ”*”, ”/” para las operaciones.",
      "Enter",
      " para obtener el resultado de tu operación.",
      "Prende la calculadora para usarla.",
      "Historial:",
    ],
    Converter: [
      "¿Qué quieres convertir?",
      "(Si el espacio se queda vacío, se tomará la unidad 1 como base)",
      "Convertir",
      "Resultado:",
      "¡Tu resultado será mostrado aquí!",
    ],
  },
};

export function useLanguage({ project }: UseLanguageProps) {
  const [text, setText] = useState<string[]>([]);
  const { i18n } = useSettingStore();
  useEffect(() => {
    setText(TEXT_FILLER[i18n][project]);
  }, [i18n]);
  return text;
}

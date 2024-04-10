import { useEffect, useState } from "react";
import { useSettingStore } from "../store/settingPortfolio";

type Projects = "Home" | "HomeBottom" | "HomeMisc" | "MenuProject";
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
As user, aside from your library, you can have your personal notes, look the short links you have created through my Shortener URL and check the issues or suggestions that you have made, in a personal space.`,
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
      "I don't possess any professional experience, but ",
      "I feel confident enough in my abilities to think that I'll be able to help in a company to reach their goals through my efforts.",
      `I think this after doing my portfolio and looking back at the school projects I did.
And at the same time, `,
      "fulfill my objective of helping people",
      ", by solving a problem through an app or service!",
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
    ],
    MenuProject: [],
  },
  Español: {
    Home: [
      "Bienvenido, soy Erik Rodriguez!",
      "Soy de México, Ciudad de México.",
      "Proyectos",
      `Este proyecto te da un pequeño espacio donde puedes compartir un poco sobre ti a otra gente!

Podría decir que es como una demostración para un sistema simple, donde los usuarios pueden compartir sus reseñas de libros (o cosas en general) que hayan leído. Cuando visitas un perfil, puedes ver las reseñas de los libros que el usuario ha compartido, y un poco sobre la persona (si esta ha compartido algo).
Como usuario, además de tu librería, puedes tener notas personales, mirar los links cortos que has creado a través de mi Acortador de URL y revisar los problemas o sugerencias que has hecho, en un espacio personal.`,
      "(Necesitarás crear una cuenta, pero solo necesitas un nombre de usuario y una contraseña, no email o ese tipo de información!)",
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
      "No poseo experiencia profesional, pero ",
      "me siento lo suficiente confiado en mis habilidades para pensar que soy capaz de ayudar a una empresa a realizar sus metas a través de mi esfuerzo.",
      `Estoy seguro por los proyectos escolares que hice y mis proyectos mostrados aquí.
Al mismo tiempo, `,
      "podré cumplir mi meta de ayudar a la gente",
      ", resolviendo los problemas a través de una app o un servicio!",
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
    ],
    MenuProject: [],
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

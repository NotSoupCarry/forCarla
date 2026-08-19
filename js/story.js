// ══════════════════════════════════════════════════════════════
//  AVATAR
//  Mappa "nome espressione" → file immagine. Cambia qui i percorsi
//  per usare le tue immagini. "default" è quello usato quando una
//  scena non specifica nessun avatar.
// ══════════════════════════════════════════════════════════════
export const AVATARS = {
  default:   "assets/avatar.jpg",
  narrator: "assets/avatarNarrator.jpg",
  happy:    "assets/avatarHappy.jpg",
  sad:      "assets/avatarSad.jpg",
};

// ══════════════════════════════════════════════════════════════
//  LA STORIA  ←  è QUI che scrivi/modifichi il gioco
//
//  Ogni scena può avere (oltre a testo/scelte/avanti/finale/lettera):
//    avatar: AVATARS.sorpreso   → cambia l'avatar in questa scena
//  Se lo ometti, resta l'avatar di default.
//
//  Tipi di scena:
//   1) CON SCELTE   { testo:[...], scelte:[ {testo, vai} ] }
//   2) SOLO TESTO   { testo:[...], avanti:"scenaSuccessiva" }   → tasto "Continua"
//   3) FINALE       { testo:[...], finale:"..." }
//   4) LETTERA      { lettera:{ titolo, righe:[...], firma } }
//
//  La prima scena DEVE chiamarsi "start".
// ══════════════════════════════════════════════════════════════

export const story = {
  start: {
    avatar: AVATARS.narrator,
    testo: [
      "'Something is off lately... I feel happiness but i dont really remember why'",
      "",
    ],
    avanti: "start2"
  },
  start2: {
    avatar: AVATARS.narrator,
    testo: [
      "Something is off...",
      "Today is a very special day... you can feel it",
    ],
    avanti: "encounter"
  },

  encounter: {
    avatar: AVATARS.narrator,
    testo: [
      "You see something under your bed's blanket..",
      "might be your cat hiding there, it looks just like a little box.",
    ],
    scelte: [
      { testo: "You check in your bed", vai: "check_bed" },
      { testo: "You don't mind it",     vai: "go_to_pc" }
    ]
  },

  check_bed: {
    avatar: AVATARS.narrator,
    testo: [ 
      "You start getting closer and closer to the bed...",
      "something is moving under there..." 
    ],
    avanti: "founded"
  },

  founded: {
    avatar: AVATARS.default,
    testo: [
      "Hello... you are... here... I was waiting for you... I think...",
      "Sorry I don't remember your name... but something tells me you are very special to me...",
    ],
    suono: "assets/reveal.mp3", 
    avanti: "talk_with_him"
  },

  talk_with_him: {
    avatar: AVATARS.default,
    testo: [
      "Wait... Why are you crying?",
      "Oh... You wanted to tell me something... what's that?",
    ],
    scelte: [
      { testo: "«{frase}»",             vai: "reunion" },
      { testo: "Don't say anything and leave",    vai: "sad_end" }
    ]
  },

  reunion: {
    avatar: AVATARS.happy,
    testo: [
      "Wait... Carla... It's you... How could I forget",
    ],
    avanti: "happy_end"
  },

  happy_end: {
    avatar: AVATARS.happy,
    testo: [
      "I'm so happy to see you again... I was waiting for this moment for so long...",
      "It's been so long... I love you so much mi vida.",
      "Thank you for changing my life again..."
    ],
    avanti: "letter"
  },

  letter: {
    lettera: {
      titolo: "For Carla",
      righe: [
        "If you are reading this, it means that you have found me again... and you'll continue to find me a thousand times more.",
        "",
        "It's hard for me to find the words or to express my selft,",
        "but since i met you i knew you were a special one, one to take care of.",
        "I really like they way you are, and I am grateful for every moment, every text, every call we had together.",
        "",
        "I hope you liked this little game I made for you, it's truly nothing but I hope it made you smile a little.",
        "",
        "I really like you.",
        "«{frase}»"
      ],
      firma: "— with love, Soup"
    }
  },

  go_to_pc: {
    avatar: AVATARS.narrator,
    testo: [ 
      "You had a really long day, you are tired and you want to go to your pc to play some games...",
      "...so you leave the cat under the blanket" 
    ],
    avanti: "neutral_end"
  },

  neutral_end: {
    avatar: AVATARS.narrator,
    testo: [
      "You spend the day playing games and let yourself rest.",
      "It leaves a bitter feeling in you, but you don't pay it much attention.",
    ],
    finale: "Tomorrow is another day..."
  },

  sad_end: {
    avatar: AVATARS.sad,
    testo: [
      "Hey... w-w-where are you going?",
      "Please don't leave me...",
    ],
    finale: "Mi vida"
  }
};
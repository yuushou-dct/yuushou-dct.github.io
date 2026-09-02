const words = [
  "apple",
  "banana",
  "orange",
  "keyboard",
  "computer",
  "javascript",
  "python",
  "coding",
  "hello",
  "world",
  "mouse",
  "screen",
  "internet",
  "program",
  "game",
  "typing",
  "school",
  "friend",
  "music",
  "movie"
];


const wordElement =
  document.getElementById("word");

const correctElement =
  document.getElementById("correct");

const missElement =
  document.getElementById("miss");


let currentWord = "";
let currentIndex = 0;

let correct = 0;
let miss = 0;


// 文字の表示を更新

function updateWord(){

  let html = "";

  for(let i = 0; i < currentWord.length; i++){

    if(i < currentIndex){

      // すでに打った文字

      html +=
        `<span class="typed">${currentWord[i]}</span>`;

    }

    else if(i === currentIndex){

      // 今から打つ文字

      html +=
        `<span class="current">${currentWord[i]}</span>`;

    }

    else{

      // まだ打っていない文字

      html +=
        `<span class="remaining">${currentWord[i]}</span>`;

    }

  }

  wordElement.innerHTML = html;

}


// 次の単語

function nextWord(){

  const random =
    Math.floor(Math.random() * words.length);

  currentWord =
    words[random];

  currentIndex = 0;

  updateWord();

}


// キーボードを光らせる

function lightKey(key){

  const element =
    document.querySelector(
      `.key[data-key="${key}"]`
    );

  if(!element){
    return;
  }


  element.classList.add("active");


  setTimeout(function(){

    element.classList.remove("active");

  },100);

}


// キーボード入力

document.addEventListener("keydown", function(event){

  const key =
    event.key.toLowerCase();


  if(!/^[a-z]$/.test(key)){
    return;
  }


  lightKey(key);


  const answer =
    currentWord[currentIndex];


  // 正解

  if(key === answer){

    correct++;

    currentIndex++;


    correctElement.textContent =
      correct;


    updateWord();


    // 単語を全部入力

    if(currentIndex >= currentWord.length){

      setTimeout(function(){

        nextWord();

      },200);

    }

  }


  // 不正解

  else{

    miss++;


    missElement.textContent =
      miss;


    const element =
      document.querySelector(
        `.key[data-key="${key}"]`
      );


    if(element){

      element.classList.add("miss");


      setTimeout(function(){

        element.classList.remove("miss");

      },150);

    }

  }

});


// 最初の単語

nextWord();


// ============================
// 言語設定
// ============================

const translations = {

  ja: {

    title: "無料タイピング練習",

    correct: "正解：",

    miss: "ミス：",

    guideTitle:
      "タイピング練習のやり方",

    guideText:
      "画面に表示された文字をキーボードで入力してください。正しく入力すると次の文字へ進みます。間違えるとミスとしてカウントされます。楽しみながら繰り返し練習しましょう。"

  },


  en: {

    title:
      "Free Typing Practice",

    correct:
      "Correct: ",

    miss:
      "Mistakes: ",

    guideTitle:
      "How to Practice Typing",

    guideText:
      "Type the letters shown on the screen using your keyboard. When you type correctly, you move to the next letter. Incorrect keys are counted as mistakes. Keep practicing and enjoy improving your typing skills."

  },


  zh: {

    title:
      "免费打字练习",

    correct:
      "正确：",

    miss:
      "错误：",

    guideTitle:
      "打字练习方法",

    guideText:
      "请使用键盘输入屏幕上显示的文字。输入正确后会进入下一个字母。输入错误会被计为错误。通过反复练习，享受提高打字速度的过程。"

  },


  es: {

    title:
      "Práctica de mecanografía gratuita",

    correct:
      "Correcto: ",

    miss:
      "Errores: ",

    guideTitle:
      "Cómo practicar mecanografía",

    guideText:
      "Escribe con el teclado las letras que aparecen en la pantalla. Cuando escribas correctamente, pasarás a la siguiente letra. Las teclas incorrectas se cuentan como errores. Practica repetidamente y disfruta mejorando tus habilidades de mecanografía."

  },


  fr: {

    title:
      "Entraînement gratuit à la frappe",

    correct:
      "Correct : ",

    miss:
      "Erreurs : ",

    guideTitle:
      "Comment pratiquer la frappe",

    guideText:
      "Tapez avec votre clavier les lettres affichées à l'écran. Lorsque vous tapez correctement, vous passez à la lettre suivante. Les touches incorrectes sont comptées comme des erreurs. Entraînez-vous régulièrement et améliorez votre vitesse de frappe."

  },


  de: {

    title:
      "Kostenlose Tippübung",

    correct:
      "Richtig: ",

    miss:
      "Fehler: ",

    guideTitle:
      "So üben Sie das Tippen",

    guideText:
      "Geben Sie die auf dem Bildschirm angezeigten Buchstaben mit Ihrer Tastatur ein. Wenn Sie richtig tippen, gelangen Sie zum nächsten Buchstaben. Falsche Eingaben werden als Fehler gezählt. Üben Sie regelmäßig und verbessern Sie Ihre Tippfähigkeiten."

  },


  it: {

    title:
      "Esercizio di digitazione gratuito",

    correct:
      "Corretto: ",

    miss:
      "Errori: ",

    guideTitle:
      "Come esercitarsi con la digitazione",

    guideText:
      "Digita sulla tastiera le lettere visualizzate sullo schermo. Quando digiti correttamente, passi alla lettera successiva. I tasti errati vengono conteggiati come errori. Continua ad allenarti e migliora le tue abilità di digitazione."

  },


  pt: {

    title:
      "Prática de digitação gratuita",

    correct:
      "Correto: ",

    miss:
      "Erros: ",

    guideTitle:
      "Como praticar digitação",

    guideText:
      "Digite no teclado as letras exibidas na tela. Quando você digitar corretamente, passará para a próxima letra. As teclas incorretas serão contadas como erros. Continue praticando e aproveite para melhorar suas habilidades de digitação."

  }

};


// ============================
// 言語変更
// ============================

const language =
  document.getElementById("language");


language.addEventListener(
  "change",
  function(){

    const lang =
      translations[this.value];


    document.getElementById("title").textContent =
      lang.title;


    document.getElementById("correctText").textContent =
      lang.correct;


    document.getElementById("missText").textContent =
      lang.miss;


    document.getElementById("guideTitle").textContent =
      lang.guideTitle;


    document.getElementById("guideText").textContent =
      lang.guideText;

  }
);

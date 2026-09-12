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

const wordElement = document.getElementById("word");
const correctElement = document.getElementById("correct");
const missElement = document.getElementById("miss");

let currentWord = "";
let currentIndex = 0;
let correct = 0;
let miss = 0;


// 文字の表示を更新
function updateWord(){

  let html = "";

  for(let i = 0; i < currentWord.length; i++){

    if(i < currentIndex){

      html += `<span class="typed">${currentWord[i]}</span>`;

    }else if(i === currentIndex){

      html += `<span class="current">${currentWord[i]}</span>`;

    }else{

      html += `<span class="remaining">${currentWord[i]}</span>`;

    }
  }

  wordElement.innerHTML = html;
}


// 次の単語
function nextWord(){

  const random =
    Math.floor(Math.random() * words.length);

  currentWord = words[random];

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

  const key = event.key.toLowerCase();

  if(!/^[a-z]$/.test(key)){
    return;
  }

  lightKey(key);

  const answer = currentWord[currentIndex];


  // 正解
  if(key === answer){

    correct++;

    currentIndex++;

    correctElement.textContent = correct;

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

    missElement.textContent = miss;

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


const translations = {

  ja: {
    title: "無料タイピング練習",
    description: "無料でできるタイピング練習サイトです。英語のタイピングをゲーム感覚で練習できます。",
    correct: "正解：",
    miss: "ミス："
  },

  en: {
    title: "Free Typing Practice",
    description: "A free typing practice website. Practice English typing in a fun, game-like way.",
    correct: "Correct: ",
    miss: "Miss: "
  },

  zh: {
    title: "免费打字练习",
    description: "这是一个免费的打字练习网站。可以通过游戏的方式练习英语打字。",
    correct: "正确：",
    miss: "错误："
  },

  es: {
    title: "Práctica de mecanografía gratis",
    description: "Un sitio web gratuito para practicar mecanografía. Practica la mecanografía en inglés de forma divertida, como un juego.",
    correct: "Correcto: ",
    miss: "Errores: "
  },

  fr: {
    title: "Entraînement à la frappe gratuit",
    description: "Un site gratuit pour pratiquer la frappe au clavier. Entraînez-vous à taper en anglais de manière ludique, comme dans un jeu.",
    correct: "Correct : ",
    miss: "Erreurs : "
  },

  de: {
    title: "Kostenlose Tippübung",
    description: "Eine kostenlose Website zum Üben des Tippens. Üben Sie englisches Tippen auf spielerische Weise.",
    correct: "Richtig: ",
    miss: "Fehler: "
  },

  it: {
    title: "Esercizio di digitazione gratuito",
    description: "Un sito web gratuito per esercitarsi con la digitazione. Esercitati a digitare in inglese in modo divertente, come in un gioco.",
    correct: "Corretto: ",
    miss: "Errori: "
  },

  pt: {
    title: "Prática de digitação grátis",
    description: "Um site gratuito para praticar digitação. Pratique a digitação em inglês de forma divertida, como em um jogo.",
    correct: "Correto: ",
    miss: "Erros: "
  }

};


language.addEventListener("change", function(){

  const lang =
    translations[this.value];

  document.getElementById("title").textContent =
    lang.title;

  document.getElementById("description").textContent =
    lang.description;

  document.getElementById("correctText").textContent =
    lang.correct;

  document.getElementById("missText").textContent =
    lang.miss;

  // 言語選択からフォーカスを外す
  language.blur();

});

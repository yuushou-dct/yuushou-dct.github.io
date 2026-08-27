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

      // すでに打った文字
      html += `<span class="typed">${currentWord[i]}</span>`;

    }else if(i === currentIndex){

      // 今から打つ文字
      html += `<span class="current">${currentWord[i]}</span>`;

    }else{

      // まだ打っていない文字
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
    title: "タイピング練習",
    correct: "正解：",
    miss: "ミス："
  },

  en: {
    title: "Typing Practice",
    correct: "Correct: ",
    miss: "Miss: "
  },

  zh: {
    title: "打字练习",
    correct: "正确：",
    miss: "错误："
  },

  es: {
    title: "Práctica de mecanografía",
    correct: "Correcto: ",
    miss: "Errores: "
  },

  fr: {
    title: "Entraînement à la frappe",
    correct: "Correct : ",
    miss: "Erreurs : "
  },

  de: {
    title: "Tippübung",
    correct: "Richtig: ",
    miss: "Fehler: "
  },

  it: {
    title: "Esercizio di digitazione",
    correct: "Corretto: ",
    miss: "Errori: "
  },

  pt: {
    title: "Prática de digitação",
    correct: "Correto: ",
    miss: "Erros: "
  }

};


const language =
  document.getElementById("language");

language.addEventListener("change", function(){

  const lang =
    translations[this.value];

  document.getElementById("title").textContent =
    lang.title;

  document.getElementById("correctText").textContent =
    lang.correct;

  document.getElementById("missText").textContent =
    lang.miss;

});
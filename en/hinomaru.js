```js
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


const language =
  document.getElementById("language");


let currentWord = "";

let currentIndex = 0;

let correct = 0;

let miss = 0;



// 文字の表示を更新

function updateWord(){

  let html = "";


  for(let i = 0; i < currentWord.length; i++){

    if(i < currentIndex){

      html +=
        `<span class="typed">${currentWord[i]}</span>`;

    }

    else if(i === currentIndex){

      html +=
        `<span class="current">${currentWord[i]}</span>`;

    }

    else{

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

document.addEventListener(
  "keydown",
  function(event){

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

  }
);



// 言語変更

language.addEventListener(
  "change",
  function(){

    if(this.value === "ja"){

      window.location.href = "/";

    }

    else if(this.value === "en"){

      window.location.href = "/en/";

    }

  }
);



// 現在のページの言語を選択状態にする

const currentLanguage =
  document.body.dataset.lang;


if(currentLanguage){

  language.value =
    currentLanguage;

}



// 最初の単語

nextWord();
```

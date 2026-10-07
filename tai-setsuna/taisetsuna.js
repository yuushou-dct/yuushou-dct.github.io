(()=>{


  /* =================================
     単語
  ================================= */

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



  /* =================================
     HTML取得
  ================================= */

  const wordElement =
    document.getElementById("word");


  const inputElement =
    document.getElementById("typingInput");


  const speedElement =
    document.getElementById("speed");


  const mphElement =
    document.getElementById("mph");


  const correctElement =
    document.getElementById("correct");


  const missElement =
    document.getElementById("miss");


  const bestSpeedElement =
    document.getElementById("bestSpeed");


  const startButton =
    document.getElementById("startBtn");


  const leftScreen =
    document.getElementById("leftScreen");



  /* =================================
     変数
  ================================= */

  let currentWord = "";

  let startTime = 0;

  let correct = 0;

  let miss = 0;

  let bestSpeed = 0;

  let playing = false;

  let lastLength = 0;



  /* =================================
     新しい単語
  ================================= */

  function newWord(){


    const randomIndex =
      Math.floor(
        Math.random() * words.length
      );


    currentWord =
      words[randomIndex];


    wordElement.textContent =
      currentWord;


    inputElement.value =
      "";


    lastLength =
      0;


    inputElement.style.borderColor =
      "#377cff";


    /*
      単語表示と同時に計測開始
    */

    startTime =
      performance.now();

  }



  /* =================================
     ゲーム開始
  ================================= */

  function startGame(){


    playing =
      true;


    correct =
      0;


    miss =
      0;


    bestSpeed =
      0;


    correctElement.textContent =
      "0";


    missElement.textContent =
      "0";


    speedElement.textContent =
      "0";


    mphElement.textContent =
      "0";


    bestSpeedElement.textContent =
      "0";


    inputElement.disabled =
      false;


    startButton.textContent =
      "RESTART";


    showReadyScreen();


    newWord();


    inputElement.focus();

  }



  /* =================================
     開始直後の液晶
  ================================= */

  function showReadyScreen(){


    leftScreen.className =
      "slot-screen";


    leftScreen.innerHTML = `

      <div class="level-display">


        <div class="level-title">

          GAME START!!

        </div>


        <div
          class="runner"
          style="
            animation-duration:1.5s;
          ">

          ⚡

        </div>


        <div class="level-speed">

          TYPE!!

        </div>


      </div>

    `;

  }



  /* =================================
     速度計算
  ================================= */

  function calculateSpeed(){


    const endTime =
      performance.now();



    /*
      入力にかかった秒数
    */

    const seconds =
      (endTime - startTime) / 1000;



    if(seconds <= 0){

      return;

    }



    /*
      1文字 ＝ 仮想1m

      apple = 5文字
            = 仮想5m
    */

    const distance =
      currentWord.length;



    /*
      m/s
    */

    const metersPerSecond =
      distance / seconds;



    /*
      km/h

      m/s × 3.6
    */

    const kmh =
      metersPerSecond * 3.6;



    /*
      mph
    */

    const mph =
      kmh * 0.621371;



    const kmhResult =
      Math.round(kmh);


    const mphResult =
      Math.round(mph);



    speedElement.textContent =
      kmhResult;


    mphElement.textContent =
      mphResult;



    /*
      最高記録
    */

    let newRecord =
      false;


    if(kmhResult > bestSpeed){


      bestSpeed =
        kmhResult;


      bestSpeedElement.textContent =
        bestSpeed;


      newRecord =
        true;

    }



    /*
      液晶演出
    */

    showLevel(
      kmhResult,
      newRecord
    );

  }



  /* =================================
     速度レベル
  ================================= */

  function getLevel(speed){


    /*
      0～9
    */

    if(speed < 10){

      return {

        name:
          "赤ちゃんレベル",

        icon:
          "👶",

        duration:
          4

      };

    }



    /*
      10～19
    */

    if(speed < 20){

      return {

        name:
          "お散歩レベル",

        icon:
          "🚶",

        duration:
          3.5

      };

    }



    /*
      20～39
    */

    if(speed < 40){

      return {

        name:
          "自転車レベル",

        icon:
          "🚴",

        duration:
          3

      };

    }



    /*
      40～79
    */

    if(speed < 80){

      return {

        name:
          "アスリートレベル",

        icon:
          "🏃",

        duration:
          2.2

      };

    }



    /*
      80～119
    */

    if(speed < 120){

      return {

        name:
          "豪速球レベル",

        icon:
          "⚾",

        duration:
          1.7

      };

    }



    /*
      120～199
    */

    if(speed < 200){

      return {

        name:
          "スポーツカーレベル",

        icon:
          "🏎️",

        duration:
          1.3

      };

    }



    /*
      200～299
    */

    if(speed < 300){

      return {

        name:
          "新幹線レベル",

        icon:
          "🚅",

        duration:
          1

      };

    }



    /*
      300～499
    */

    if(speed < 500){

      return {

        name:
          "ジェットレベル",

        icon:
          "✈️",

        duration:
          .75

      };

    }



    /*
      500～999
    */

    if(speed < 1000){

      return {

        name:
          "ロケットレベル",

        icon:
          "🚀",

        duration:
          .55

      };

    }



    /*
      1000以上
    */

    return {

      name:
        "瞬 LEVEL",

      icon:
        "⚡",

      duration:
        .35

    };

  }



  /* =================================
     液晶アニメーション
  ================================= */

  function showLevel(
    speed,
    newRecord
  ){


    const level =
      getLevel(speed);



    /*
      40km/h以上は
      スピード線
    */

    const speedLines =
      speed >= 40

      ? `

        <div class="speed-lines">
        </div>

        `

      : "";



    /*
      赤ちゃん専用
    */

    const characterClass =
      speed < 10

      ? "runner baby"

      : "runner";



    /*
      200km/h以上
      液晶フラッシュ
    */

    const flashClass =
      speed >= 200

      ? "flash"

      : "";



    /*
      最高記録
    */

    const recordText =
      newRecord

      ? `

        <div class="new-record">

          NEW RECORD!!

        </div>

        `

      : "";



    leftScreen.className =
      `slot-screen ${flashClass}`;



    leftScreen.innerHTML = `

      <div class="level-display">


        ${speedLines}


        <div class="level-title">

          ${level.name}

        </div>


        <div
          class="${characterClass}"

          style="
            animation-duration:
            ${level.duration}s;
          ">

          ${level.icon}

        </div>


        ${recordText}


        <div class="level-speed">

          ${speed} km/h

        </div>


      </div>

    `;

  }



  /* =================================
     STARTボタン
  ================================= */

  startButton.addEventListener(
    "click",
    ()=>{


      startGame();

    }
  );



  /* =================================
     Enterでスタート
  ================================= */

  document.addEventListener(
    "keydown",
    (event)=>{


      if(
        event.key === "Enter" &&
        !playing
      ){


        event.preventDefault();


        startGame();

      }

    }
  );



  /* =================================
     タイピング判定
  ================================= */

  inputElement.addEventListener(
    "input",
    ()=>{


      if(!playing){

        return;

      }



      const typed =
        inputElement.value;



      /*
        文字が増えた時だけ
        新しい文字を判定
      */

      if(
        typed.length >
        lastLength
      ){


        const index =
          typed.length - 1;



        /*
          間違い
        */

        if(
          typed[index] !==
          currentWord[index]
        ){


          miss++;


          missElement.textContent =
            miss;


          inputElement.style.borderColor =
            "#ff5265";


        }else{


          inputElement.style.borderColor =
            "#377cff";

        }

      }



      lastLength =
        typed.length;



      /*
        単語を完全に入力
      */

      if(
        typed === currentWord
      ){


        correct++;


        correctElement.textContent =
          correct;



        /*
          速度を計算
        */

        calculateSpeed();



        /*
          次の単語
        */

        newWord();

      }

    }
  );


})();

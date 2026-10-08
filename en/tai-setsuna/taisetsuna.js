
(()=>{


  /* =================================
     WORDS
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
     HTML ELEMENTS
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
     VARIABLES
  ================================= */

  let currentWord = "";

  let startTime = 0;

  let correct = 0;

  let miss = 0;

  let bestSpeed = 0;

  let playing = false;

  let lastLength = 0;



  /* =================================
     NEW WORD
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
      Start measuring when
      the word appears
    */

    startTime =
      performance.now();

  }



  /* =================================
     START GAME
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
     READY SCREEN
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
     SPEED CALCULATION
  ================================= */

  function calculateSpeed(){


    const endTime =
      performance.now();



    /*
      Time in seconds
    */

    const seconds =
      (endTime - startTime) / 1000;



    if(seconds <= 0){

      return;

    }



    /*
      1 character = virtual 1 m

      apple = 5 characters
            = virtual 5 m
    */

    const distance =
      currentWord.length;



    /*
      Meters per second
    */

    const metersPerSecond =
      distance / seconds;



    /*
      km/h
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
      BEST RECORD
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
      LEVEL ANIMATION
    */

    showLevel(
      kmhResult,
      newRecord
    );

  }



  /* =================================
     SPEED LEVELS
  ================================= */

  function getLevel(speed){


    /*
      0 - 9 km/h
    */

    if(speed < 10){

      return {

        name:
          "BABY LEVEL",

        icon:
          "👶",

        duration:
          4

      };

    }



    /*
      10 - 19 km/h
    */

    if(speed < 20){

      return {

        name:
          "WALKING LEVEL",

        icon:
          "🚶",

        duration:
          3.5

      };

    }



    /*
      20 - 39 km/h
    */

    if(speed < 40){

      return {

        name:
          "CYCLING LEVEL",

        icon:
          "🚴",

        duration:
          3

      };

    }



    /*
      40 - 79 km/h
    */

    if(speed < 80){

      return {

        name:
          "ATHLETE LEVEL",

        icon:
          "🏃",

        duration:
          2.2

      };

    }



    /*
      80 - 119 km/h
    */

    if(speed < 120){

      return {

        name:
          "FASTBALL LEVEL",

        icon:
          "⚾",

        duration:
          1.7

      };

    }



    /*
      120 - 199 km/h
    */

    if(speed < 200){

      return {

        name:
          "SPORTS CAR LEVEL",

        icon:
          "🏎️",

        duration:
          1.3

      };

    }



    /*
      200 - 299 km/h
    */

    if(speed < 300){

      return {

        name:
          "BULLET TRAIN LEVEL",

        icon:
          "🚅",

        duration:
          1

      };

    }



    /*
      300 - 499 km/h
    */

    if(speed < 500){

      return {

        name:
          "JET LEVEL",

        icon:
          "✈️",

        duration:
          .75

      };

    }



    /*
      500 - 999 km/h
    */

    if(speed < 1000){

      return {

        name:
          "ROCKET LEVEL",

        icon:
          "🚀",

        duration:
          .55

      };

    }



    /*
      1000 km/h and above
    */

    return {

      name:
        "SHUN LEVEL",

      icon:
        "⚡",

      duration:
        .35

    };

  }



  /* =================================
     LEVEL ANIMATION
  ================================= */

  function showLevel(
    speed,
    newRecord
  ){


    const level =
      getLevel(speed);



    /*
      Speed lines above 40 km/h
    */

    const speedLines =
      speed >= 40

      ? `

        <div class="speed-lines">
        </div>

        `

      : "";



    /*
      Baby animation
    */

    const characterClass =
      speed < 10

      ? "runner baby"

      : "runner";



    /*
      Flash above 200 km/h
    */

    const flashClass =
      speed >= 200

      ? "flash"

      : "";



    /*
      New record animation
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
     START BUTTON
  ================================= */

  startButton.addEventListener(
    "click",
    ()=>{


      startGame();

    }
  );



  /* =================================
     START WITH ENTER
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
     TYPING CHECK
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
        Check newly typed character
      */

      if(
        typed.length >
        lastLength
      ){


        const index =
          typed.length - 1;



        /*
          Incorrect character
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
        Correct word
      */

      if(
        typed === currentWord
      ){


        correct++;


        correctElement.textContent =
          correct;



        /*
          Calculate typing speed
        */

        calculateSpeed();



        /*
          Next word
        */

        newWord();

      }

    }
  );


})();

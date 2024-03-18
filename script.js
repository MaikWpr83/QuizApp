let questions = [
    {
        "question": "Wer hat HTML erfunden ?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gag",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },

    {
        "question": "Wieviele Planete gibt es ?",
        "answer_1": "5",
        "answer_2": "12",
        "answer_3": "7",
        "answer_4": "8",
        "right_answer": 4
    },

    {
        "question": "Wie viele Einwohner hat Deutschland ?",
        "answer_1": "83 Mio",
        "answer_2": "65 Mio",
        "answer_3": "93 Mio",
        "answer_4": "110 Mio",
        "right_answer": 1
    },

    {
        "question": "Wer hat Amerika entdeckt ?",
        "answer_1": "Christopher Kolumbus",
        "answer_2": "Aldrin Buzz",
        "answer_3": "Howard Carter",
        "answer_4": "Frederic Cailliaud",
        "right_answer": 1
    },

    {
        "question": "Welche Menschen waren an Bord von Apollo 11 ?",
        "answer_1": "Juri Gagarin, John Glenn und Harrison Schmitt",
        "answer_2": "Neil Armstrong, Michael Collins und Edwin Aldrin",
        "answer_3": "Sergej Krikaljow, Elliot See und Charles Bassett",
        "answer_4": "Greg Jarvis, Christa McAuliffe und Mike Smith",
        "right_answer": 2
    },

    {
        "question": "Wie weit ist der Mond von der Erde entfernt ?",
        "answer_1": "348.600 km",
        "answer_2": "396.200 km",
        "answer_3": "465.500 km",
        "answer_4": "384.400 km",
        "right_answer": 4
    },

    {
        "question": "Welchen Umfang hat die Sonne ?",
        "answer_1": "4.569.748 km",
        "answer_2": "4.379.000 km",
        "answer_3": "3.956.000 km",
        "answer_4": "4.284.600 km",
        "right_answer": 2
    },

    {
        "question": "Wie viele Kinder werden pro Tag geboren ?",
        "answer_1": "175 000",
        "answer_2": "185 000",
        "answer_3": "165 000",
        "answer_4": "180 000",
        "right_answer": 4
    },

    {
        "question": "Wer hat das Fahrrad erfunden ?",
        "answer_1": "Pierre Michaux",
        "answer_2": "Karl von Drais",
        "answer_3": "John Kemp Starley",
        "answer_4": "John Boyd Dunlop",
        "right_answer": 2
    },

    {
        "question": "Wer hat zu erst die Welt umsegelt ?",
        "answer_1": "Francis Drake",
        "answer_2": "Christopher Hatton",
        "answer_3": "Ferdinand de Magellan",
        "answer_4": "Christopher Hatton",
        "right_answer": 3
    },
];

let rightQuestions = 0;                                                                     //zählt hoch, wenn wir die richtige Antwort angeklickt habe
let currentQuestion = 0;                                                                    //wird um eins erhöht, wenn wir eine Frange ausgewählt haben
let AUDIO_SUCCESS = new Audio('audio/success.mp3');                                         //Audio-Datei einfügen
let AUDIO_FAIL = new Audio('audio/fail.mp3');                                               //Audio-Datei einfügen

function init(){
    document.getElementById('all_questions').innerHTML = questions.length;
    showQuestion();
}

//Frage anzeigen
function showQuestion(){
    if(gameIsOver()){
        showEndScreen();
    }else{  
        updateProgressBar();
        updateToNextQuestion();
    }
}

//Game is end
function gameIsOver(){
    return currentQuestion >= questions.length
}

//Show End Screen
function showEndScreen(){
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';

    document.getElementById('amount-of-questions').innerHTML = questions.length;            //Anzahl von Frage am Ende anzeigen
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;        //richtig beantwortete Frage am Ende anzeigen

    document.getElementById('header-image').src = 'img/trophy.jpg';
    document.getElementById('header-image').style = 'height: 24rem';
}

function updateProgressBar(){
    //Show Question
    //Progress-Bar, Percent 
    let percent = (currentQuestion + 1) / questions.length;

    percent = Math.round(percent * 100);
    document.getElementById('progress_bar').innerHTML = `${percent} %`;
    document.getElementById('progress_bar').style = `width: ${percent}%`;
}

function updateToNextQuestion(){
    //Number Question count up
    let question = questions[currentQuestion];

    document.getElementById('question_number').innerHTML = currentQuestion + 1;

    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

//wenn ich auf einen Button drücke wird diese Funktion ausgeführt und 'answer reingegeben'
function answer(selection){                                                                 //Funktion mit der Variable 'selection'
    let question = questions[currentQuestion];                                              //unsere aktuelle Frage ist '0' (currentQuestion) und wollen das Nullte JSON holen
    let selctedQuestionNumber = selection.slice(-1);                                        //es soll in dieser Variablen 'selctedQuestionNumber' der letzte Buchstabe von dieser Variablen 'selection' gespeichert sein
    let idOfRightAnswer = `answer_${question['right_answer']}`;                             //richtige Antwort anzeigen

    if(selctedQuestionNumber == question['right_answer']){                                         //Antworten vergleichen, Richtige Frage beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');          //eine 'class' hinzufügen (green), 'bg-success' ist eine class von Bootstrap 
        AUDIO_SUCCESS.play();                                                               //Audio-Datei einfügen und abspielen
        rightQuestions++;
    }else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');           //eine 'class' hinzufügen (red), 'bg-success' ist eine class von Bootstrap 
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');    //richtige Antwort ausgeben
        AUDIO_FAIL.play();                                                                  //Audio-Datei einfügen und abspielen
    }

    document.getElementById('next_button').disabled = false;                                //Button aktiviern (disable) / deaktivieren (enable)
}

//nächste Frage anzeigen lassen, wenn man auf den Button drückt
function nextQuestion(){
    currentQuestion++;                                                                      //Variable wird um eins erhöht, z.Bsp: von 0 auf 1
    document.getElementById('next_button').disabled = true;                                 //Button aktiviern (disable) / deaktivieren (enable)
    resetAnswerButtons();                                                                   //Funktion aufrufen
    showQuestion();                                                                         //Funktion erneunt aufrufen und Frage anzeigen
}

//Antwort-Button 'class' ändern
function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');           //class entfernen
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');          //class entfernen
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');           //class entfernen
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');          //class entfernen
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');           //class entfernen
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');          //class entfernen
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');           //class entfernen
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');          //class entfernen
}

//Restart the Game
function restartGame(){
    document.getElementById('header-image').src = 'img/background_image.png';               //Image ändern
    document.getElementById('questionBody').style = '';                                     //questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none';                           //EndScreen ausblenden
    document.getElementById('header-image').style = 'height: 15rem';

    rightQuestions = 0;
    currentQuestion = 0;

    init();
}
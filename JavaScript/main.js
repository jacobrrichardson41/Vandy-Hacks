(function (trivia, $, undefined) {
    trivia.history = [];
    trivia.keyArray = [];
    trivia.key = "";
    trivia.questionCounter = 0;

    trivia.question = function(questionKey) {

        $.getJSON( "../API/api.json", function( data ) {

            if (questionKey === "initial") {
                generateKeyArray(trivia.keyArray, data);
            }

            console.log(trivia.keyArray);
            console.log(trivia.keyArray[trivia.questionCounter]);

            if (trivia.history.length !== data.trivia.length) {
                trivia.key = trivia.keyArray[trivia.questionCounter];
                createTrivia(trivia.key, data);
            } else {
                displayResults(trivia, data);
            }
        });

    }

    function createTrivia(key, data) {

        let triviaImage = document.getElementById('triviaImage');
        let triviaQuestion = document.getElementById('triviaQuestion');
        let answerA = document.getElementById('answerA');
        let answerB = document.getElementById('answerB');
        let answerC = document.getElementById('answerC');
        let answerD = document.getElementById('answerD');

        let object = data.trivia[key];

        triviaImage.setAttribute('src', object.image);
        triviaQuestion.innerText = object.question;
        answerA.innerText = "A.) " + object.answers.a;
        answerB.innerText = "B.) " + object.answers.b;
        answerC.innerText = "C.) " + object.answers.c;
        answerD.innerText = "D.) " + object.answers.d;

    }

    function generateKeyArray(array , data) {

        for (let i = 0; i < data.trivia.length; i++) {
            array.push(i);
        }

        return shuffle(array);
    };

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    function displayResults(trivia, data) {
        let triviaBox = document.getElementById('triviaBox');
        triviaBox.innerHTML = "";

        for (let i = 0; i < trivia.history.length; i++ ) {

            let history = trivia.history[i];
            let key = history.key;

            let json = data.trivia[i];

            var card = document.createElement('div');
            card.classList.add('card');
            triviaBox.appendChild(card);

            var question = document.createElement('h2');
            question.innerText = json.question;
            card.appendChild(question);
            
            var resultDiv = document.createElement('div');
            resultDiv.classList.add("resultAnswers");
            card.appendChild(resultDiv);

            for (let index = 0; index < 4; index++ ) {

                switch (index) {
                    case 0:
                        var val = "a";
                        break;
                    case 1:
                        var val = "b";
                        break;
                    case 2:
                        var val = "c";
                        break;
                    default:
                        var val = "d";
                }
                
                console.log(json);
                console.log(key);

                var answer = document.createElement('h6');
                answer.innerText = json.answers[val];
                if (json.correct === history.selected) {
                    answer.classList.add('correct');
                } else if (json.correct !== history.selected && history.selected === json.answers[val]) {
                    answer.classList.add('wrong');
                } else if (json.correct !== history.selected  && json.correct === json.answers[val]) {
                    answer.classList.add('correct');
                }
                resultDiv.appendChild(answer);
                
            }

        }

    }

}(window.trivia = window.trivia || {} , jQuery ));

(function() {
    trivia.question("initial");

    let triviaSubmit = document.getElementById('triviaSubmit');

    console.log(trivia);

    triviaSubmit.addEventListener('click', function(e) {
        // Collect input for question.
        var inputs = document.getElementById('triviaAnswers').querySelectorAll('input');

        for (let i = 0; i < (inputs.length - 1); i++) {
            if (inputs[i].checked) {
                var selected = inputs[i].value;
            }
        }

        if (selected === "a" || selected === "b" || selected === "c" || selected === "d") {

            // var startAudio = new Audio("../asset/AyayaAyaya.mp3");
            // startAudio.play();
            
    
    
            
    
            var result = {key:trivia.keyArray[trivia.questionCounter], selected};
            trivia.history.push(result);
            // console.log(trivia.history);
    
            trivia.questionCounter++;
    
            // generate random number key that is inside api.json trivia.length && not in history.
            triviaSubmit.removeEventListener('click', trivia.question());
        }
    });
})();
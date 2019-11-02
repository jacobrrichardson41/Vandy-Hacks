(function (trivia, $, undefined) {
    trivia.history = [];

    trivia.question = function(questionKey) {

        let triviaImage = document.getElementById('triviaImage');
        let triviaQuestion = document.getElementById('triviaQuestion');
        let answerA = document.getElementById('answerA');
        let answerB = document.getElementById('answerB');
        let answerC = document.getElementById('answerC');
        let answerD = document.getElementById('answerD');
        let triviaSubmit = document.getElementById('triviaSubmit');

        $.getJSON( "../API/api.json", function( data ) {
            // Iterate through trivia's length
            for (var i = 0; i < data.trivia.length; i++) {
                // Retrieve object[i] from trivia array.
                var object = data.trivia[i];
                // If key matches question parameter.
                if (object.key == questionKey) {
                    // Retrieve data from object and assign to variables.
                    var arrayData = data,
                        key = object.key,
                        image = object.image,
                        question = object.question,
                        answers = object.answers,
                        correct = object.correct;
                }
            }

            triviaImage.setAttribute('src', image);
            triviaQuestion.innerText = question;
            answerA.innerText = "A.) " + answers.a;
            answerB.innerText = "B.) " + answers.b;
            answerC.innerText = "C.) " + answers.c;
            answerD.innerText = "D.) " + answers.d;
            triviaSubmit.addEventListener('click', function() {
                // var startAudio = new Audio("../asset/AyayaAyaya.mp3");
                // startAudio.play();
                
                // Collect input for question.
                var inputs = document.getElementById('triviaAnswers').querySelectorAll('input');
                for (let i = 0; i < (inputs.length - 1); i++) {
                    if (inputs[i].checked) {
                        var selected = inputs[i].value;
                    }
                }

                var used = false;
                for (let i = 0; i < trivia.history.length; i++) {
                    let usedKey = trivia.history[i].key;
                    if (key === usedKey) {
                        used = true;
                    }
                }

                if (used === false) {
                    // Push to history.
                    var result = "";
                    var result = {key, image, question, answers, correct, selected};
                    trivia.history.push(result);
                }


                // generate random number key that is inside api.json trivia.length && not in history.
                generateRandomKey();

                function generateRandomKey() {
                    if (trivia.history.length !== arrayData.trivia.length) {
                        console.log(trivia.history);
                        var randomKey = Math.floor(Math.random() * arrayData.trivia.length);
                        randomKey = randomKey.toString();
                        for (let i = 0; i < trivia.history.length; i++) {
                            let usedKey = trivia.history[i].key;
                            console.log("usedKey: '" + usedKey + "', randomKey '" + randomKey + "'");
                            if (randomKey === usedKey) {
                                console.log("New Key");
                                generateRandomKey();
                                return;
                            }
                        }
                        console.log("New Question");
                        trivia.question(randomKey);
                    } else {
                        displayResults();
                    }
                };
            });
            
        });
    }

    function displayResults() {
        let triviaBox =document.getElementById('triviaBox');
        triviaBox.innerHTML = "";


        for (let i = 0; i < trivia.history.length; i++ ) {

            let history = trivia.history[i];

            var card = document.createElement('div');
            card.classList.add('card');
            triviaBox.appendChild(card);

            var question = document.createElement('h2');
            question.innerText = history.question;
            card.appendChild(question);
            
            var resultDiv = document.createElement('div');
            resultDiv.classList.add("resultAnswers");
            card.appendChild(resultDiv);

            console.log("this note: " + history.answers.length);


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

                var answer = document.createElement('h6');
                if (history.correct === history.selected && history.correct === history.answers[val]) {
                    answer.classList.add('correct');
                } else if (history.selected !== history.correct && history.selected === history.answers[val]) {
                    answer.classList.add('wrong');
                } else if (history.selected !== history.correct && history.correct === history.answers[val]) {
                    answer.classList.add('correct');
                }
                answer.innerText = history.answers[val];
                resultDiv.appendChild(answer);
                
            }

        }

    }

}(window.trivia = window.trivia || {} , jQuery));

(function() {
    trivia.question(0);
})();
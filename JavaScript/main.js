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
                    var key = object.key;
                    var image = object.image
                    var question = object.question;
                    var answers = object.answers;
                    var correct = object.correct;
                }
            }

            triviaImage.setAttribute('src', image);
            triviaQuestion.innerText = question;
            answerA.innerText = "A.) " + answers.a;
            answerB.innerText = "B.) " + answers.b;
            answerC.innerText = "C.) " + answers.c;
            answerD.innerText = "D.) " + answers.d;
            triviaSubmit.addEventListener('click', trivia.click(key, correct));
            
        });
    }

    trivia.click = function(key, correct) {
        var startAudio = new Audio("../asset/AyayaAyaya.mp3");
        startAudio.play();
        console.log(key);
        console.log(correct);
        // Collect input for question.
        // concat to history.
        // generate random number key that is inside api.json trivia.length && not in history.
        // trivia.question(randomKey);
    }

}(window.trivia = window.trivia || {} , jQuery));

(function() {
    trivia.question(0);
})();
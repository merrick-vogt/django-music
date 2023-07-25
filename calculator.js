// Sassy Calculator Logic
    // Create a calculator that can perform the simple operations +,-,*,/ with rational numbers.
    // Calculator can take in multiple numbers and perform order of operations.

    // collect the digits of a number in an array. 
    // collect all the numbers inputed. 
    // collect all the operators inputed. 
    let digits = [];
    let numbers =[];
    let operators =[];

    // document.querySelectorAll('.Buttons button') selects all the buttons inside the element 
    // with the class Buttons. The buttons are retrieved as a NodeList.
    const buttons = document.querySelectorAll('.Buttons button');
    const answerElement = document.getElementById('screen');

    // forEach is used to attach a click event listener to each button.
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id;
            switch (buttonId) {
                case "b0":
                case "b1":
                case "b2":
                case "b3":
                case "b4":
                case "b5":
                case "b6":
                case "b7":
                case "b8":
                case "b9":
                case "b.":
                    pushDigit(buttonId.slice(1));
                    break;
                
                case "add":
                    pushOperation("+");
                    break;
                
                case "sub":
                    pushOperation("-");
                    break;

                case "mul":
                    pushOperation("*");
                    break;

                case "div":
                    pushOperation("/");
                    break;

                case "ce":
                    clearEntry();
                    break;

                case "c":
                    clearAll();
                    break;
                        
                case "eq":
                    // collect last number before performing operations.
                    equate();
     
                    // Perform operations * and / first. And then + and -.
                    while (operators.length > 0) {

                        // Needs to check ALL multiplication and divison before moving on.
                        while (operators.includes('*') || operators.includes('/')) {

                            operators.forEach(function(operation, index, operators) {
                                
                                calculate(operation, index, operators);
                            });
                        };
                        
                        operators.forEach(function(operation, index, operators) {
                            
                            calculate(operation, index, operators);    
                        
                        });
                        
                        
                    }

                    let answer = numbers[0];
                    // set screen answer to answer
                    answerElement.innerHTML = sassyCal() + "<br><span id='answer' class='fly-in-animation'>" + answer + "</span>";
                    // clear answer
                    numbers = [];
                    
            }
            
        });
    });
                                            
    function displayAnswer() {
        answerElement.textContent = digits.join("");
    }

    function pushOperation(operator) {
        const combinedNumber = parseFloat(digits.join(''));
        numbers.push(combinedNumber);
        operators.push(operator);
        digits = [];
    }

    function pushDigit(digit) {
        digits.push(digit);
        displayAnswer();
    }

    function equate() {
        const combinedNumber = parseFloat(digits.join(''));
                numbers.push(combinedNumber);
                digits = [];
                console.log("perform operations");
    }

    function clearEntry() {
        digits = [];
        displayAnswer();
    }

    function clearAll() {
        digits = [];
        numbers = [];
        operators = [];
        displayAnswer();
    }

    function calculate(operation, index, operators) {
        tmp = 1;
        if (operation === "*") {
            tmp = numbers[index]*numbers[index+1];
        } else if (operation === "/") {
            tmp = numbers[index]/numbers[index+1];
        } else if (operation === "+") {
            tmp = numbers[index]+numbers[index+1];
        } else if (operation === "-") {
            tmp = numbers[index]-numbers[index+1];
        } else {
            tmp = 0;
        }
        numbers[index] = tmp;
        operators.splice(index, 1);
        numbers.splice(index+1, 1);
    }

    function sassyCal() {
        
        const randomNumber = Math.floor(Math.random() * 27);
        
        const funnyResponses = [
            "Well, well, well... Look who's got the answer! *Hair flip*",
            "Oh honey, let me drop some knowledge on you... *Snap* Here's your answer!",
            "Prepare to be dazzled by my math magic! *Throws glitter* Your answer is...",
            "Get ready for a mind-blowing revelation! *Wink* Your answer is...",
            "Are you ready to have your mind blown? Ta-da! Your answer is...",
            "Hold onto your hat, because I'm about to reveal the answer! *Dramatic pause*",
            "Watch and learn, my friend. *Mic drop* Here's the answer!",
            "You've come to the right place! Behold, the answer is...",
            "Prepare to be enlightened! Drumroll, please... Your answer is...",
            "In the words of the wise, your answer is...",
            "Get ready for a math miracle! Abracadabra, your answer is...",
            "Eureka! I've found the answer, and it's...",
            "Hold onto your seat, because I'm about to reveal the answer!",
            "I've got the secret sauce right here! Your answer is...",
            "Buckle up, because I'm about to blow your mind! The answer is...",
            "Behold, the answer has arrived! *Cue dramatic music*",
            "Your search is over! Voila! The answer is...",
            "Ready or not, here comes the answer! *Drumroll*",
            "The wait is over! Tada! Your answer is...",
            "Guess what? I've got the answer right here! *Finger snap*",
            "Prepare for a knowledge explosion! Your answer is...",
            "Listen closely, for I'm about to reveal the answer...",
            "The time has come for the big reveal! Your answer is...",
            "Drumroll, please... And the answer is...",
            "Attention, everyone! I have the answer right here!",
            "Hold your breath, for I'm about to unveil the answer!",
            "Ladies and gentlemen, I present to you... the answer!"
        ]
        
        
        return funnyResponses[randomNumber];
        
    }

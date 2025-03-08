let score = 0;
let rounds = 8;
let currentRound = 0;
let selectedModule = '';
let currentAnswer = '';
let selectedQuestions = [];
let startTime;

// Module Questions (Example)
let module1Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

let module2Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

let module3Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];
let module4Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

let module5Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

let module6Questions = [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
];

// Function to show the module selection menu
function showMenu() {
    document.getElementById("container").innerHTML = `
        <h1>Select a Module</h1>
        <button class="menu-button" onclick="startCountdown(1)">Module 1: Place Value & Decimal Fractions</button>
        <button class="menu-button" onclick="startCountdown(2)">Module 2: Multi-Digit Whole Number & Decimal Operations</button>
        <button class="menu-button" onclick="startCountdown(3)">Module 3: Addition & Subtraction of Fractions</button>
        <button class="menu-button" onclick="startCountdown(4)">Module 4: Multiplication & Division of Fractions & Decimals</button>
        <button class="menu-button" onclick="startCountdown(5)">Module 5: Addition and Multiplication with Volume and Area</button>
        <button class="menu-button" onclick="startCountdown(6)">Module 6: Problem Solving with the Coordinate Plane</button>
    `;
}

// Function to handle the countdown before the module starts
function startCountdown(moduleNumber) {
    let countdownFrames = [ "3","3.","3..","2","2.","2..","1","1.","1..", "Go!"];
    let index = 0;

    function showNextFrame() {
        if (index < countdownFrames.length) {
            document.getElementById("container").innerHTML = `
                <h1>${countdownFrames[index]}</h1>
            `;
            index++;
            setTimeout(showNextFrame, 280); 
        } else {
            startModule(moduleNumber);
        }
    }

    showNextFrame(); // Start the countdown animation
}

// Function to start the selected module
function startModule(moduleNumber) {
    score = 0;
    currentRound = 0;

    let allQuestions = moduleNumber === 1 ? module1Questions
                    : moduleNumber === 2 ? module2Questions
                    : moduleNumber === 3 ? module3Questions
                    : moduleNumber === 4 ? module4Questions
                    : moduleNumber === 5 ? module5Questions
                    : module6Questions;

    // Shuffle and select questions
    selectedQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, rounds);
    selectedModule = `Module ${moduleNumber}`;
    startTime = new Date().getTime(); // Record start time

    document.getElementById("container").innerHTML = `
        <h1>${selectedModule}</h1>
        <p id="problem"></p>
        <input type="text" id="answer" placeholder="Enter your answer" readonly>
        <div class="keypad">
            <button onclick="appendToAnswer('1')">1</button>
            <button onclick="appendToAnswer('2')">2</button>
            <button onclick="appendToAnswer('3')">3</button>
            <button onclick="appendToAnswer('4')">4</button>
            <button onclick="appendToAnswer('5')">5</button>
            <button onclick="appendToAnswer('6')">6</button>
            <button onclick="appendToAnswer('7')">7</button>
            <button onclick="appendToAnswer('8')">8</button>
            <button onclick="appendToAnswer('9')">9</button>
            <button onclick="clearAnswer()">♻️</button>
            <button onclick="appendToAnswer('0')">0</button>
            <button onclick="checkAnswer()">✅</button>
        </div>
        <p id="feedback"></p>
        <p id="score">Points: 0</p>
        <p id="time">Time: 0s</p>
    `;
    generateQuestion();

    // Listen for keyboard input
    document.addEventListener("keydown", handleKeyboardInput);
}

// Function to generate the next question
function generateQuestion() {
    document.getElementById("problem").innerText = selectedQuestions[currentRound].question;
    currentAnswer = selectedQuestions[currentRound].answer;
}

// Function to append numbers or symbols to the answer field
function appendToAnswer(value) {
    document.getElementById("answer").value += value;
}

// Function to clear the answer field
function clearAnswer() {
    document.getElementById("answer").value = '';
}

// Function to check the user's answer
// Function to check the user's answer
// Function to check the user's answer
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000); // Time in seconds

    // Reset the fade-out class before showing new feedback
    document.getElementById("feedback").classList.remove('fade-out');
    document.getElementById("feedback").innerText = ""; // Clear old feedback

    // Check answer and display feedback
    if (userAnswer === currentAnswer) {
        score++;
        document.getElementById("feedback").innerText = "✅ You Got It Correct!";
    } else {
        document.getElementById("feedback").innerText = `❌ The Correct Answer Is ${currentAnswer}`;
    }

    // Display the updated score and time
    document.getElementById("score").innerText = `Points: ${score}`;
    document.getElementById("time").innerText = `Time: ${elapsedTime}s`;

    // Fade out the feedback after 1.5 seconds
    setTimeout(() => {
        document.getElementById("feedback").classList.add('fade-out');
    }, 2000); // Wait for 2 seconds before fading out the feedback

    currentRound++;

    if (currentRound < rounds) {
        generateQuestion();
    } else {
        document.getElementById("container").innerHTML = `
            <h1>Game Over!</h1>
            <p>Your Score: ${score} / ${rounds}</p>
            <p>Time Taken: ${elapsedTime}s</p>
            <button class="menu-button" onclick="startCountdown(${selectedModule.replace('Module ', '')})">Replay</button>
            <button class="menu-button" onclick="showMenu()">Main Menu</button>
        `;
    }
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    if (event.key >= "0" && event.key <= "9") {
        appendToAnswer(event.key); // Append number to answer field
    } else if (event.key === "Enter") {
        checkAnswer(); // Check answer when Enter is pressed
        clearAnswer(); // Clear the answer field for the next round
    } else if (event.key === "Backspace") {
        let currentValue = document.getElementById("answer").value;
        document.getElementById("answer").value = currentValue.slice(0, -1); // Remove last character
    }
}

// Start game when page loads
window.onload = showMenu;

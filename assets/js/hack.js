// assets/js/hack.js
document.addEventListener("DOMContentLoaded", () => {
    const encryptBtn = document.getElementById("encrypt-btn");
    const decryptBtn = document.getElementById("decrypt-btn");
    const cryptoContent = document.getElementById("crypto-content");
    const cryptoTask = document.getElementById("crypto-task");
    const userInput = document.getElementById("user-input");
    const submitBtn = document.getElementById("submit-btn");
    const feedbackDiv = document.getElementById("feedback");
    const timerDiv = document.createElement("div");
    const scoreDiv = document.createElement("div");
    const levelDiv = document.createElement("div");
    const helpTableDiv = document.createElement("div");
    let timer;
    let score = 0;
    let level = 1;
    let currentTaskType = "";

    timerDiv.id = "timer";
    scoreDiv.id = "score";
    levelDiv.id = "level";
    helpTableDiv.id = "help-table";
    helpTableDiv.className = "help-table-container";
    cryptoContent.insertBefore(levelDiv, cryptoTask);
    cryptoContent.insertBefore(timerDiv, cryptoTask);
    cryptoContent.insertBefore(scoreDiv, cryptoTask);
    cryptoContent.insertBefore(helpTableDiv, cryptoTask);
    updateScore();
    updateLevel();
    showHelpTable();

    encryptBtn.addEventListener("click", () => {
        startCryptoTask("encrypt");
    });

    decryptBtn.addEventListener("click", () => {
        startCryptoTask("decrypt");
    });

    function startCryptoTask(type) {
        cryptoContent.style.display = "block";
        feedbackDiv.style.display = "none";
        userInput.value = "";
        currentTaskType = type;
        startTimer(30 - level * 2);

        let message = generateRandomMessage(level);
        let encryptedMessage = caesarShift(message, level * 3);

        if (type === "encrypt") {
            cryptoTask.innerHTML = `Krypter beskeden: '${message}' ved at forskyde hver bogstav med ${level * 3}.`;
            submitBtn.onclick = () => {
                checkAnswer(userInput.value, encryptedMessage);
            };
        } else if (type === "decrypt") {
            cryptoTask.innerHTML = `Dekrypter beskeden: '${encryptedMessage}' ved at forskyde hver bogstav med -${level * 3}.`;
            submitBtn.onclick = () => {
                checkAnswer(userInput.value, message);
            };
        }
    }

    function startTimer(seconds) {
        clearInterval(timer);
        timerDiv.style.display = "block";
        timerDiv.innerHTML = `Tid tilbage: ${seconds} sekunder`;

        timer = setInterval(() => {
            seconds--;
            timerDiv.innerHTML = `Tid tilbage: ${seconds} sekunder`;
            if (seconds <= 0) {
                clearInterval(timer);
                feedbackDiv.style.display = "block";
                feedbackDiv.innerHTML = "Tiden er udløbet! Prøv igen.";
                timerDiv.style.display = "none";
                disableSubmitButton();
            }
        }, 1000);
    }

    function checkAnswer(userAnswer, correctAnswer) {
        clearInterval(timer);
        feedbackDiv.style.display = "block";
        if (userAnswer.toUpperCase() === correctAnswer) {
            feedbackDiv.innerHTML = "Godt klaret! Du har løst opgaven korrekt.";
            score++;
            if (score % 10 === 0 && level < 10) {
                level++;
                updateLevel();
            }
            // Start næste opgave automatisk
            setTimeout(() => {
                startCryptoTask(currentTaskType);
            }, 2000);
        } else {
            feedbackDiv.innerHTML = "Forkert svar. Prøv igen! Svaret var: " + correctAnswer;
        }
        updateScore();
        disableSubmitButton();
    }

    function updateScore() {
        scoreDiv.innerHTML = `Point: ${score}`;
    }

    function updateLevel() {
        levelDiv.innerHTML = `Niveau: ${level}`;
    }

    function disableSubmitButton() {
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.disabled = false;
        }, 2000);
    }

    function caesarShift(str, amount) {
        return str
            .split("")
            .map((char) => {
                if (char.match(/[A-Z]/)) {
                    let code = char.charCodeAt(0);
                    code = ((code - 65 + amount + 26) % 26) + 65;
                    return String.fromCharCode(code);
                }
                return char;
            })
            .join("");
    }

    function generateRandomMessage(level) {
        const words = ["HELLO", "WORLD", "CRYPTO", "SECRET", "MESSAGE", "LEVEL", "SECURE", "CODE", "PUZZLE", "ENCRYPT"];
        return words[Math.floor(Math.random() * words.length)];
    }

    function showHelpTable() {
        let tableHTML = `<div class="help-title">Caesar Shift Hjælpetabel</div>
                         <table class="help-table">
                            <thead>
                                <tr>
                                    <th>Bogstav</th>
                                    <th>Forskyddet +3</th>
                                    <th>Forskyddet -3</th>
                                </tr>
                            </thead>
                            <tbody>`;
        for (let i = 0; i < 26; i++) {
            let originalChar = String.fromCharCode(65 + i);
            let shiftedPlus3 = String.fromCharCode(65 + ((i + 3) % 26));
            let shiftedMinus3 = String.fromCharCode(65 + ((i - 3 + 26) % 26));
            tableHTML += `<tr>
                            <td>${originalChar}</td>
                            <td>${shiftedPlus3}</td>
                            <td>${shiftedMinus3}</td>
                          </tr>`;
        }
        tableHTML += `</tbody></table>`;
        helpTableDiv.innerHTML = tableHTML;
    }
});


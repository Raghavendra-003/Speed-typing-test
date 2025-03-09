let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultIdEl = document.getElementById("resultId");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let uniqueId;
let counter = 0;

function startTimer() {
    counter = 0;
    timerEl.style.fontSize = "40px";
    uniqueId = setInterval(() => {
        counter++;
       let minutes = Math.floor(counter / 60); // Get minutes
        let seconds = counter % 60; // Get remaining seconds
        
        // Display time in MM:SS format
        timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds} `;
    }, 1000);
}

function resetTest() {
    resultIdEl.textContent = "";
    quoteInputEl.value = "";
    clearInterval(uniqueId);
    startTimer();
}

let url = "https://apis.ccbp.in/random-quote";
let options = { method: "GET" };

function fetchQuote() {
    spinnerEl.style.display = "block";
    fetch(url, options)
        .then(response => response.json())
        .then(jsonData => {
            let quote = jsonData.content;
            quoteDisplayEl.textContent = ""; // Clear previous quote

            for (let char of quote) {
                let span = document.createElement("span");
                span.textContent = char;
                quoteDisplayEl.appendChild(span);
            }

            spinnerEl.style.display = "none";
            resetTest();
        });
}

quoteInputEl.addEventListener("input", () => {
    let quoteChars = quoteDisplayEl.querySelectorAll("span");  
    let inputText = quoteInputEl.value.split("");  

    let isCorrectSoFar = true; // Ensure user types in order

    quoteChars.forEach((span, index) => {
        let typedChar = inputText[index];

        if (typedChar === undefined) {
            span.style.color = "black"; // Reset color if no input
        } else if (isCorrectSoFar && typedChar === span.textContent) {
            span.style.color = "green"; // Correct character
        } else {
            span.style.color = "red"; // Incorrect character
            // Stop further correct highlighting
        }
        span.style.fontSize = "20px";
        span.style.fontWeight = "bold";
    });
});


submitBtnEl.addEventListener("click", () => {
    spinnerEl.style.display = "block";
    setTimeout(() => {
        spinnerEl.style.display = "none";
        if (quoteDisplayEl.textContent === "" || quoteDisplayEl.textContent !== quoteInputEl.value.trim()) {
            resultIdEl.textContent = "You typed incorrect sentence";
            resultIdEl.style.color = "red";
        } else {
            clearInterval(uniqueId);
            resultIdEl.textContent = "You did correctly typed";
            resultIdEl.style.color = "green";
        }
    }, 1000);
});

resetBtnEl.addEventListener("click", () => {
    fetchQuote();
    resetTest();
});

fetchQuote();

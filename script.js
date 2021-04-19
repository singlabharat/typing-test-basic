const quoteElement = document.querySelector(".quote");
const inputElement = document.querySelector(".input");
let time;

inputElement.addEventListener("input", () => {
   const quoteArr = document.querySelectorAll("span");
   const inputArr = inputElement.value.split('');
   const inputLen = inputArr.length;
   let ok = true;
   quoteArr.forEach((span, i) => {
      if (i >= inputLen) {
         span.classList.remove("correct");
         span.classList.remove("incorrect");
         ok = false;
      } else if (span.innerText == inputArr[i]) {
         span.classList.add("correct");
         span.classList.remove("incorrect");
      } else {
         span.classList.add("incorrect");
         span.classList.remove("correct");
         ok = false;
      }
   })
   if (ok) {
      setTimeout(() => {
         renderNewQuote();
      }, 500);
   }
});

async function getRandomQuote() {
   return fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => data.content)
}

setInterval(() => {
   document.querySelector(".timer").innerText = time;
   time++;
}, 1000);

async function renderNewQuote() {
   time = 0;
   quoteElement.innerHTML = null;
   inputElement.value = null;
   let quote = await getRandomQuote();
   quote = quote.slice(0, -1);
   quote.split('').forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.innerText = char;
      quoteElement.appendChild(charSpan);
   })
};

renderNewQuote();
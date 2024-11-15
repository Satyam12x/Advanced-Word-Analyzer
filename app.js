const textInput = document.getElementById("text-input");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const sentenceCount = document.getElementById("sentence-count");
const paragraphCount = document.getElementById("paragraph-count");
const readingTime = document.getElementById("reading-time");
const wpm = document.getElementById("wpm");
const frequentWord = document.getElementById("frequent-word");
const feedbackMessage = document.getElementById("feedback-message");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");
const downloadBtn = document.getElementById("download-btn");

function updateCounts() {
  const text = textInput.value.trim();

  const words = text.match(/\b\S+\b/g) || [];
  wordCount.textContent = words.length;

  charCount.textContent = text.length;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  sentenceCount.textContent = sentences.length;

  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  paragraphCount.textContent = paragraphs.length;

  const readingMinutes = Math.round(words.length / 200);
  readingTime.textContent = readingMinutes + " min";

  wpm.textContent = Math.round(words.length / (readingMinutes || 1));

  const frequency = {};
  let maxFreq = 0;
  let maxWord = "N/A";
  words.forEach(word => {
    word = word.toLowerCase();
    frequency[word] = (frequency[word] || 0) + 1;
    if (frequency[word] > maxFreq) {
      maxFreq = frequency[word];
      maxWord = word;
    }
  });
  frequentWord.textContent = maxFreq > 1 ? maxWord : "N/A";
}

textInput.addEventListener("input", updateCounts);

copyBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text === "") {
    showFeedback("Cannot copy empty text.");
    return;
  }

  textInput.select();
  document.execCommand("copy");
  showFeedback("Text copied successfully!");
});

clearBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text === "") {
    showFeedback("Text area is already empty.");
    return;
  }

  textInput.value = "";
  updateCounts();
  showFeedback("Text cleared successfully!");
});

downloadBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text === "") {
    showFeedback("Cannot download empty text.");
    return;
  }

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "text-analysis.txt";
  link.click();
  showFeedback("Text downloaded successfully!");
});

function showFeedback(message) {
  feedbackMessage.textContent = message;
  feedbackMessage.style.display = "block";
  setTimeout(() => {
    feedbackMessage.style.display = "none";
  }, 3000);
}

updateCounts();

function generateRandomText() {
  const words = [
    "apple",
    "banana",
    "cherry",
    "dog",
    "elephant",
    "cat",
    "rabbit",
    "blue",
    "green",
    "yellow",
    "happy",
    "sad",
    "exciting",
    "wonderful",
    "beautiful",
    // Add more words as needed
  ];

  const wordCount = Math.floor(Math.random() * 21) + 10;
  const randomWords = [];

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords.join(" ");
}

export const replyFromGPT = (request, response) => {
  setTimeout(() => {
    const text = generateRandomText();
    return response.json({ text });
  }, 2000);
};

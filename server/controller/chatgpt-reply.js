/**
 * Generates a random text by combining words from a predefined list.
 *
 * returns {string} A random text string.
 */

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

/**
 * Responds to a request with a random generated text after a delay.
 *
 * param {Object} request - The request object.
 * param {Object} response - The response object.
 */

export const replyFromGPT = (request, response) => {
  setTimeout(() => {

     // Generate a random text
    const text = generateRandomText();

     // Send the random text as a JSON response
    return response.json({ text });
  }, 2000);     // Respond after a 2-second delay
};

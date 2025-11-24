const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1, L: 4, 
  M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, 
  Y: 2, Z: 1
};
const LETTER_SCORES = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, 
  L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, 
  W: 4, X: 8, Y: 4, Z: 10
}
const DRAW_TIMES = 10;
const BONUS_POINT_FOR_LENGTH = 8;

// wave 1
export const drawLetters = () => {
  const hand = [];
  const letters = [];

  for (const [letter, qty] of Object.entries(LETTER_POOL)){
    letters.push(...Array(qty).fill(letter));
  };

  for (let i = 0; i < DRAW_TIMES; i++){
    const randomIndex = Math.floor(Math.random() * letters.length);
    hand.push(letters[randomIndex]);
    [letters[randomIndex], letters[letters.length - 1]] = [letters[letters.length - 1], letters[randomIndex]];
    letters.pop();
  }
  return hand;
};


// wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const letterFreq = new Map();
  for (const letter of lettersInHand){
    letterFreq.set(letter, (letterFreq.get(letter) ?? 0) + 1);
  }

  for (const letter of input){
    const upperLetter = letter.toUpperCase()
    if (!letterFreq.has(upperLetter) || (letterFreq.get(upperLetter) === 0)){
      return false;
    }
    letterFreq.set(upperLetter, letterFreq.get(upperLetter) - 1);
  }
  return true;
};


// wave3
export const scoreWord = (word) => {
  let wordUpper = word.toUpperCase();
  let score = 0;

  for (const letter of wordUpper){
    score += LETTER_SCORES[letter];
  }
  if (word.length >= 7 && word.length <= 10){
    score += BONUS_POINT_FOR_LENGTH;
  }
  return score;
};


// wave 4
export const highestScoreFrom = (words) => {
  let maxScore = 0;
  let bestWord = words[0];

  for (const word of words){
    let score = scoreWord(word);
    if (score > maxScore){
      maxScore = score;
      bestWord = word;
    }else if (score === maxScore){
      bestWord = getWinnerWhenTie(word,bestWord);
    }
  } return { word: bestWord, score: maxScore};
};

const getWinnerWhenTie = (word,bestWord) => {
  if (word.length === 10 && bestWord.length != 10) return word;
  else if (word.length < bestWord.length && bestWord.length != 10) return word;
  return bestWord;
}
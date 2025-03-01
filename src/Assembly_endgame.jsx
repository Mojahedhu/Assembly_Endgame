import Header from "./component/Header";
import Status from "./component/Status";
import LanguageChips from "./component/Language_chips";
import { languages } from "../languages";
import CurrentWord from "./component/Current_word";
import React from "react";
import KeyboardButton from "./component/keyboard_button";
import { words } from "../words";
import ReactConfetti from "react-confetti";

export default function AssemblyEndgame() {
  // State values
  // check
  const [currentWord, setCurrentWord] = React.useState(() => [
    ...normalSelectWord(),
  ]);
  const [gussedLetters, setGussedLetters] = React.useState([]);
  function normalSelectWord() {
    const index = Math.ceil(Math.random() * words.length);
    return words[index];
  }
  function startNewGame() {
    setCurrentWord(() => [...normalSelectWord()]);
    setGussedLetters([]);
  }
  const lastGussedLetter = gussedLetters[gussedLetters.length - 1];
  const isLastGussedLetterWrong =
    lastGussedLetter && !currentWord.includes(lastGussedLetter.toLowerCase());
  // Derived values
  const wrongGuessCount = gussedLetters.filter(
    (e) => !currentWord.includes(e.toLowerCase())
  ).length;
  const isWon = currentWord.every((e) =>
    gussedLetters.includes(e.toUpperCase())
  );
  const languageElements = languages.map((item, index) => {
    const isLost = index < wrongGuessCount;
    return (
      <LanguageChips
        key={item.name}
        color={item.color}
        name={item.name}
        backgroundColor={item.backgroundColor}
        isLost={isLost}
      />
    );
  });
  const numGussedLeft = languageElements.length - 1 - wrongGuessCount;
  const isLost = wrongGuessCount >= languageElements.length - 1;
  const isGameOver = isWon || isLost;

  // Static values
  const alphapet = "abcdefghijklmnopqrstuvwxyz";
  function addGussedLetters(letter) {
    setGussedLetters((prev) => {
      return prev.includes(letter) ? prev : [...prev, letter];
    });
  }

  const currentWordElement = currentWord.map((e, index) => {
    const isShow = gussedLetters.includes(e.toUpperCase());

    return (
      <CurrentWord
        key={index}
        chara={e.toUpperCase()}
        show={isShow}
        isGameOver={isGameOver}
        isLost={isLost}
      />
    );
  });

  const keyboardButtons = alphapet.split("").map((e) => {
    const isGussed = gussedLetters.includes(e.toUpperCase());
    const isCorrect = isGussed && currentWord.includes(e);
    const isWrong = isGussed && !currentWord.includes(e);

    return (
      <KeyboardButton
        type={addGussedLetters}
        key={e}
        chara={e}
        isCorrect={isCorrect}
        isWrong={isWrong}
        isGameOver={isGameOver}
        gussedLetters={gussedLetters}
      />
    );
  });

  return (
    <main>
      {isWon && <ReactConfetti />}
      <Header />
      <Status
        isWon={isWon}
        isLost={isLost}
        wrongCount={wrongGuessCount}
        wrong={isLastGussedLetterWrong}
      />
      <section className="language-chips-container">{languageElements}</section>
      <section className="current-word-container">{currentWordElement}</section>
      {/*Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGussedLetter)
            ? `Correct: The letter ${lastGussedLetter} is in the word`
            : `Sorry, The letter ${lastGussedLetter} is not in the word.`}
          You have {numGussedLeft} attempts left
        </p>
        <p>{`Letter: ${currentWord
          .map((letter) =>
            currentWord.includes(letter) ? letter + "." : "Blank"
          )
          .join("")}`}</p>
      </section>
      <section className="keyboard-container">{keyboardButtons}</section>
      {isGameOver && (
        <section className="new-game-container">
          <button className="new-game" onClick={startNewGame}>
            New Game
          </button>
        </section>
      )}
    </main>
  );
}

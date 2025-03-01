import clsx from "clsx";
import PropTypes from "prop-types";

export default function KeyboardButton(props) {
  const className = clsx({ correct: props.isCorrect, wrong: props.isWrong });

  return (
    <button
      className={`keyboard-button ${className}`}
      aria-disabled={props.gussedLetters.includes(props.chara.toUpperCase())}
      aria-label={`Letter ${props.chara}`}
      onClick={() => {
        return props.type(props.chara.toUpperCase());
      }}
      disabled={props.isGameOver}
    >
      {props.chara.toUpperCase()}
    </button>
  );
}

KeyboardButton.propTypes = {
  chara: PropTypes.string.isRequired,
  type: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isWrong: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  gussedLetters: PropTypes.array.isRequired,
};

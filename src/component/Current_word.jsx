import PropTypes from "prop-types";
export default function CurrentWord(props) {
  const shouldRevealLetters = props.isGameOver || props.show;
  const text = shouldRevealLetters ? props.chara : "";
  const style = {
    color: props.isLost && !props.show ? "#ec5d49" : "unset",
  };
  return (
    <span className="current-word" style={style}>
      {text}
    </span>
  );
}

CurrentWord.propTypes = {
  chara: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  isLost: PropTypes.bool.isRequired,
};

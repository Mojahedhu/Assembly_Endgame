import PropTypes from "prop-types";
import clsx from "clsx";
import { languages } from "../../languages";
import { getFarewellText } from "../../utils";
export default function Status(props) {
  // const initialBool = !props.isWon && !props.isLost && props.wrongCount === 0;
  const messageBool = props.wrong;
  const pText = clsx(
    messageBool && getFarewellText(languages[props.wrongCount - 1].name)
  );
  const className = clsx(
    "status",
    props.isWon && "won",
    props.isLost && "lost",
    messageBool && !props.isLost && "message"
  );

  function creatFarewellMessage() {
    if (props.isWon) {
      return (
        <>
          <h2 className="status-title">"You Win!"</h2>
          <p className="status-description">"Well done! 🎉"</p>
        </>
      );
    } else if (props.isLost) {
      return (
        <>
          <h2 className="status-title">"Game Over"</h2>
          <p className="status-description">
            "You Lose! Better start learning Assemble 😭!"
          </p>
        </>
      );
    } else {
      return <p className="status-description-message">{pText}</p>;
    }
  }
  return (
    <section className={className} aria-live="polite" role="status">
      {creatFarewellMessage()}
    </section>
  );
}

Status.propTypes = {
  isWon: PropTypes.bool.isRequired,
  isLost: PropTypes.bool.isRequired,
  wrongCount: PropTypes.number.isRequired,
  wrong: PropTypes.bool.isRequired,
};

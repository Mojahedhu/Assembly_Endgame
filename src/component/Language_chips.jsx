import clsx from "clsx";
import PropTypes from "prop-types";

export default function LanguageChips(props) {
  const className = clsx("language-chip", props.isLost && "lost");
  return (
    <span
      className={className}
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
    >
      {props.name}
    </span>
  );
}

LanguageChips.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  isLost: PropTypes.bool.isRequired,
};

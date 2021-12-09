import PropTypes from "prop-types";
import { IconButton } from "@chakra-ui/react";
import { Star } from "react-feather";

export default function StarIcon({ onClick, isFavourite, size = "24", variant = "ghost" }) {
  return isFavourite ? (
    <IconButton
      onClick={onClick}
      variant={variant}
      colorScheme={isFavourite ? "yellow" : "gray"}
      icon={<Star size={size} fill="currentColor" />}
    />
  ) : (
    <IconButton
      onClick={onClick}
      variant={variant}
      colorScheme={isFavourite ? "yellow" : "gray"}
      icon={<Star size={size} />}
    />
  );
}

StarIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  size: PropTypes.number || PropTypes.string,
  variant: PropTypes.oneOf("ghost", "outlined", "solid"),
};

StarIcon.defaultProps = {
  variant: "ghost",
  size: "24",
};

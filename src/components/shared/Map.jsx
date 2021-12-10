import PropTypes from "prop-types";
import { Box, AspectRatio } from "@chakra-ui/react";

export default function Map({ location }) {
  return (
    <AspectRatio ratio={16 / 5}>
      <Box
        as="iframe"
        src={`https://maps.google.com/maps?q=${location.latitude}, ${location.longitude}&z=15&output=embed`}
        alt="demo"
      />
    </AspectRatio>
  );
}

Map.propTypes = {
  location: PropTypes.objectOf({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

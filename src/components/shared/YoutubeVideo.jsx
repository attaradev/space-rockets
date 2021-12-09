import PropTypes from "prop-types";
import { AspectRatio, Box } from "@chakra-ui/react";

export default function YoutubeVideo({ title, youtubeId }) {
  return (
    <AspectRatio maxH="400px" ratio={1.7}>
      <Box
        as="iframe"
        title={title}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        allowFullScreen
      />
    </AspectRatio>
  );
}

YoutubeVideo.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeId: PropTypes.string.isRequired,
};

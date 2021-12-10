import PropTypes from "prop-types";
import { Flex, Button } from "@chakra-ui/react";

export default function LoadMoreButton({ loadMore, isLoadingMore, isReachingEnd }) {
  return (
    <Flex justifyContent="center" my="100px">
      <Button
        onClick={loadMore}
        disabled={isReachingEnd || isLoadingMore}
        isLoading={isLoadingMore}>
        {isReachingEnd ? "That's all!" : "Show more..."}
      </Button>
    </Flex>
  );
}

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  isReachingEnd: PropTypes.bool.isRequired,
};

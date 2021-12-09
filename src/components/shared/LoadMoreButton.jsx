import PropTypes from "prop-types";
import { Flex, Button } from "@chakra-ui/react";

export default function LoadMoreButton({ loadMore, isLoadingMore, isReachingEnd }) {
  // const isReachingEnd =
  //   data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < pageSize);

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

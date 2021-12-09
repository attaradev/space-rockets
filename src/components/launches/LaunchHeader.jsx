import PropTypes from "prop-types";
import { Flex, Image, Box, Heading, Badge, Stack } from "@chakra-ui/react";

import { useFavourites } from "../../hooks";
import { StarIcon } from "../shared";

export default function LaunchHeader({ launch }) {
  const { isFavouriteLaunch, toggleLaunch } = useFavourites();
  const isFavourite = isFavouriteLaunch(launch);

  return (
    <Flex
      bgImage={`url(${launch.links.flickr_images[0]})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="30vh"
      position="relative"
      p={[2, 6]}
      alignItems="flex-end"
      justifyContent="space-between">
      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height={["85px", "150px"]}
        objectFit="contain"
        objectPosition="bottom"
      />
      <Box>
        <Heading
          color="white"
          display="inline"
          backgroundColor="#718096b8"
          fontSize={["lg", "5xl"]}
          px="4"
          py="2"
          borderRadius="lg">
          {launch.mission_name}
        </Heading>
      </Box>
      <Box>
        <Flex justifyContent="flex-end" pb=".6em">
          <StarIcon size="lg" onClick={() => toggleLaunch(launch)} isFavourite={isFavourite} />
        </Flex>
        <Stack isInline spacing="3">
          <Badge colorScheme="purple" fontSize={["xs", "md"]}>
            #{launch.flight_number}
          </Badge>
          {launch.launch_success ? (
            <Badge colorScheme="green" fontSize={["xs", "md"]}>
              Successful
            </Badge>
          ) : (
            <Badge colorScheme="red" fontSize={["xs", "md"]}>
              Failed
            </Badge>
          )}
        </Stack>
      </Box>
    </Flex>
  );
}

LaunchHeader.propTypes = {
  launch: PropTypes.shape({
    mission_name: PropTypes.string,
    launch_success: PropTypes.bool,
    launch_failure: PropTypes.bool,
    flight_number: PropTypes.string,
    links: PropTypes.objectOf({ flickr_images: PropTypes.arrayOf(PropTypes.string) }),
  }).isRequired,
};

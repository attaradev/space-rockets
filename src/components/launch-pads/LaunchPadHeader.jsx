import PropTypes from "prop-types";

import { Flex, Heading, Badge, Box, Stack, StarIcon } from "../shared";
import { useFavourites } from "../../hooks";

const randomColor = (start = 200, end = 250) => `hsl(${start + end * Math.random()}, 80%, 90%)`;

export default function LaunchPadHeader({ launchPad }) {
  const { isFavouriteLaunchPad, toggleLaunchPad } = useFavourites();
  const isFavourite = isFavouriteLaunchPad(launchPad);

  return (
    <Box
      background={`linear-gradient(${randomColor()}, ${randomColor()})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      minHeight="15vh"
      p={[2, 6]}>
      <Flex justifyContent="flex-end">
        <StarIcon size="35" isFavourite={isFavourite} onClick={() => toggleLaunchPad(launchPad)} />
      </Flex>
      <Flex
        position="relative"
        flexDirection={["column", "row"]}
        alignItems="flex-end"
        justifyContent="space-between">
        <Heading
          color="gray.900"
          display="inline"
          mx={[2, 4]}
          // my="2"
          fontSize={["md", "3xl"]}
          borderRadius="lg">
          {launchPad.site_name_long}
        </Heading>

        <Stack isInline spacing="3">
          <Badge colorScheme="purple" fontSize={["sm", "md"]}>
            {launchPad.successful_launches}/{launchPad.attempted_launches} successful
          </Badge>
          {launchPad.status === "active" ? (
            <Badge colorScheme="green" fontSize={["sm", "md"]}>
              Active
            </Badge>
          ) : (
            <Badge colorScheme="red" fontSize={["sm", "md"]}>
              Retired
            </Badge>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

LaunchPadHeader.propTypes = {
  launchPad: PropTypes.shape({
    status: PropTypes.string,
    site_name_long: PropTypes.string,
    successful_launches: PropTypes.number,
    attempted_launches: PropTypes.number,
  }).isRequired,
};

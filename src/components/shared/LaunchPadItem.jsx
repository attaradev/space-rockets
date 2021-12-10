import PropTypes from "prop-types";
import { Badge, Box, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useFavourites } from "../../hooks/favourites";
import StarIcon from "./StarIcon";

export default function LaunchPadItem({ launchPad }) {
  const navigate = useNavigate();
  const { toggleLaunchPad, isFavouriteLaunchPad } = useFavourites();
  const isFavourite = isFavouriteLaunchPad(launchPad);

  const redirect = () => navigate(`/launch-pads/${launchPad.site_id}`);

  const handleIconClick = (event) => {
    event.stopPropagation();
    toggleLaunchPad(launchPad);
  };

  return (
    <Box
      onClick={redirect}
      cursor="pointer"
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative">
      <Flex justifyContent="space-between" p="6">
        <Box>
          <Box d="flex" alignItems="baseline">
            {launchPad.status === "active" ? (
              <Badge px="2" variant="solid" colorScheme="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" colorScheme="red">
                Retired
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2">
              {launchPad.attempted_launches} attempted &bull; {launchPad.successful_launches}{" "}
              succeeded
            </Box>
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {launchPad.name}
          </Box>
          <Text color="gray.500" fontSize="sm">
            {launchPad.vehicles_launched.join(", ")}
          </Text>
        </Box>
        <Box justifyItems="flex-end">
          <StarIcon onClick={handleIconClick} isFavourite={isFavourite} />
        </Box>
      </Flex>
    </Box>
  );
}

LaunchPadItem.propTypes = {
  launchPad: PropTypes.shape({
    vehicles_launched: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    attempted_launches: PropTypes.number,
    successful_launches: PropTypes.number,
    status: PropTypes.string,
    site_id: PropTypes.string,
  }).isRequired,
};

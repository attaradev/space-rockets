import PropTypes from "prop-types";
import { Badge, Box, Image, Flex, Text, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { format as timeAgo } from "timeago.js";

import { formatDate } from "../../utils/format-date";
import { useFavourites } from "../../hooks/favourites";
import StarIcon from "./StarIcon";

export default function LaunchItem({ launch }) {
  const navigate = useNavigate();
  const { toggleLaunch, isFavouriteLaunch } = useFavourites();
  const isFavourite = isFavouriteLaunch(launch);
  const handleIconClick = (event) => {
    event.stopPropagation();
    toggleLaunch(launch);
  };

  const redirect = () => {
    navigate(`/launches/${launch.flight_number.toString()}`);
  };

  return (
    <Box
      onClick={redirect}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      cursor="pointer">
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2">
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
          <Spacer />
          <Box>
            <StarIcon onClick={handleIconClick} isFavourite={isFavourite} />
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

LaunchItem.propTypes = {
  launch: PropTypes.shape({
    launch_date_utc: PropTypes.string,
    mission_name: PropTypes.string,
    launch_success: PropTypes.bool,
    flight_number: PropTypes.number,
    links: PropTypes.shape({
      mission_patch_small: PropTypes.string,
      flickr_images: PropTypes.arrayOf(PropTypes.string),
    }),
    rocket: PropTypes.shape({ rocket_name: PropTypes.string }),
    launch_site: PropTypes.shape({ site_name: PropTypes.string }),
  }).isRequired,
};

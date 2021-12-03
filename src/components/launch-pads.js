import React from "react";
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { FavouriteIcon } from "./favourites";
import { useSpaceXPaginated } from "../utils/use-space-x";
import useFavourites from "../hooks/use-favourites";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

export function LaunchPadItem({ launchPad }) {
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
      position="relative"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launchPad.attempted_launches} attempted &bull;{" "}
            {launchPad.successful_launches} succeeded &bull;{" "}
            <FavouriteIcon
              onClick={handleIconClick}
              isFavourite={isFavourite}
            />
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.name}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}

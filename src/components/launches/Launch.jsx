import { useParams } from "react-router-dom";

import { Flex, Box, Text, Spinner, Breadcrumbs, Error, YoutubeVideo } from "../shared";
import LaunchHeader from "./LaunchHeader";
import TimeAndLocation from "./TimeAndLocation";
import RocketInfo from "./RocketInfo";
import Gallery from "./Gallery";
import { useSpaceX } from "../../hooks/space-x";

export default function Launch() {
  const { launchId } = useParams();
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

  if (error) return <Error />;
  if (!launch) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launches", to: "/launches" },
          { label: `#${launch.flight_number}` },
        ]}
      />
      <LaunchHeader launch={launch} />
      <Box m={[3, 6]}>
        <TimeAndLocation launch={launch} />
        <RocketInfo rocket={launch.rocket} />
        <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
          {launch.details}
        </Text>
        <YoutubeVideo title={launch.mission_name} youtubeId={launch.links.youtube_id} />
        <Gallery images={launch.links.flickr_images} />
      </Box>
    </div>
  );
}

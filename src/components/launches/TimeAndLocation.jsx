import PropTypes from "prop-types";
import { format as timeAgo } from "timeago.js";

import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
  Box,
  RouterLink,
  Link,
  MapPin,
  Watch,
} from "../shared";
import { formatDateTime } from "../../utils/format-date";

export default function TimeAndLocation({ launch }) {
  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={Watch} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Date
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          <Tooltip label={formatDateTime(launch.launch_date_local)}>
            {formatDateTime(launch.launch_date_utc, "UTC")}
          </Tooltip>
        </StatNumber>
        <StatHelpText>{timeAgo(launch.launch_date_utc)}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as={MapPin} width="1em" />{" "}
          <Box ml="2" as="span">
            Launch Site
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>
          <Link as={RouterLink} to={`/launch-pads/${launch.launch_site.site_id}`}>
            {launch.launch_site.site_name_long}
          </Link>
        </StatNumber>
        <StatHelpText>{launch.launch_site.site_name}</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
}

TimeAndLocation.propTypes = {
  launch: PropTypes.shape({
    launch_date_utc: PropTypes.string,
    launch_date_local: PropTypes.string,
    launch_site: PropTypes.shape({
      site_name: PropTypes.string,
      site_name_long: PropTypes.string,
      site_id: PropTypes.string,
    }),
  }).isRequired,
};

import PropTypes from "prop-types";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Box,
} from "@chakra-ui/react";
import { Navigation, Layers } from "react-feather";

const coreRecovery = (cores) => {
  if (cores.every((core) => core.land_success)) {
    return cores.length === 1 ? "Recovered" : "All recovered";
  }
  return "Lost";
};

export default function RocketInfo({ rocket }) {
  const { cores } = rocket.first_stage;

  return (
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" mt="4" p="4" borderRadius="md">
      <Stat>
        <StatLabel display="flex">
          <Box as={Navigation} width="1em" />{" "}
          <Box ml="2" as="span">
            Rocket
          </Box>
        </StatLabel>
        <StatNumber fontSize={["md", "xl"]}>{rocket.rocket_name}</StatNumber>
        <StatHelpText>{rocket.rocket_type}</StatHelpText>
      </Stat>
      <StatGroup>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              First Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>
            {cores.map((core) => core.core_serial).join(", ")}
          </StatNumber>
          <StatHelpText>{coreRecovery(cores)}</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel display="flex">
            <Box as={Layers} width="1em" />{" "}
            <Box ml="2" as="span">
              Second Stage
            </Box>
          </StatLabel>
          <StatNumber fontSize={["md", "xl"]}>Block {rocket.second_stage.block}</StatNumber>
          <StatHelpText>
            Payload:{" "}
            {rocket.second_stage.payloads.map((payload) => payload.payload_type).join(", ")}
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}

RocketInfo.propTypes = {
  rocket: PropTypes.shape({
    rocket_name: PropTypes.string,
    rocket_type: PropTypes.string,
    first_stage: PropTypes.objectOf({
      cores: PropTypes.arrayOf(
        PropTypes.objectOf({
          land_success: PropTypes.bool,
          length: PropTypes.number,
          core_serial: PropTypes.string,
        }),
      ),
    }),
    second_stage: PropTypes.objectOf({
      cores: PropTypes.arrayOf(
        PropTypes.objectOf({
          block: PropTypes.number,
          payloads: PropTypes.arrayOf(PropTypes.objectOf({ payload_type: PropTypes.string })),
        }),
      ),
    }),
  }).isRequired,
};

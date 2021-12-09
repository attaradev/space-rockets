import { Stack } from "@chakra-ui/react";
import PageLink from "./PageLink";

export default function Home() {
  return (
    <Stack m="6" spacing="6">
      <PageLink url="/launches">Browse SpaceX Launches</PageLink>
      <PageLink url="/launch-pads">Browse SpaceX Launch Pads</PageLink>
    </Stack>
  );
}

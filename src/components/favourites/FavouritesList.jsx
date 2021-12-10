import { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  SimpleGrid,
  useDisclosure,
  LaunchItem,
  LaunchPadItem,
} from "../shared";

import { useFavourites } from "../../hooks/favourites";

export default function FavouritesLists() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { launches, launchPads } = useFavourites();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} variant="outline" colorScheme="primary">
        Show Favourites
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favourites</DrawerHeader>

          <DrawerBody>
            <DrawerHeader>{`Launches (${launches.length})`}</DrawerHeader>
            <SimpleGrid>
              {launches.map((launch) => (
                <LaunchItem launch={launch} key={launch.flight_number} />
              ))}
            </SimpleGrid>
          </DrawerBody>
          <DrawerBody>
            <DrawerHeader>{`LaunchPads (${launchPads.length})`}</DrawerHeader>
            <SimpleGrid gap="4rem">
              {launchPads.map((launchPad) => (
                <LaunchPadItem launchPad={launchPad} key={launchPad.site_id} />
              ))}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

import React, { useRef } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { Star } from "react-feather";

import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";
import useFavourites from "../hooks/use-favourites";

export default function Favourites() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { launches, launchPads } = useFavourites();

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant="outline"
        colorScheme="primary"
      >
        Show Favourites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
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
            <SimpleGrid>
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

export function FavouriteIcon({
  onClick,
  isFavourite,
  size = "24",
  variant = "ghost",
}) {
  return (
    <IconButton
      onClick={onClick}
      variant={variant}
      colorScheme={isFavourite ? "yellow" : "gray"}
      icon={
        <Star size={size} {...(isFavourite ? { fill: "currentColor" } : {})} />
      }
    />
  );
}

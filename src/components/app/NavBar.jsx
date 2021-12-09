import { Flex, Text } from "../shared";
import { FavouritesList } from "../favourites";

export default function NavBar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white">
      <Text fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
        ¡SPACE·R0CKETS!
      </Text>
      <FavouritesList />
    </Flex>
  );
}

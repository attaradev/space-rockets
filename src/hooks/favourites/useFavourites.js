import { useContext } from "react";
import FavouritesContext from "../../contexts/favourites";

export default function useFavourites() {
  return useContext(FavouritesContext);
}

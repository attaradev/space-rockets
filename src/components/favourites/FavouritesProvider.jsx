/* eslint-disable camelcase */
import { useMemo } from "react";
import PropTypes from "prop-types";

import { useLocalStorage } from "../../hooks/favourites";
import FavouritesContext from "../../contexts/favourites";

export default function FavouritesProvider({ children }) {
  const [launches, setLaunches] = useLocalStorage("launches", []);
  const [launchPads, setLaunchPads] = useLocalStorage("launchPads", []);

  const isFavouriteLaunch = (launch) =>
    !!launches.find(({ flight_number }) => flight_number === launch.flight_number);

  const toggleLaunch = (launch) => {
    setLaunches(
      isFavouriteLaunch(launch)
        ? launches.filter(({ flight_number }) => flight_number !== launch.flight_number)
        : launches.concat(launch),
    );
  };

  const isFavouriteLaunchPad = (launchPad) =>
    !!launchPads.find(({ site_id }) => launchPad.site_id === site_id);

  const toggleLaunchPad = (launchPad) => {
    setLaunchPads(
      isFavouriteLaunchPad(launchPad)
        ? launchPads.filter(({ site_id }) => launchPad.site_id !== site_id)
        : launchPads.concat(launchPad),
    );
  };

  const value = useMemo(
    () => ({
      launchPads,
      launches,
      toggleLaunch,
      toggleLaunchPad,
      isFavouriteLaunch,
      isFavouriteLaunchPad,
    }),
    [launches, launchPads],
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

FavouritesProvider.propTypes = { children: PropTypes.element.isRequired };

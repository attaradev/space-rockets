import React, { createContext } from "react";

import useLocalStorage from "../hooks/use-local-storage";

export const FavouritesContext = createContext({
  launches: [],
  launchPads: [],
});

export const FavouritesProvider = ({ children }) => {
  const [launches, setLaunches] = useLocalStorage("launches", []);
  const [launchPads, setLaunchPads] = useLocalStorage("launchPads", []);

  const isFavouriteLaunch = (launch) =>
    !!launches.find(
      ({ flight_number }) => flight_number === launch.flight_number
    );

  const toggleLaunch = (launch) => {
    setLaunches(
      isFavouriteLaunch(launch)
        ? launches.filter(
            ({ flight_number }) => flight_number !== launch.flight_number
          )
        : launches.concat(launch)
    );
  };

  const isFavouriteLaunchPad = (launchPad) =>
    !!launchPads.find(({ site_id }) => launchPad.site_id === site_id);

  const toggleLaunchPad = (launchPad) => {
    setLaunchPads(
      isFavouriteLaunchPad(launchPad)
        ? launchPads.filter(({ site_id }) => launchPad.site_id !== site_id)
        : launchPads.concat(launchPad)
    );
  };

  return (
    <FavouritesContext.Provider
      value={{
        launchPads,
        launches,
        toggleLaunch,
        toggleLaunchPad,
        isFavouriteLaunch,
        isFavouriteLaunchPad,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

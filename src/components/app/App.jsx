import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./Home";
import NavBar from "./NavBar";
import { LaunchesList, Launch } from "../launches";
import { LaunchPadsList, LaunchPad } from "../launch-pads";
import { FavouritesProvider } from "../favourites";

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <FavouritesProvider>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/launches" element={<LaunchesList />} />
              <Route path="/launches/:launchId" element={<Launch />} />
              <Route path="/launch-pads" element={<LaunchPadsList />} />
              <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
            </Routes>
          </div>
        </FavouritesProvider>
      </ChakraProvider>
    </Router>
  );
}

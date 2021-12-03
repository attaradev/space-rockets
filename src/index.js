import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./components/app";
import { FavouritesProvider } from "./contexts/favourites";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

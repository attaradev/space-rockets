/* eslint-disable react/jsx-filename-extension */
import { render, screen } from "@testing-library/react";

import App from "./components/app";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders launches link", () => {
    render(<App />);
    expect(screen.getByText(/Browse SpaceX Launches/i)).toBeDefined();
  });

  it("renders launch pads link", () => {
    render(<App />);
    expect(screen.getByText(/Browse SpaceX Launch Pads/i)).toBeDefined();
  });
});

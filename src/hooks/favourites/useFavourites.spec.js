import { renderHook, act } from "@testing-library/react-hooks";
import useFavourites from "./useFavourites";
import { FavouritesProvider } from "../../components/favourites";

describe("useFavourites hook", () => {
  it("renders successfully", () => {
    renderHook(() => useFavourites());
  });

  it("return initial values", () => {
    const { result } = renderHook(() => useFavourites());
    expect(result.current.launchPads).toEqual([]);
    expect(result.current.launches).toEqual([]);
  });

  it("adds launch to favourites", () => {
    const launch = { flight_number: 1 };
    const { result } = renderHook(() => useFavourites(), { wrapper: FavouritesProvider });
    act(() => {
      result.current.toggleLaunch(launch);
    });
    expect(result.current.launches).toEqual([launch]);
  });

  it("adds launchPad to favourites", () => {
    const launchPad = { site_id: 2 };
    const { result } = renderHook(useFavourites, { wrapper: FavouritesProvider });
    act(() => {
      result.current.toggleLaunchPad(launchPad);
    });
    expect(result.current.launchPads).toEqual([launchPad]);
  });
});

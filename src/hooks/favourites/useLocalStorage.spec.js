import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage hook", () => {
  const key = "test";
  const value = "test value";

  it("renders successfully", () => {
    renderHook(() => useLocalStorage(key, value));
  });

  it("return initial value", () => {
    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current[0]).toBe(value);
  });

  it("set value successfully", () => {
    const updatedValue = "NEW VALUE";
    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current[0]).toBe(value);
    act(() => {
      result.current[1](updatedValue);
    });
    expect(result.current[0]).toBe(updatedValue);
  });
});

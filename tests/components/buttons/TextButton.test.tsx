import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TextButton from "@/components/buttons/TextButton";

describe("TextButton Component", () => {
  it("renders correctly with given title", () => {
    const { getByText } = render(
      <TextButton title="Click Me" onPress={() => { }} disabled={false} />,
    );
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TextButton title="Press Me" onPress={onPressMock} />,
    );
    fireEvent.press(getByText("Press Me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TextButton title="Disabled" onPress={onPressMock} disabled={true} />,
    );
    const button = getByText("Disabled");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});

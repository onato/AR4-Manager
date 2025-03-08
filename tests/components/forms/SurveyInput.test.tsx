import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SurveyInput from "@/components/forms/SurveyInput";

describe("SurveyInput Component", () => {
  it("renders correctly with initial value", () => {
    const { getByDisplayValue } = render(
      <SurveyInput value="TEST" onChangeText={() => { }} />,
    );
    expect(getByDisplayValue("TEST")).toBeTruthy();
  });

  it("calls onChangeText with filtered text", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SurveyInput value="" onChangeText={mockOnChangeText} />,
    );

    const input = getByPlaceholderText("Name");
    fireEvent.changeText(input, "TEST@12");
    expect(mockOnChangeText).toHaveBeenCalledWith("TEST_12");
  });

  it("limits input to 7 characters", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SurveyInput value="" onChangeText={mockOnChangeText} />,
    );

    const input = getByPlaceholderText("Name");
    fireEvent.changeText(input, "TOOLONGTEXT");
    expect(mockOnChangeText).toHaveBeenCalledWith("TOOLONG");
  });
});

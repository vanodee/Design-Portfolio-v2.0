import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DigitalClock from "./DigitalClock";

describe("DigitalClock", () => {
  it("renders a formatted WAT time", () => {
    render(<DigitalClock />);

    expect(screen.getByText("WAT")).toBeInTheDocument();
    expect(screen.getByText(/^(0[1-9]|1[0-2])$/)).toBeInTheDocument();
  });
});

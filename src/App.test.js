import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

it("renders app", () => {
  render(<App />);
  expect(screen.getByText("Notes")).toBeInTheDocument();
});

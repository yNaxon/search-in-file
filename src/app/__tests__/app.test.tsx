import React from "react";
import { render } from "../../test-utils";
import App from "../app";

it("renders without crashing", () => {
  render(<App />);
});
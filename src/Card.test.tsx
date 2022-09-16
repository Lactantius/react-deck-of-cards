import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("renders", () => {
  render(<Card imgURL="test" key="test" value="KH" />);
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/src/app/coin/page";

describe("CoinPage", () => {
  it("renders", () => {
    render(<Page params={{ slug: "bitcoin" }} />);

    setTimeout(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    }, 4000);
  });
});

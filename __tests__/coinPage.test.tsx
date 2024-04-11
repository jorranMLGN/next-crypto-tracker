import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/src/app/coin/[slug]/page";

describe("CoinPage", () => {
  it("renders", () => {
    render(<Page params={{ slug: "bitcoin" }} />);

    setTimeout(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("$")).toBeInTheDocument();
    }, 4000);
  });
  it("should render the page with the correct title and data", () => {
    // Arrange
    const params = { slug: "bitcoin" };

    // Act
    render(<Page params={params} />);

    setTimeout(() => {
      // Assert
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Coin Details")).toBeInTheDocument();
      expect(
        screen.getByText("Lipsum dolor sit amet, consectetur adipiscing elit")
      ).toBeInTheDocument();
    }, 4000);
  });

  it("should handle the case where the coin data is not yet loaded", () => {
    // Arrange
    const params = { slug: "bitcoin" };

    // Act
    render(<Page params={params} />);

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

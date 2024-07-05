import React from "react";
import { mount } from "cypress/react";
import CardPlate from "./CardPlate"; // Adjust the import path as needed
import { CoinType } from "@/lib/types";

describe("CardPlate Component", () => {
  const mockCoin: CoinType = {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "19000000",
    maxSupply: "21000000",
    marketCapUsd: "1000000000000",
    volumeUsd24Hr: "20000000000",
    priceUsd: "50000",
    changePercent24Hr: "2.5",
    vwap24Hr: "49000",
    explorer: "https://blockchain.info/",
  };

  it("displays positive price change in green", () => {
    mount(<CardPlate coin={mockCoin} />);
    cy.get(".text-xs").should("have.css", "color", "rgb(0, 128, 0)");
  });

  it("displays negative price change in red", () => {
    const coinWithNegativeChange = { ...mockCoin, changePercent24Hr: "-1.5" };
    mount(<CardPlate coin={coinWithNegativeChange} />);
    cy.get(".text-xs").should("have.css", "color", "rgb(255, 0, 0)");
  });

  it("renders loading spinner when price is not available", () => {
    const coinWithoutPrice = { ...mockCoin, priceUsd: "" };
    mount(<CardPlate coin={coinWithoutPrice} />);
    cy.get(".animate-spin").should("be.visible");
  });

  it("links to the correct coin detail page", () => {
    mount(<CardPlate coin={mockCoin} />);
    cy.get("a").should("have.attr", "href", "/coin/bitcoin");
  });

  it("updates price change when coin data changes", () => {
    mount(<CardPlate coin={mockCoin} />);
    cy.get(".text-xs").should("contain", "2.5");

    const updatedCoin = { ...mockCoin, changePercent24Hr: "3.7" };
    mount(<CardPlate coin={updatedCoin} />);
    cy.get(".text-xs").should("contain", "3.7");
  });
});

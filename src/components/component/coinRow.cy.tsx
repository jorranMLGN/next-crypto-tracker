import React from "react";
import { mount } from "cypress/react";
import { CoinRow } from "./CoinRow"; // Adjust the import path as needed
import { CoinType } from "@/lib/types";

describe("CoinRow Component", () => {
  const mockCoin: CoinType = {
    id: "bitcoin",
    rank: "1",
    name: "Bitcoin",
    supply: "19000000",
    changePercent24Hr: "2.5",
    priceUsd: "50000.12345678",
    explorer: "https://www.blockchain.com/btc",
    symbol: "BTC",
    marketCapUsd: "1000000000000",
    maxSupply: "21000000",
    volumeUsd24Hr: "1000000000",
    vwap24Hr: "50000",
  };

  beforeEach(() => {
    mount(<CoinRow {...mockCoin} />);
  });

  it("renders the coin rank", () => {
    cy.get("td").first().find("div").should("have.text", "1");
  });

  it("renders the coin ID and name", () => {
    cy.get("td").eq(1).find("div").first().should("have.text", "bitcoin");
    cy.get("td").eq(1).find("div").last().should("have.text", "Bitcoin");
  });

  it("renders the coin supply", () => {
    cy.get("td").eq(2).should("have.text", "19000000");
  });

  it("renders the price change percentage with correct color", () => {
    cy.get("td")
      .eq(3)
      .find("p")
      .should("have.text", "+2.5%")
      .and("have.css", "color", "rgb(0, 128, 0)"); // Green color
  });

  it("renders the price in USD", () => {
    cy.get("td")
      .eq(4)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.match(/^\$\s*50000\.1234$/);
      });
  });

  it("renders the View button with correct link", () => {
    cy.get("td")
      .last()
      .find("a")
      .should("have.text", "View")
      .invoke("attr", "href")
      .then((href) => href?.trim())
      .should("eq", "/coin/bitcoin");
  });

  it("handles negative price change", () => {
    const negativeMockCoin = { ...mockCoin, changePercent24Hr: "-1.5" };
    mount(<CoinRow {...negativeMockCoin} />);

    cy.get("td")
      .eq(3)
      .find("p")
      .should("have.text", "-1.5%")
      .and("have.css", "color", "rgb(255, 0, 0)"); // Red color
  });

  it("handles long supply numbers", () => {
    const longSupplyMockCoin = { ...mockCoin, supply: "19000000.12345678" };
    mount(<CoinRow {...longSupplyMockCoin} />);

    cy.get("td").eq(2).should("have.text", "19000000");
  });

  it("handles long price numbers", () => {
    const longPriceMockCoin = { ...mockCoin, priceUsd: "50000.123456789012" };
    mount(<CoinRow {...longPriceMockCoin} />);

    cy.get("td")
      .eq(4)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.match(/^\$\s*50000\.1234/);
      });
  });
});

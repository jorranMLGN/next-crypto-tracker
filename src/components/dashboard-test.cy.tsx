import React from "react";
import { mount } from "cypress/react";
import Dashboard from "./Dashboard"; // Adjust the import path as needed
import { CoinContext } from "@/src/providers/CoinContext";
import { CoinType } from "@/lib/types";

describe("Dashboard Component", () => {
  const mockCoins: CoinType[] = [
    {
      id: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      rank: "1",
      priceUsd: "50000",
      changePercent24Hr: "2.5",
      marketCapUsd: "1000000000000",
      supply: "19000000",
      maxSupply: "21000000",
      volumeUsd24Hr: "20000000000",
      vwap24Hr: "49000",
      explorer: "https://blockchain.info/",
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      rank: "2",
      priceUsd: "3000",
      changePercent24Hr: "1.8",
      marketCapUsd: "500000000000",
      supply: "120000000",
      maxSupply: null,
      volumeUsd24Hr: "15000000000",
      vwap24Hr: "2950",
      explorer: "https://etherscan.io/",
    },
  ];

  const mountComponent = (coins = mockCoins) => {
    mount(
      <CoinContext.Provider
        value={{
          coins,
          setCoins: () => {},
        }}
      >
        <Dashboard>
          <div>Dashboard Content</div>
        </Dashboard>
      </CoinContext.Provider>
    );
  };

  beforeEach(() => {
    mountComponent();
  });

  it("renders the navigation menu", () => {
    cy.contains("Dashboard").should("be.visible");
    cy.contains("Charts").should("be.visible");
    cy.contains("Favorites").should("be.visible");
  });

  it("renders the search input", () => {
    cy.get('input[type="search"]').should("be.visible");
  });

  it("shows search results when typing", () => {
    cy.get('input[type="search"]').type("bitcoin");
    cy.contains("Bitcoin").should("be.visible");
    cy.contains("BTC").should("be.visible");
  });

  it("clears search results when clicking outside", () => {
    cy.get('input[type="search"]').type("bitcoin");
    cy.contains("Bitcoin").should("be.visible");
    cy.get("body").click();
    cy.contains("Bitcoin").should("not.exist");
  });

  it("renders children content", () => {
    cy.contains("Dashboard Content").should("be.visible");
  });
});

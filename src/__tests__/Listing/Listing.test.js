import React, { act } from "react";
import ReactDOM from "react-dom/client";
import { screen, fireEvent } from "@testing-library/react";
import Listing from "../../components/Listing/Listing";
import ListingController from "../../controllers/ListingController";
import { BrowserRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");

jest.mock("../../controllers/ListingController");
jest.mock("../../services/ApiService.js");

describe("Listing Component", () => {
  beforeEach(() => {
    ListingController.mockClear();
  });

  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("renders component with fetched items", async () => {
    await act(async () => {
      const mockItems = [
        {
          name: "Item 1",
          country: "Country A",
          webPages: "http://example.com",
        },
        {
          name: "Item 2",
          country: "Country B",
          webPages: "http://example.com",
        },
      ];
      ListingController.mockImplementation(() => ({
        getItems: jest.fn().mockResolvedValue(mockItems),
      }));
      ReactDOM.createRoot(container).render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Listing />} />
          </Routes>
        </BrowserRouter>
      );
    });

    // Verify that fetched items are displayed
    expect(screen.getByText("University Listing")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("handles search correctly", async () => {
    await act(async () => {
      const mockItems = [
        {
          name: "Item 1",
          country: "Country A",
          webPages: "http://example.com",
        },
        {
          name: "Item 2",
          country: "Country B",
          webPages: "http://example.com",
        },
      ];
      ListingController.mockImplementation(() => ({
        getItems: jest.fn().mockResolvedValue(mockItems),
      }));
      ReactDOM.createRoot(container).render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Listing />} />
          </Routes>
        </BrowserRouter>
      );
    });

    // Perform search
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Item 1" },
    });

    // Verify that only filtered item is displayed
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
  });
});

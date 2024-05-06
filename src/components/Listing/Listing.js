import React, { useState, useEffect, useMemo } from "react";
import ListingController from "../../controllers/ListingController";
import ErrorModal from "../common/ErrorModal";
import { useNavigate } from "react-router-dom";
import ListingItem from "./ListingItem";
import "./Listing.css";

const Listing = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedItems, setSortedItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [error, setError] = useState(null);

  const listingController = useMemo(() => new ListingController(), []);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let fetchedItems;
      const cachedData = localStorage.getItem("universityData"); // Get data from cache before fetching it from server
      if (cachedData) {
        fetchedItems = JSON.parse(cachedData);
      } else {
        // If cachedData not available in localStorage will call the API
        fetchedItems = await listingController.getItems();
        localStorage.setItem("universityData", JSON.stringify(fetchedItems));
      }
      setItems(fetchedItems);
      setSortedItems(fetchedItems);
    } catch (error) {
      handleFetchError(); // If we got error while fetching from server will check that data is available in localStorage
    }
  };

  const handleFetchError = () => {
    const cachedData = localStorage.getItem("universityData");
    if (cachedData !== "undefined") {
      const fetchedItems = JSON?.parse(cachedData);
      setItems(fetchedItems);
      setSortedItems(fetchedItems);
    } else {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  const handleDeleteItem = (itemName) => {
    const updatedItems = items.filter((item) => item?.name !== itemName);
    setItems(updatedItems);
    const updatedSortedItems = sortedItems?.filter(
      (item) => item?.name !== itemName
    );
    setSortedItems(updatedSortedItems);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const handleItemClick = (item) => {
    // Navigate to Details page with item details
    navigate(`/details/${item.name}`, { state: { item } });
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    if (option === "name") {
      const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
      setSortedItems(sorted);
    } else if (option === "country") {
      const sorted = [...items].sort((a, b) =>
        a.country.localeCompare(b.country)
      );
      setSortedItems(sorted);
    }
  };

  const filteredItems = sortedItems?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listing-page">
      <header className="header">
        <h1>University Listing</h1>
      </header>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="country">Country</option>
        </select>
      </div>
      <div className="listing-container">
        {filteredItems?.map((item) => (
          <div key={item?.name}>
            <ListingItem
              item={item}
              handleItemClick={handleItemClick}
              handleDeleteItem={handleDeleteItem}
            />
          </div>
        ))}
      </div>
      {error && (
        <ErrorModal errorMessage={error} onClose={() => setError(null)} />
      )}
      <footer className="footer">
        <p>&copy; 2024 University Listing App</p>
      </footer>
    </div>
  );
};

export default Listing;

import React from "react";

const ListingItem = ({ item, handleItemClick, handleDeleteItem }) => {
  return (
    <div
      key={item.name}
      data-testid="filteredItems-container"
      className="listing-card"
    >
      <button onClick={() => handleDeleteItem(item.name)}>Delete</button>
      <div onClick={() => handleItemClick(item)}>
        <h3>{item.name}</h3>
        <p>Country: {item.country}</p>
        {item.domains && <p>Domains: {item.domains}</p>}
        <p>
          Web Pages: <a href={item.webPages}>{item.webPages}</a>
        </p>
      </div>
    </div>
  );
};

export default ListingItem;

import React from "react";
import { useLocation } from "react-router-dom";
import "./Details.css"; // Import CSS for Details page styling

const Details = () => {
  const location = useLocation();
  const { state } = location;
  const { item } = state;

  return (
    <div className="details-page">
      <div
        className="details-container"
        style={{
          backgroundImage: `url('https://static.zawya.com/view/acePublic/alias/contentid/OTQ5ZGJiZTItYmU5Zi00/2/abudhabiuniversity-jpg.webp')`,
        }}
      >
        <div className="details-content">
          <h2>{item.name}</h2>
          <p>
            <strong>Country:</strong> {item.country}
          </p>
          {item.domains && (
            <p>
              <strong>Domains:</strong> {item.domains}
            </p>
          )}
          <p>
            <strong>Web Pages:</strong>{" "}
            <a href={item.webPages}>{item.webPages}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;

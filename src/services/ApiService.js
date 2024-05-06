import axios from "axios";

const API_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map((item) => ({
      name: item.name,
      country: item.country,
      domains: item.domains,
      webPages: item.web_pages,
      stateProvince: item.state_province,
      alphaTwoCode: item.alpha_two_code,
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export { fetchItems };

import { fetchItems } from "../services/ApiService";
import ItemModel from "../models/ItemModel";

class ListingController {
  async getItems() {
    try {
      const data = await fetchItems();
      return data.map((item) => new ItemModel(item));
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }
}

export default ListingController;

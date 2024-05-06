class ItemModel {
  constructor(data) {
    this.name = data.name;
    this.country = data.country;
    this.domains = data.domains[0];
    this.webPages = data.webPages?.[0];
    this.stateProvince = data?.stateProvince;
    this.alphaTwoCode = data.alphaTwoCode;
  }
}

export default ItemModel;

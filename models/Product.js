export default class Product {
  constructor(
    name = "",
    code = "",
    created_at = "",
    image = [],
    price = "",
    category = "",
    spec = "",
    brand = "",
    status = true,
    view_count = "",
    discount = "",
    description = "",
    store = "",
  ) {
    this.name = String(name);
    this.code = String(code);
    this.created_at = String(created_at);
    this.image = Array((image));
    this.price = Number(price);
    this.category = Object(category);
    this.discount = Number(discount);
    this.spec = Object(spec);
    this.brand = Object(brand);
    this.status = Boolean(status);
    this.view_count = Number(view_count);
    this.description = String(description);
    this.store = Object(store);
  }
}

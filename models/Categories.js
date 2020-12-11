export default class Categories {
  constructor(
    id='',name = "", description = "", created_at = "",image=''
  ) {
    this.id = String(id);
    this.name = String(name);
    this.description = String(description);
    this.image = Object(image);
    this.created_at = String(created_at);
  }
}

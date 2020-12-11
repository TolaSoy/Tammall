export default class Brands {
  constructor(
    id = '',
    name = '',
    image='',
    description = '',
    created_at = ''
    )
  {
    this.id = String(id);
    this.name = String(name);
    this.image = Object(image);
    this.description = String(description);
    this.created_at = String(created_at);
  }
}

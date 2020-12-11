export default class Slides {
  constructor(
    id = '',
    title = '',
    image='',
    created_at = ''
  )
  {
    this.id = String(id);
    this.title = String(title);
    this.image = Object(image);
    this.created_at = String(created_at);
  }
}

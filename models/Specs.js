export default class Specs {
  constructor(
    id='',
    name = "",
    code='',
    description = "",
    icon = "",
    created_at = "") {
    this.id = String(id);
    this.name = String(name);
    this.code = String(code)
    this.description = String(description);
    this.icon = String(icon);
    this.created_at = String(created_at);
  }
}

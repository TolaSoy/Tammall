export default class Stores {
    constructor(
      id='',
      name = "",
      profile='',
      banner='',
      user='',
      status='',
      member='',
      location='',
      created_at = ""

    ) {
      this.id = String(id);
      this.name = String(name);
      this.profile = Object(profile);
      this.banner = Object(banner);
      this.user = Object(user);
      this.status = Boolean(status),
      this.member = Array(member),
      this.location = String(location),
      this.created_at = String(created_at);
    }
}

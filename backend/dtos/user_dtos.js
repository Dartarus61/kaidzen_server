class UserDto {
  email;
  id;
  isActivated;
  name;
  surname;
  secondname;
  group;
  constructor(model) {
    this.email = model.login;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.surname = model.surname;
    this.secondname = model.secondname;
    this.group = model.group;
  }
}
export { UserDto };

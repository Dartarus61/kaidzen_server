class UserDto {
  email;
  id;
  isActivated;
  name;
  surname;
  secondname;
  group;
  role;
  constructor(model) {
    this.email = model.login;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.surname = model.surname;
    this.secondname = model.secondname;
    this.group = model.group;
    this.role = model.role;
  }
}
export { UserDto };

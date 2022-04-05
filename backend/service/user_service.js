import User from "../models/user_models.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail_service.js";
import tokenService from "./token_service.js";
import { UserDto } from "../dtos/user_dtos.js";
import ApiError from "../exception/api_error.js";

class UserService {
  async registration(data) {
    const candidate = await User.findOne({
      where: { login: data.email },
      raw: true,
    });

    if (candidate) {
      throw ApiError.BadRequest(`User with ${data.email} already have account`);
    }
    const hashPass = await bcrypt.hash(data.password, 3);
    const acticationLink = uuidv4();
    const newUser = await User.create({
      login: data.email,
      password: hashPass,
      name: data.name,
      surname: data.surname,
      secondname: data.secondname,
      group: data.group,
      acticationLink: acticationLink,
    });
    /* await mailService.sendActivationMail(
      data.email,
      `${process.env.API_URL}/api/activate/${acticationLink}`
    ); */
    const userDto = new UserDto(newUser.toJSON());
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(newUser, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(acticationLink) {
    const user = await User.findOne({ acticationLink });
    if (!user) {
      throw ApiError.BadRequest("Incorrect link");
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await User.findOne({
      where: {
        login: email,
      },
      raw: true,
    });
    if (!user) {
      throw ApiError.BadRequest("user with this email is not found");
    }
    const isPassEq = await bcrypt.compare(password, user.password);
    if (!isPassEq) {
      throw ApiError.BadRequest("wrong password");
    }

    const userDto = new UserDto(user);
    const sickuser = User.build({
      ...user,
    });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(sickuser, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthrizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthrizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const sickuser = User.build({
      ...user,
    });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(sickuser, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}
export default new UserService();

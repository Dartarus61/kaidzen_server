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
      where: { login: data.login },
      raw: true,
    });

    if (candidate) {
      throw ApiError.BadRequest(`User with ${data.login} already have account`);
    }
    const hashPass = await bcrypt.hash(data.password, 3);
    const acticationLink = uuidv4();
    const newUser = await User.create({
      login: data.login,
      password: hashPass,
      name: data.name,
      surname: data.surname,
      secondname: data.secondname,
      group: data.group,
      acticationLink: acticationLink,
    });
    /* await mailService.sendActivationMail(
      data.login,
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
  async login(login, password) {
    const user = await User.findOne({
      where: {
        login: login,
      },
      raw: true,
    });
    if (!user) {
      throw ApiError.BadRequest("user with this login is not found");
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
  async ChangeRoleUser(userData) {
    try {
      const user = await User.update(
        { role: userData.role, area_of_improvement: userData.area },
        { where: { id: userData.id } }
      );
      return "successful";
    } catch (error) {
      return ApiError.BadRequest(error);
    }
  }
  async ResetPass(userData) {
    const user = await User.findOne({
      where: { login: userData.login },
      raw: true,
    });
    if (!user) {
      return ApiError.BadRequest("user with this login is not found");
    } /* else {
      await mailService.sendActivationMail(
        data.login,
        `${process.env.API_URL}/api/activate/${user.acticationLink}`
      );
    } */
    const isPassEq = await bcrypt.compare(userData.password, user.password);
    if (!isPassEq) {
      const NewPass = await bcrypt.hash(userData.password, 3);
      await User.update(
        { password: NewPass },
        { where: { login: userData.login } }
      );
      return "pass reset";
    } else return "passwords cant be equals";
  }
}
export default new UserService();

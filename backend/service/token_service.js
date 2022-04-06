import jsonwebtoken from "jsonwebtoken";
import tokenModel from "../models/token_model.js";
import "../config.js";

class TokenService {
  generateTokens(payload) {
    const accsessToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1h" }
    );
    return {
      accsessToken,
      refreshToken,
    };
  }
  async saveToken(user, refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: { id: user.id },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    } else {
      await user.createUserToken({ refreshToken });
    }
    /*  const token = await tokenModel.create({
      user,
      refreshToken,
    });
    return token; */
  }

  validateAccessToken(token) {
    try {
      const UserData = jsonwebtoken.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      return UserData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const UserData = jsonwebtoken.verify(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      return UserData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: {
        refreshToken,
      },
    });
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({
      where: {
        refreshToken,
      },
    });
    return tokenData;
  }
}
export default new TokenService();

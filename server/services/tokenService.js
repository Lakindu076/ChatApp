const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require("../model/refresh");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token, userId) {
    const res = await refreshModel.findOne({ userId });
    if (res) {
      return await refreshModel.updateOne({ userId }, { token });
    }
    return await refreshModel.create({ token, userId });
  }
  verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }
  async findRefreshToken(userId) {
    return await refreshModel.findOne({ userId: userId });
  }
  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }
  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();

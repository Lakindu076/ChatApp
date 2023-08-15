const { verifyBody } = require("../utils/verifyBody");
const { error: errorHandler } = require("../utils/error");
const UserService = require("../services/authService");
const TokenService = require("../services/tokenService");

class AuthController {
  async login(req, res) {
    if (!verifyBody(req.body, ["name", "email"])) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      let user;
      user = await UserService.findUser({ email: req.body.email });
      if (!user) {
        user = await UserService.createUser(req.body);
      }
      const { accessToken, refreshToken } = TokenService.generateTokens({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
      await TokenService.storeRefreshToken(refreshToken, user?._id);
      res.status(200).json({
        user,
        tokens: { at: accessToken, rt: refreshToken },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async refresh(req, res) {
    if (!verifyBody(req.body, ["rt"])) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      const { rt: refreshTokenFromCookie } = req.body;
      const userData = TokenService.verifyRefreshToken(
        refreshTokenFromCookie
      );

      if (!userData) {
        return res.status(400).json({ msg: "error" });
      }

      const token = await TokenService.findRefreshToken(userData._id);
      if (!token) {
        return res.status(400).json({ msg: "error" });
      }

      const user = await UserService.findUser({ _id: userData._id });
      if (!user) {
        return res.status(400).json({ msg: "error" });
      }

      const { refreshToken, accessToken } = TokenService.generateTokens({
        _id: userData?._id,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
      });

      await TokenService.updateRefreshToken(userData?._id, refreshToken);
      res.status(200).json({
        user: user,
        tokens: { at: accessToken, rt: refreshToken },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async logout(req, res) {
    const { rt: refreshToken } = req.body;
    // delte refresh token from db
    try {
      await TokenService.removeToken(refreshToken);
      res.status(200).json({ auth: true });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async updateName(req, res) {
    const user = req.user;
    const { name } = req.body;
    if (!user || !name) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      await UserService.updateUser(user?._id, { name });
      res.status(200).json({ auth: true });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async updateAvatar(req, res) {
    const user = req.user;
    const { avatar } = req.body;
    if (!user || !avatar) {
      return res.status(400).json({ msg: "error" });
    }
    try {
      await UserService.updateUser(user?._id, { avatar });
      res.status(200).json({ auth: true });
    } catch (err) {
      errorHandler(res, err);
    }
  }

  async getAllUsers(req, res) {
    try {
      let users = await UserService.allUsers();
      if (!users) {
        return res.status(400).json({ msg: "error" });
      }
      return res.status(200).json({ users, auth: true });
    } catch (err) {
      errorHandler(res, err);
    }
  }
}

module.exports = new AuthController();

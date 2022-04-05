import ApiError from "../exception/api_error.js";
import token_service from "../service/token_service.js";
export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.UnauthrizedError());
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) return next(ApiError.UnauthrizedError());
    const userData = token_service.validateAccessToken(accessToken);
    if (!userData) return next(ApiError.UnauthrizedError());
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthrizedError());
  }
}

import ApiError from "../exception/api_error.js";
export default function mid(err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "непредвиденная ошибка" });
}

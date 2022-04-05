class ApiError extends Error {
  status;
  errors;
  constructor(status, mesage, errors = []) {
    super(mesage);
    this.status = status;
    this.errors = errors;
  }

  static UnauthrizedError() {
    return new ApiError(401, "User is not auth in system");
  }
  static BadRequest(mesage, errors = []) {
    return new ApiError(400, mesage, errors);
  }
}
export default ApiError;

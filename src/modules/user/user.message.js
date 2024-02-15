const UserMessage = Object.freeze({
  Register: "user register successfully",
  Update: "user updated successfully",
  Delete: "user deleteded successfully",
  GetAll: "user fetched successfully",
  AlreadyExist: "user already exist",
  NotFound: "user not found",
  RegisterError: "user register failed",
  UpdateError: "user update failed",
  DeleteError: "user delete failed",
  Unauthorized: "Invalid username or password",
});

module.exports = { UserMessage };

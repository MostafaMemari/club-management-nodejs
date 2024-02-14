const PermissionMessage = Object.freeze({
  Create: "permission created successfully",
  Update: "permission updated successfully",
  Delete: "permission deleteded successfully",
  GetAll: "permission fetched successfully",
  AlreadyExist: "permission already exist",
  NotFound: "permission not found",
  UpdateError: "permission update failed",
  DeleteError: "permission delete failed",
});

module.exports = { PermissionMessage };

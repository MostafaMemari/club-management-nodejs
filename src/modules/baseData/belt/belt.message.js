const BeltMessage = Object.freeze({
  Create: "belt created successfully",
  Update: "belt updated successfully",
  Delete: "belt deleteded successfully",
  GetAll: "belts fetched successfully",
  AlreadyExist: "belt already exist",
  NotFound: "belt not found",
  UpdateError: "belt update failed",
  DeleteError: "belt delete failed",
});

module.exports = { BeltMessage };

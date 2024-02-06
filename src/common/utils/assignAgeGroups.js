const { ageGroupModel } = require("../../modules/base-data/age-group/ageGroupModel");

module.exports.assignAgeGroups = async (birthDayEN) => {
  const ageGroups = await ageGroupModel.find({ $and: [{ toDateEN: { $gt: birthDayEN } }, { fromDateEN: { $lt: birthDayEN } }] });
  if (ageGroups.length == 1) return [ageGroups[0]._id];
  if (ageGroups.length == 2) return [ageGroups[0]._id, ageGroups[1]._id];
};

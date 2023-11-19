const { ageGroupModel } = require("../models/club/ageGroupModel");
const path = require("path");
const fs = require("fs");

module.exports.deleteInvalidPropertyInObject = (data = {}, blackListFields = []) => {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
};

module.exports.copyObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

module.exports.normalizePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 10) return `0${phoneNumber}`;
  if (phoneNumber.length === 11) return `${phoneNumber}`;
  if (phoneNumber.length === 12) return `0${phoneNumber.substring(2)}`;
  if (phoneNumber.length === 13) return `0${phoneNumber.substring(3)}`;
  if (phoneNumber.length === 14) return `0${phoneNumber.substring(4)}`;
};

module.exports.normalizeCalendar = (dateShamsi) => {
  let [year, month, day] = dateShamsi.split("/");
  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;

  return `${year}/${month}/${day}`;
};

module.exports.deleteFileInPublic = (fileAddress) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

module.exports.assignAgeGroupsByBirthDay = async (birthDayEN) => {
  const ageGroups = await ageGroupModel.find({ $and: [{ toDateEN: { $gt: birthDayEN } }, { fromDateEN: { $lt: birthDayEN } }] });
  if (ageGroups.length == 1) return [ageGroups[0]._id];
  if (ageGroups.length == 2) return [ageGroups[0]._id, ageGroups[1]._id];
};

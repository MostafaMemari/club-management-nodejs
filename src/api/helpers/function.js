const path = require("path");
const fs = require("fs");

const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

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

module.exports.deleteFileInPublic = (fileAddress) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

module.exports.validateItemArrayModel = async (model, array) => {
  for (let i = 0; i < array.length; i++) {
    if (isValidObjectId(array[i])) {
      const beltFound = await model.findById(array[i]);
      if (!beltFound) {
        array.splice(i, 1);
        i--;
      }
    } else {
      array.splice(i, 1);
      i--;
    }
  }
  const set = new Set(array);
  const uniqueArray = Array.from(set);
  return uniqueArray;
};

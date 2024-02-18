const path = require("path");
const fs = require("fs");

const { isValidObjectId } = require("mongoose");

function toEnglish(persianNumber) {
  const pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let cache = persianNumber;
  for (let i = 0; i < 10; i++) {
    let reg_fa = new RegExp(pn[i], "g");
    cache = cache.replace(reg_fa, en[i]);
  }
  return cache;
}
function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(process.cwd(), "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}
function removeDuplicatesArray(arr) {
  const set = new Set(arr);
  return Array.from(set);
}
function convarteStringToArray(arr) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    return arr?.split(",");
  }
}

function filterAssignAgeGroupsByBirthDay(birthDay, ageGroups) {
  return ageGroups.filter((ageGroup) => ageGroup.toDate > birthDay && ageGroup.fromDate < birthDay);
}

async function validateItemArrayModel(model, array) {
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
}

module.exports = {
  removeDuplicatesArray,
  convarteStringToArray,
  toEnglish,
  deleteFileInPublic,
  validateItemArrayModel,
  filterAssignAgeGroupsByBirthDay,
};

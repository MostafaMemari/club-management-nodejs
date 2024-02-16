const path = require("path");
const fs = require("fs");

const { isValidObjectId } = require("mongoose");
const { shamsiToMiladi } = require("./dateConvarter");

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

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(process.cwd(), "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
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

function getNextBeltDate(date, duration) {
  let [year, month, day] = date.split("/");
  for (let i = 1; i <= duration; i++) {
    if (month >= 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
  }

  return `${year}/${month}/${day}`
    .split("/")
    .map((date) => (date.length == 1 ? `0${date}` : date))
    .join("/");
}

function dateDiffDayNowShamsi(beltDate) {
  const date1 = new Date(shamsiToMiladi(beltDate)).getTime();
  const date2 = new Date().getTime();

  // اختلاف روز بین دو تاریخ
  const difference = Math.floor((date1 - date2) / 86400000);
  return difference;
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

module.exports = {
  getNextBeltDate,
  removeDuplicatesArray,
  convarteStringToArray,
  toEnglish,
  copyObject,
  deleteFileInPublic,
  validateItemArrayModel,
  dateDiffDayNowShamsi,
};

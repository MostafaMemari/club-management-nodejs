const path = require("path");
const fs = require("fs");

const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { normalizeCalendar, normalizeDataDates } = require("./normalizeData");
const { shamsiToMiladi } = require("./dateConvarter");
const { beltExamModel } = require("../models/BaseData/beltExamModel");
const { beltModel } = require("../models/BaseData/beltModel");

module.exports.deleteInvalidPropertyInObject = (data = {}, blackListFields = []) => {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
    // if (data[key]) data[key] = this.toEnglish(data[key]);
  });
};

module.exports.toEnglish = (persianNumber) => {
  const pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let cache = persianNumber;
  for (let i = 0; i < 10; i++) {
    let reg_fa = new RegExp(pn[i], "g");
    cache = cache.replace(reg_fa, en[i]);
  }
  return cache;
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

module.exports.nextBeltDate = (date, duration) => {
  let [year, month, day] = date.split("/");
  for (let i = 1; i <= duration; i++) {
    if (month >= 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
  }
  return normalizeCalendar(`${year}/${month}/${day}`);
};

module.exports.dateDiffDayNowShamsi = (beltDate) => {
  const date1 = new Date(shamsiToMiladi(beltDate)).getTime();
  const date2 = new Date().getTime();

  // اختلاف روز بین دو تاریخ
  const difference = Math.floor((date1 - date2) / 86400000);
  return difference;
};

module.exports.dateBeltExamNext = async (belt, beltDate) => {
  const nextBeltDate = new Date(shamsiToMiladi(beltDate));

  if (belt.name === "سفید") {
    const nextBelt = await beltModel.findOne({ name: "زرد" });
    return await beltExamModel.find({ beltID: nextBelt._id });
  }
  if (belt.name === "زرد") {
    const nextBelt = await beltModel.findOne({ name: "سبز" });
    return await beltExamModel.find({ beltID: nextBelt._id });
  }
  if (belt.name === "سبز") {
    const nextBelt = await beltModel.findOne({ name: "آبی" });
    return await beltExamModel.find({ beltID: nextBelt._id, eventDateEN: { $gte: nextBeltDate } }).lean();
  }
  if (belt.name === "آبی") {
    const nextBelt = await beltModel.findOne({ name: "قرمز" });
    return await beltExamModel.find({ beltID: nextBelt._id, eventDateEN: { $gte: nextBeltDate } }).lean();
  }
  if (belt.name === "قرمز") {
    const nextBelt = await beltModel.findOne({ $or: [{ name: "پوم 1" }, { name: "مشکی دان 1" }] });
    return await beltExamModel.find({ beltID: nextBelt._id });
  }
  if (belt.name === "پوم 1" || belt.name === "مشکی دان 1") {
    const nextBelt = await beltModel.find({ $or: [{ name: "پوم 2" }, { name: "مشکی دان 2" }] });
    return await beltExamModel.find({ $or: [{ beltID: nextBelt[0]._id }, { beltID: nextBelt[1]._id }] });
  }
  if (belt.name === "پوم 2" || belt.name === "مشکی دان 2") {
    const nextBelt = await beltModel.find({ $or: [{ name: "پوم 3" }, { name: "مشکی دان 3" }] });
    return await beltExamModel.find({ $or: [{ beltID: nextBelt[0]._id }, { beltID: nextBelt[1]._id }] });
  }
  if (belt.name === "پوم 3" || belt.name === "مشکی دان 3") {
    const nextBelt = await beltModel.find({ $or: [{ name: "پوم 4" }, { name: "مشکی دان 4" }] });
    return await beltExamModel.find({ $or: [{ beltID: nextBelt[0]._id }, { beltID: nextBelt[1]._id }] });
  }
  if (belt.name === "پوم 4" || belt.name === "مشکی دان 4") {
    const nextBelt = await beltModel.findOne({ name: "مشکی دان 5" });
    return await beltExamModel.find({ beltID: nextBelt._id });
  }
  if (belt.name === "مشکی دان 5") {
    const nextBelt = await beltModel.findOne({ name: "مشکی دان 6" });
    return await beltExamModel.find({ beltID: nextBelt._id });
  }
};

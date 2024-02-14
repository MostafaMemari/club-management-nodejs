const createHttpError = require("http-errors");

function normalizePhoneNumber(phoneNumber) {
  if (phoneNumber) {
    if (phoneNumber.length === 10) return `0${phoneNumber}`;
    if (phoneNumber.length === 11) return `${phoneNumber}`;
    // if (phoneNumber.length === 12) return `0${phoneNumber.substring(2)}`;
    if (phoneNumber.length === 13) return `0${phoneNumber.substring(3)}`;
    // if (phoneNumber.length === 14) return `0${phoneNumber.substring(4)}`;
  }
}
function normalizenationalID(nationalID) {
  if (nationalID) {
    if (nationalID.length === 4) return `000000${nationalID}`;
    if (nationalID.length === 5) return `00000${nationalID}`;
    if (nationalID.length === 6) return `0000${nationalID}`;
    if (nationalID.length === 7) return `000${nationalID}`;
    if (nationalID.length === 8) return `00${nationalID}`;
    if (nationalID.length === 9) return `0${nationalID}`;
    if (nationalID.length === 10) return `${nationalID}`;
  }
}

function normalizeCalendar(dateShamsi) {
  if (dateShamsi) {
    return dateShamsi
      .split("/")
      .map((date) => (date.length == 1 ? `0${date}` : date))
      .join("/");
  }
  throw createHttpError.BadRequest("date is not valid");

  // let [year, month, day] = dateShamsi.split("/");
  // if (year && month && day) {
  //   month = month.length === 1 ? `0${month}` : month;
  //   day = day.length === 1 ? `0${day}` : day;

  //   return `${year}/${month}/${day}`;
  // }
}

module.exports = { normalizeCalendar, normalizePhoneNumber, normalizenationalID };

module.exports.normalizePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 10) return `0${phoneNumber}`;
  if (phoneNumber.length === 11) return `${phoneNumber}`;
  // if (phoneNumber.length === 12) return `0${phoneNumber.substring(2)}`;
  if (phoneNumber.length === 13) return `0${phoneNumber.substring(3)}`;
  // if (phoneNumber.length === 14) return `0${phoneNumber.substring(4)}`;
};
module.exports.normalizenationalID = (nationalID) => {
  if (nationalID.length === 4) return `000000${nationalID}`;
  if (nationalID.length === 5) return `00000${nationalID}`;
  if (nationalID.length === 6) return `0000${nationalID}`;
  if (nationalID.length === 7) return `000${nationalID}`;
  if (nationalID.length === 8) return `00${nationalID}`;
  if (nationalID.length === 9) return `0${nationalID}`;
  if (nationalID.length === 10) return `${nationalID}`;
};

module.exports.normalizeCalendar = (dateShamsi) => {
  let [year, month, day] = dateShamsi.split("/");
  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;

  return `${year}/${month}/${day}`;
};

module.exports.normalizeDataDates = async (data, birthDay, registerDate, sportsInsurance, beltDate) => {
  birthDay ? (data.birthDayIR = this.normalizeCalendar(birthDay)) : false;
  registerDate ? (data.registerDateIR = this.normalizeCalendar(registerDate)) : false;
  sportsInsurance ? (data.sportsInsuranceIR = this.normalizeCalendar(sportsInsurance)) : false;
  beltDate ? (data.beltDateIR = this.normalizeCalendar(beltDate)) : false;
};

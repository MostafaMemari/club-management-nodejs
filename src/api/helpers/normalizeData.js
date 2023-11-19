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

module.exports.normalizeDataDates = async (data, birthDay, registerDate, sportsInsurance) => {
  birthDay ? (data.birthDayIR = this.normalizeCalendar(birthDay)) : false;
  registerDate ? (data.registerDateIR = this.normalizeCalendar(registerDate)) : false;
  sportsInsurance ? (data.sportsInsuranceIR = this.normalizeCalendar(sportsInsurance)) : false;
};

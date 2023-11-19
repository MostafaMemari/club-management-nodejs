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

module.exports.normalize_birthDayIR_registerDateIR_mobile = async (data, birthDayIR, registerDateIR, mobile) => {
  birthDayIR ? (data.birthDayIR = this.normalizeCalendar(birthDayIR)) : false;
  registerDateIR ? (data.registerDateIR = this.normalizeCalendar(registerDateIR)) : false;
  mobile ? (data.mobile = this.normalizePhoneNumber(mobile)) : false;
};

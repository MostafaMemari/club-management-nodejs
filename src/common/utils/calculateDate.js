const jalaliMoment = require("jalali-moment");
const { normalizeCalendar } = require("./normalizeData");

// 1 * 1000 = 1000                            1 second
// 1 * 60000 = 60000                          1 minute
// 1 * 60 * 60000 = 360000                    1 hour
// 1 * 24 * 60 * 60000 = 86400000             1 day
// 1 * 7 * 24 * 60 * 60000 = 604800000        1 week

// 30 * 24 * 60 * 60000 = 2592000000          1 month

function shamsiToMiladi(dateShamsi) {
  return jalaliMoment.from(dateShamsi, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
}

function getYearNowShamsi() {
  return jalaliMoment().locale("fa").format("YYYY");
}

function nextDateByDurationMonth(date, duration) {
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
}

function previousDateDurationMonth(date, duration) {
  let [year, month, day] = date.split("/");
  for (let i = 1; i <= duration; i++) {
    if (month <= 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
  }
  return normalizeCalendar(`${year}/${month}/${day}`);
}
function nextDateDurationYear(date, duration) {
  let [year, month, day] = date.split("/");

  year += duration;

  return `${year}/${month}/${day}`;
}
function nextBeltByBirthDay(birthDay, nextBelt) {
  const ageYear = yearDiffNowDateShamsi(birthDay);
  const beltValidate = ["پوم 1", "پوم 2", "پوم 3", "پوم 4"];

  const result = nextBelt.filter((belt) => {
    if (beltValidate.includes(belt.name)) {
      if (belt?.upperYear <= ageYear) {
        return belt;
      }
      if (belt?.underYear > ageYear) {
        return belt;
      }
    } else {
      return belt;
    }
  });

  return result[0];
}
function calculateYearMonthDayStatusByDateShamsi(dateShamsi) {
  const dateDiff = dayDiffNowDateShamsi(dateShamsi);
  const day = Math.abs(dayDiffNowDateShamsi(dateShamsi));

  const years = Math.floor(day / 365.25);
  const months = Math.floor((day % 365.25) / 30.44);
  const days = Math.floor((day % 365.25) % 30.44);

  return { years, months, days, status: dateDiff < 0 ? "گذشته" : "مانده", day };
}

function yearDiffNowDateShamsi(dateShamsi) {
  const dateNow = new Date().getTime();
  const date = new Date(shamsiToMiladi(dateShamsi)).getTime();

  const difference = Math.floor((dateNow - date) / 86400000) / 365;
  return difference;
}

function percentDateShamsiByDurationMonth(nextBeltDate, duration) {
  const dateNow = new Date().getTime();
  const date = new Date(shamsiToMiladi(nextBeltDate)).getTime();

  const dateDiffNowNextBeltDate = Math.floor((date - dateNow) / 86400000);

  if (dateDiffNowNextBeltDate < duration) {
    let percent = calculatePercentageDifference(duration, dateDiffNowNextBeltDate);
    return percent == 100 ? 99 : percent;
  } else {
    return 100;
  }
}

function percentLastYearDateShamsiByDateNow(dateShamsi) {
  const dateDiff = dayDiffNowDateShamsi(dateShamsi);
  const lastYearSportsInsuranceDate = previousDateDurationMonth(dateShamsi, 12);
  const dateDiffLastYearSportsInsuranceDate = Math.abs(dayDiffNowDateShamsi(lastYearSportsInsuranceDate));

  return dateDiff > 0 ? calculatePercentageDifference(dateDiffLastYearSportsInsuranceDate, dateDiff) : 100;
}
function calculatePercentageDifference(a, b) {
  const absoluteDifference = Math.abs(a - b);
  const percentageDifference = (absoluteDifference / Math.max(a, b)) * 100;
  return Math.round(percentageDifference);
}

function dayDiffNowDateShamsi(dateShamsi) {
  const dateNow = new Date().getTime();
  const date = new Date(shamsiToMiladi(dateShamsi)).getTime();

  const difference = Math.ceil((date - dateNow) / 86400000);

  return difference;
}

function calculateMemberShipValidity(memberShipValidity) {
  const yearNowShamsi = getYearNowShamsi();

  if (yearNowShamsi > memberShipValidity) {
    return {
      date: memberShipValidity,
      years: yearNowShamsi - memberShipValidity + 1,
      status: "گذشته",
    };
  } else {
    return {
      date: memberShipValidity,
      status: "مانده",
    };
  }
}

module.exports = {
  shamsiToMiladi,
  nextDateByDurationMonth,
  nextDateDurationYear,
  nextBeltByBirthDay,
  calculateYearMonthDayStatusByDateShamsi,
  yearDiffNowDateShamsi,
  dayDiffNowDateShamsi,
  percentDateShamsiByDurationMonth,
  percentLastYearDateShamsiByDateNow,
  calculateMemberShipValidity,
};

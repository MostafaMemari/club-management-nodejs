const jalaliMoment = require("jalali-moment");

// 1 * 1000 = 1000                            1 second
// 1 * 60000 = 60000                          1 minute
// 1 * 60 * 60000 = 360000                    1 hour
// 1 * 24 * 60 * 60000 = 86400000             1 day
// 1 * 7 * 24 * 60 * 60000 = 604800000        1 week

// 30 * 24 * 60 * 60000 = 2592000000          1 month

function shamsiToMiladi(dateShamsi) {
  return jalaliMoment.from(dateShamsi, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
}
function nextDateDurationMonth(date, duration) {
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
function nextDateDurationYear(date, duration) {
  let [year, month, day] = date.split("/");

  year += duration;

  return `${year}/${month}/${day}`;
}
function nextBeltByBirthDay(birthDay, nextBelt) {
  const ageYear = yearDiffNowDateShamsi(birthDay);
  const beltValidate = ["قرمز", "پوم 1", "پوم 2", "پوم 3", "پوم 4"];

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
function calculateNextBeltByBeltDate(nextBeltDate) {
  const dateDiff = dayDiffNowDateShamsi(nextBeltDate);
  const day = Math.abs(dayDiffNowDateShamsi(nextBeltDate));

  const years = Math.floor(day / 365.25);
  const months = Math.floor((day % 365.25) / 30.44);
  const days = Math.floor((day % 365.25) % 30.44);

  return { years, months, days, status: dateDiff < 0 ? "گذشته" : "مانده" };
}

function yearDiffNowDateShamsi(dateShamsi) {
  const dateNow = new Date().getTime();
  const date = new Date(shamsiToMiladi(dateShamsi)).getTime();

  const difference = Math.floor((dateNow - date) / 86400000) / 365;
  return difference;
}
function dayDiffNowDateShamsi(dateShamsi) {
  const dateNow = new Date().getTime();
  const date = new Date(shamsiToMiladi(dateShamsi)).getTime();

  const difference = Math.floor((date - dateNow) / 86400000);
  return difference;
}

module.exports = {
  shamsiToMiladi,
  nextDateDurationMonth,
  nextDateDurationYear,
  nextBeltByBirthDay,
  calculateNextBeltByBeltDate,
  yearDiffNowDateShamsi,
  dayDiffNowDateShamsi,
};

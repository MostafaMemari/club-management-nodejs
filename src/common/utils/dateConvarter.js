const moment = require("jalali-moment");

exports.shamsiToMiladi = (dateShamsi) => {
  return moment.from(dateShamsi, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
};

// 1 * 1000 = 1000                            1 second
// 1 * 60000 = 60000                          1 minute
// 1 * 60 * 60000 = 360000                    1 hour
// 1 * 24 * 60 * 60000 = 86400000             1 day
// 1 * 7 * 24 * 60 * 60000 = 604800000        1 week

// 30 * 24 * 60 * 60000 = 2592000000          1 month

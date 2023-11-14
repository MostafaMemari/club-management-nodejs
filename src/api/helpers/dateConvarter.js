// var time = new Date().getTime() + 7889400000; // get your number
// var date = new Date(time); // create Date object

// console.log(new Intl.DateTimeFormat("fa-IR").format(date));

// console.log(new Intl.DateTimeFormat("fa-IR", { dateStyle: "full", timeStyle: "long" }).format(date));

var jalaali = require("jalaali-js");

console.log(jalaali.jalaaliMonthLength(1400, 12));
console.log(jalaali.jalaaliMonthLength(1401, 12));
console.log(jalaali.jalaaliMonthLength(1402, 12));
console.log(jalaali.jalaaliMonthLength(1403, 12));

var time = new Date().getTime() + 2592000000; // get your number
var date = new Date(time); // create Date object

console.log(new Intl.DateTimeFormat("fa-IR").format(date));

console.log(new Intl.DateTimeFormat("fa-IR", { dateStyle: "full", timeStyle: "long" }).format(date));

// 1 * 1000 = 1000                            1 second
// 1 * 60000 = 60000                          1 minute
// 1 * 60 * 60000 = 360000                    1 hour
// 1 * 24 * 60 * 60000 = 86400000             1 day
// 1 * 7 * 24 * 60 * 60000 = 604800000        1 week

// 30 * 24 * 60 * 60000 = 2592000000          1 month

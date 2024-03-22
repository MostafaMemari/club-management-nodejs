/**
 * Form Picker
 */

"use strict";

/* important for jalali bootstrap date */
window.Date = window.JDate;

$.fn.datepicker.dates["fa"] = {
  days: ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
  daysShort: ["یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه"],
  daysMin: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
  months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
  monthsShort: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
  today: "امروز",
  clear: "پاک کردن",
  titleFormat: "MM yyyy" /* Leverages same syntax as 'format' */,
  weekStart: 6,
};

// * Pickers with jQuery dependency (jquery)
$(function () {
  // Bootstrap Datepicker
  // --------------------------------------------------------------------

  var bsDatepickerBirthDay = $("#bs-datepicker-birthday"),
    bsDatepickerRegisterDate = $("#bs-datepicker-register-date"),
    bsDatepickerBeltDate = $("#bs-datepicker-belt-date"),
    bsDatepickerSportsInsuranceDate = $("#bs-datepicker-sportsInsurance-date");

  // birthDay
  if (bsDatepickerBirthDay.length) {
    bsDatepickerBirthDay.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
      autoclose: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }
  // RegisterDate
  if (bsDatepickerRegisterDate.length) {
    bsDatepickerRegisterDate.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
      autoclose: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }
  // BeltDate
  if (bsDatepickerBeltDate.length) {
    bsDatepickerBeltDate.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
      autoclose: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }
  // BeltDate
  if (bsDatepickerSportsInsuranceDate.length) {
    bsDatepickerSportsInsuranceDate.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
      autoclose: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }
});

document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    document.getElementById("radio-man").checked = true;
    const formValidationNewStudent = document.getElementById("formValidationNewStudent"),
      clubEle = jQuery(formValidationNewStudent.querySelector('[name="clubs"]')),
      beltEle = jQuery(formValidationNewStudent.querySelector('[name="belt"]'));

    const fv = FormValidation.formValidation(formValidationNewStudent, {
      fields: {
        firstName: {
          validators: {
            notEmpty: {
              message: "لطفا نام خود را وارد کنید.",
            },
            stringLength: {
              min: 2,
              max: 50,
              message: "نام وارد شده معتبر نمی باشد.",
            },
          },
        },
        lastName: {
          validators: {
            notEmpty: {
              message: "لطفا نام خانوادگی خود را وارد کنید.",
            },
            stringLength: {
              min: 2,
              max: 50,
              message: "نام خانوادگی وارد شده معتبر نمی باشد.",
            },
          },
        },
        nationalCode: {
          validators: {
            regexp: {
              regexp: /^([0-9]){10}$/,
              message: "کدملی وارد شده معتبر نمی باشد.",
            },
          },
        },
        birthDay: {
          validators: {
            date: {
              format: "YYYY/MM/DD",
              message: "تاریخ تولد وارد شده معتبر نمی باشد",
            },
          },
        },
        fatherName: {
          validators: {
            stringLength: {
              min: 2,
              max: 50,
              message: "نام پدر معتبر نمی باشد.",
            },
          },
        },
        mobile: {
          validators: {
            regexp: {
              regexp: /^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/,
              message: "شماره تلفن وارد شده معتبر نمی باشد.",
            },
          },
        },
        coachProfile: {
          validators: {
            regexp: {
              regexp: /\.(jpe?g)$/i,
              message: "تصویر وارد شده معتبر نمی باشد.",
            },
            file: {
              maxSize: 2097152,
              message: "تصویر وارد شده باید کمتر از 2 مگابایت باشد.",
            },
          },
        },
        clubs: {
          validators: {
            notEmpty: {
              message: "لطفا باشگاه را انتخاب کنید.",
            },
          },
        },
        memberShipValidity: {
          validators: {
            between: {
              min: 1370,
              max: 1410,
              message: "شارژ بانک اطلاعاتی معتبر نمی باشد.",
            },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: "",
          rowSelector: function (field, ele) {
            // field is the field name & ele is the field element
            switch (field) {
              case "club":
                return ".col-12";

              case "memberShipValidity":
                return ".col-12";

              default:
                return ".row";
            }
          },
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
    });

    // Select2 (clubs)
    if (clubEle.length) {
      clubEle.wrap('<div class="position-relative"></div>');
      clubEle
        .select2({
          placeholder: "",
          dropdownParent: clubEle.parent(),
        })
        .on("change.select2", function () {
          // Revalidate the color field when an option is chosen
          fv.revalidateField("clubs");
        });
    }

    // Select2 (belt)
    if (beltEle.length) {
      beltEle.wrap('<div class="position-relative"></div>');
      beltEle
        .select2({
          placeholder: "",
          dropdownParent: beltEle.parent(),
        })
        .on("change.select2", function () {
          // Revalidate the color field when an option is chosen
          fv.revalidateField("belt");
        });
    }
  })();
});

(function () {
  const bsDatepickerBirthday = document.querySelector("#bs-datepicker-birthday"),
    bsDatepickerRegisterDate = document.querySelector("#bs-datepicker-register-date"),
    bsDatepickerBeltDate = document.querySelector("#bs-datepicker-belt-date"),
    bsDatepickerSportsInsuranceDate = document.querySelector("#bs-datepicker-sportsInsurance-date"),
    mobile = document.querySelector("#mobile");
  if (bsDatepickerBirthday) {
    new Cleave(bsDatepickerBirthday, {
      date: true,
      delimiter: "/",
      datePattern: ["Y", "m", "d"],
    });
  }
  if (bsDatepickerRegisterDate) {
    new Cleave(bsDatepickerRegisterDate, {
      date: true,
      delimiter: "/",
      datePattern: ["Y", "m", "d"],
    });
  }
  if (bsDatepickerBeltDate) {
    new Cleave(bsDatepickerBeltDate, {
      date: true,
      delimiter: "/",
      datePattern: ["Y", "m", "d"],
    });
  }
  if (bsDatepickerSportsInsuranceDate) {
    new Cleave(bsDatepickerSportsInsuranceDate, {
      date: true,
      delimiter: "/",
      datePattern: ["Y", "m", "d"],
    });
  }

  // Phone Number
  // if (mobile) {
  //   new Cleave(mobile, {
  //     prefix: "+98",
  //     blocks: [13],
  //     uppercase: true,
  //   });
  // }
})();

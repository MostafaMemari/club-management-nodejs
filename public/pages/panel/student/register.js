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
    // document.getElementById("radio-man").checked = true;
    const formValidationNewStudent = document.getElementById("formValidationNewStudent"),
      clubEle = jQuery(formValidationNewStudent.querySelector('[name="club"]')),
      coachEle = jQuery(formValidationNewStudent.querySelector('[name="coach"]')),
      beltEle = jQuery(formValidationNewStudent.querySelector('[name="belt"]'));

    const fv = FormValidation.formValidation(formValidationNewStudent, {
      fields: {
        firstName: {
          validators: {
            notEmpty: {
              message: "فیلد نام الزامی است",
            },
            stringLength: {
              min: 2,
              max: 50,
              message: "نام وارد شده معتبر نمی باشد",
            },
          },
        },
        lastName: {
          validators: {
            notEmpty: {
              message: "فیلد نام خانوادگی الزامی است",
            },
            stringLength: {
              min: 2,
              max: 50,
              message: "نام خانوادگی وارد شده معتبر نمی باشد",
            },
          },
        },
        nationalCode: {
          validators: {
            regexp: {
              regexp: /^([0-9]){10}$/,
              message: "کدملی وارد شده معتبر نمی باشد",
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
              message: "نام پدر معتبر نمی باشد",
            },
          },
        },
        mobile: {
          validators: {
            regexp: {
              regexp: /^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/,
              message: "شماره تلفن وارد شده معتبر نمی باشد",
            },
          },
        },
        phone: {
          validators: {
            stringLength: {
              min: 9,
              max: 12,
              message: "تلفن داخلی وارد شده صحیح نمی باشد",
            },
          },
        },
        studentProfile: {
          validators: {
            regexp: {
              regexp: /\.(jpe?g|png)$/i,
              message: "تصویر وارد شده معتبر نمی باشد",
            },
            file: {
              maxSize: 2097152,
              message: "تصویر وارد شده باید کمتر از 2 مگابایت باشد",
            },
          },
        },
        registerDate: {
          validators: {
            date: {
              format: "YYYY/MM/DD",
              message: "تاریخ ثبت نام معتبر نمی باشد",
            },
          },
        },
        club: {
          validators: {
            notEmpty: {
              message: "فیلد باشگاه الزامی است",
            },
          },
        },
        coach: {
          validators: {
            notEmpty: {
              message: "فیلد مربی الزامی است",
            },
          },
        },
        belt: {
          validators: {
            notEmpty: {
              message: "فیلد کمربند الزامی است",
            },
          },
        },
        beltDate: {
          validators: {
            notEmpty: {
              message: "فیلد تاریخ کمربند الزامی است",
            },
            date: {
              format: "YYYY/MM/DD",
              message: "تاریخ کمربند وارد شده معتبر نمی باشد",
            },
          },
        },
        memberShipValidity: {
          validators: {
            between: {
              min: 1370,
              max: 1410,
              message: "شارژ بانک اطلاعاتی معتبر نمی باشد",
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
              case "coach":
                return ".col-12";
              case "beltDate":
                return ".col-12";
              case "belt":
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

    // Select2 (club)
    if (clubEle.length) {
      clubEle.wrap('<div class="position-relative"></div>');
      clubEle
        .select2({
          placeholder: "",
          dropdownParent: clubEle.parent(),
        })
        .on("change.select2", function () {
          // Revalidate the color field when an option is chosen
          fv.revalidateField("club");
        });
    }
    // Select2 (coach)
    if (coachEle.length) {
      coachEle.wrap('<div class="position-relative"></div>');
      coachEle
        .select2({
          placeholder: "",
          dropdownParent: coachEle.parent(),
        })
        .on("change.select2", function () {
          // Revalidate the color field when an option is chosen
          fv.revalidateField("coach");
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

function selectBoxClub(event, coachsEncode) {
  const selectBoxCoach = document.querySelector("#coach");

  const coachs = JSON.parse(decodeURIComponent(coachsEncode));
  const clubID = event.target.value;

  // let coachSelect = [];
  // for (const coach of coachs) {
  //   coach.clubs.forEach((club) => {
  //     if (club._id === clubID) {
  //       coachSelect.push(coach);
  //     }
  //   });
  // }

  let coachSelect = coachs.filter((coach) => coach.clubs.some((club) => club._id === clubID));

  const optionCoachs = Object.entries(coachSelect).map((key) => `<option value='${key[1]?._id}'>${key[1]?.firstName} ${key[1]?.lastName}</option>`);

  addOptionToSelectBox(selectBoxCoach, optionCoachs, clubID);
}

function addOptionToSelectBox(selectBox, option, clubID) {
  const selectBoxCoachs = document.querySelector("#select-box-coachs");
  const errorCoach = document.querySelector("#error-empty-coach");
  selectBox.innerHTML = "";

  if (option.length > 0) {
    selectBoxCoachs.classList.remove("d-none");
    errorCoach.classList.add("d-none");
    selectBox.insertAdjacentHTML(
      "beforeend",
      `
      <option value="">انتخاب باشگاه</option>
      ${option.join("")}
      `
    );
  } else if (!clubID) {
    errorCoach.classList.add("d-none");
    selectBoxCoachs.classList.add("d-none");
  } else {
    selectBoxCoachs.classList.add("d-none");
    errorCoach.classList.remove("d-none");
  }
}
document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    // Update/reset user image of account page
    let accountUserImage = document.getElementById("uploadedAvatar");
    const fileInput = document.querySelector(".account-file-input"),
      resetFileInput = document.querySelector(".account-image-reset");

    if (accountUserImage) {
      const resetImage = accountUserImage.src;
      fileInput.onchange = () => {
        if (fileInput.files[0]) {
          accountUserImage.src = window.URL.createObjectURL(fileInput.files[0]);
        }
      };
      resetFileInput.onclick = () => {
        const studentProfile = document.querySelector('[data-field="studentProfile"]');

        if (studentProfile) {
          studentProfile.innerHTML = "";
        }

        fileInput.value = "";

        accountUserImage.src = resetImage;
      };
    }
  })();
});

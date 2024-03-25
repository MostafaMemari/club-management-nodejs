const formUpdateStudent = document.getElementById("form-update-student");
const studentID = document.getElementById("student-id").innerHTML;

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
    const clubEle = jQuery(formUpdateStudent.querySelector('[name="club"]')),
      coachEle = jQuery(formUpdateStudent.querySelector('[name="coach"]')),
      beltEle = jQuery(formUpdateStudent.querySelector('[name="belt"]'));

    const fv = FormValidation.formValidation(formUpdateStudent, {
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
        phone: {
          validators: {
            stringLength: {
              min: 9,
              max: 12,
              message: "تلفن داخلی وارد شده صحیح نمی باشد.",
            },
          },
        },
        studentProfile: {
          validators: {
            regexp: {
              regexp: /\.(jpe?g|png)$/i,
              message: "تصویر وارد شده معتبر نمی باشد.",
            },
            file: {
              maxSize: 2 * 1000 * 512,
              message: "تصویر وارد شده باید کمتر از 512 کیلوبایت باشد",
            },
          },
        },

        club: {
          validators: {
            notEmpty: {
              message: "لطفا نام باشگاه را انتخاب کنید.",
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
        beltDate: {
          validators: {
            regexp: {
              regexp: /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/,
              message: "تاریخ کمربند معتبر نمی باشد",
            },
          },
        },
        registerDate: {
          validators: {
            regexp: {
              regexp: /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/,
              message: "تاریخ ثبت نام معتبر نمی باشد",
            },
          },
        },
        birthDay: {
          validators: {
            regexp: {
              regexp: /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/,
              message: "تاریخ تولد معتبر نمی باشد",
            },
          },
        },
        sportsInsuranceDate: {
          validators: {
            regexp: {
              regexp: /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/,
              message: "تاریخ بیمه ورزشی معتبر نمی باشد",
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
        // submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
    });

    const formDataOrginalValue = new FormData(formUpdateStudent);
    const originalValues = new Map();
    // ذخیره مقادیر اولیه
    for (const pair of formDataOrginalValue.entries()) {
      originalValues.set(pair[0], pair[1]);
    }

    formUpdateStudent.addEventListener("submit", function (e) {
      e.preventDefault();
      fv.validate().then(function (status) {
        if (status === "Valid") {
          const formData = new FormData(formUpdateStudent);
          const changedValues = {};

          // بررسی تغییر مقادیر
          for (const pair of formData.entries()) {
            if (originalValues.get(pair[0]) !== pair[1]) {
              changedValues[pair[0]] = pair[1];
            }
          }

          // **ایجاد FormData جدید فقط با مقادیر تغییر یافته**
          const changedFormData = new FormData();
          for (const key in changedValues) {
            changedFormData.append(key, changedValues[key]);
          }
          console.log(changedFormData);

          // ارسال مقادیر تغییر یافته به بک اند
          fetch(`${apiUrl}/students/${studentID}/update-profile`, {
            method: "PUT",
            body: changedFormData,
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
        }
      });
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

// for (const input of formUpdateStudent.querySelectorAll("input, select, textarea")) {
//   if (input.type === "radio") {
//     if (input.checked) {
//       input.dataset.originalValue = input.value;
//     }
//   } else {
//     input.dataset.originalValue = input.value;
//   }
// }

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

  let coachSelect = coachs.filter((coach) => coach.clubs.some((club) => club._id === clubID));
  // console.log(coachSelect);

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

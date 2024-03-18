document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    const formValidationNewClub = document.getElementById("formValidationNewClub"),
      gendersSelect = jQuery(formValidationNewClub.querySelector('[name="genders"]')),
      sportsSelect = jQuery(formValidationNewClub.querySelector('[name="sports"]'));

    const fv = FormValidation.formValidation(formValidationNewClub, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: "لطفا نام باشگاه را وارد کنید.",
            },
            stringLength: {
              min: 2,
              max: 50,
              message: "نام وارد شده معتبر نمی باشد.",
            },
          },
        },
        genders: {
          validators: {
            notEmpty: {
              message: "لطفا جنسیت را انتخاب کنید.",
            },
          },
        },
        sports: {
          validators: {
            notEmpty: {
              message: "لطفا رشته ورزشی را انتخاب کنید.",
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

    // Select2 (genders)
    if (gendersSelect.length) {
      gendersSelect.wrap('<div class="position-relative"></div>');
      gendersSelect
        .select2({
          placeholder: "",
          dropdownParent: gendersSelect.parent(),
        })
        .on("change.select2", function () {
          // ارور بعد انتخاب حذف میشه
          // Revalidate the color field when an option is chosen
          fv.revalidateField("genders");
        });
    }
    // Select2 (sports)
    if (sportsSelect.length) {
      sportsSelect.wrap('<div class="position-relative"></div>');
      sportsSelect
        .select2({
          placeholder: "",
          dropdownParent: sportsSelect.parent(),
        })
        .on("change.select2", function () {
          // ارور بعد انتخاب حذف میشه
          // Revalidate the color field when an option is chosen
          fv.revalidateField("sports");
        });
    }
  })();
});

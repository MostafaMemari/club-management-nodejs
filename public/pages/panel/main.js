$(function () {
  // Select2 genders
  var select2 = $('[name="genders"]');
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: "جنسیت باشگاه را وارد کنید.",
        dropdownParent: $this.parent(),
      });
    });
  }
  // Select2 sports
  var select2 = $('[name="sports"]');
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: "رده سنی را انتخاب کنید.",
        dropdownParent: $this.parent(),
      });
    });
  }
});

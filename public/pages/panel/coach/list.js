$(function () {
  // Select2 belt
  var select2 = $('[name="belts"]');
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: "کمربند را انتخاب کنید.",
        dropdownParent: $this.parent(),
      });
    });
  }
  // Select2 belt
  var select2 = $('[name="ages"]');
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

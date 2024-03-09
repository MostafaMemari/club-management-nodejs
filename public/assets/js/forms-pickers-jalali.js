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

  var bsDatepickerBasic = $("#bs-datepicker-basic"),
    bsDatepickerFormat = $("#bs-datepicker-format"),
    bsDatepickerRange = $("#bs-datepicker-daterange"),
    bsDatepickerDisabledDays = $("#bs-datepicker-disabled-days"),
    bsDatepickerMultidate = $("#bs-datepicker-multidate"),
    bsDatepickerOptions = $("#bs-datepicker-options"),
    bsDatepickerAutoclose = $("#bs-datepicker-autoclose"),
    bsDatepickerInlinedate = $("#bs-datepicker-inline"),
    bsDatepickerBirthDay = $("#bs-datepicker-birthday"),
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

  // Auto close
  if (bsDatepickerAutoclose.length) {
    bsDatepickerAutoclose.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
      autoclose: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Basic
  if (bsDatepickerBasic.length) {
    bsDatepickerBasic.datepicker({
      language: "fa",
      format: "yyyy/mm/dd",
      todayHighlight: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Format
  if (bsDatepickerFormat.length) {
    bsDatepickerFormat.datepicker({
      language: "fa",
      todayHighlight: true,
      format: "yyyy/mm/dd",
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Range
  if (bsDatepickerRange.length) {
    bsDatepickerRange.datepicker({
      language: "fa",
      format: "yyyy/mm/dd",
      todayHighlight: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Disabled Days
  if (bsDatepickerDisabledDays.length) {
    bsDatepickerDisabledDays.datepicker({
      language: "fa",
      format: "yyyy/mm/dd",
      todayHighlight: true,
      daysOfWeekDisabled: [0, 6],
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Multiple
  if (bsDatepickerMultidate.length) {
    bsDatepickerMultidate.datepicker({
      language: "fa",
      format: "yyyy/mm/dd",
      multidate: true,
      todayHighlight: true,
      orientation: isRtl ? "auto right" : "auto left",
    });
  }

  // Options
  if (bsDatepickerOptions.length) {
    bsDatepickerOptions.datepicker({
      language: "fa",
      format: "yyyy/mm/dd",
      calendarWeeks: true,
      clearBtn: true,
      todayHighlight: true,
      orientation: isRtl ? "auto left" : "auto right",
    });
  }

  // Inline picker
  if (bsDatepickerInlinedate.length) {
    bsDatepickerInlinedate.datepicker({
      format: "yyyy/mm/dd",
      language: "fa",
      todayHighlight: true,
    });
  }

  // Bootstrap Daterange Picker
  // --------------------------------------------------------------------

  var dateRangePickerFa = {
    format: "YYYY/MM/DD",
    separator: " - ",
    customRangeLabel: "انتخاب بازه",
    daysOfWeek: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
    monthNames: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    firstDay: 6,
  };

  var dateRangePickerTimeFa = {
    format: "YYYY/MM/DD h:mm A",
    separator: " - ",
    customRangeLabel: "انتخاب بازه",
    daysOfWeek: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
    monthNames: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    firstDay: 6,
  };

  var bsRangePickerBasic = $("#bs-rangepicker-basic"),
    bsRangePickerSingle = $("#bs-rangepicker-single"),
    bsRangePickerTime = $("#bs-rangepicker-time"),
    bsRangePickerRange = $("#bs-rangepicker-range"),
    bsRangePickerWeekNum = $("#bs-rangepicker-week-num"),
    bsRangePickerDropdown = $("#bs-rangepicker-dropdown"),
    bsRangePickerCancelBtn = document.getElementsByClassName("cancelBtn");

  // Basic
  if (bsRangePickerBasic.length) {
    bsRangePickerBasic.daterangepicker({
      locale: dateRangePickerFa,
      opens: isRtl ? "left" : "right",
    });
  }

  // Single
  if (bsRangePickerSingle.length) {
    bsRangePickerSingle.daterangepicker({
      locale: dateRangePickerFa,
      singleDatePicker: true,
      opens: isRtl ? "left" : "right",
    });
  }

  // Time & Date
  if (bsRangePickerTime.length) {
    bsRangePickerTime.daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      locale: dateRangePickerTimeFa,
      opens: isRtl ? "left" : "right",
    });
  }

  if (bsRangePickerRange.length) {
    bsRangePickerRange.daterangepicker({
      locale: dateRangePickerFa,
      ranges: {
        امروز: [moment(), moment()],
        دیروز: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "7 روز قبل": [moment().subtract(6, "days"), moment()],
        "۳۰ روز قبل": [moment().subtract(29, "days"), moment()],
        "این ماه": [moment().startOf("month"), moment().endOf("month")],
        "ماه قبلی": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
      },
      opens: isRtl ? "left" : "right",
    });
  }

  // Week Numbers
  if (bsRangePickerWeekNum.length) {
    bsRangePickerWeekNum.daterangepicker({
      locale: dateRangePickerFa,
      showWeekNumbers: true,
      opens: isRtl ? "left" : "right",
    });
  }
  // Dropdown
  if (bsRangePickerDropdown.length) {
    bsRangePickerDropdown.daterangepicker({
      locale: dateRangePickerFa,
      showDropdowns: true,
      opens: isRtl ? "left" : "right",
    });
  }

  // Adding btn-label-secondary class in cancel btn
  for (var i = 0; i < bsRangePickerCancelBtn.length; i++) {
    bsRangePickerCancelBtn[i].classList.remove("btn-default");
    bsRangePickerCancelBtn[i].classList.add("btn-label-primary");
  }

  // jQuery Timepicker
  // --------------------------------------------------------------------
  var basicTimepicker = $("#timepicker-basic"),
    minMaxTimepicker = $("#timepicker-min-max"),
    disabledTimepicker = $("#timepicker-disabled-times"),
    formatTimepicker = $("#timepicker-format"),
    stepTimepicker = $("#timepicker-step"),
    altHourTimepicker = $("#timepicker-24hours");

  // Basic
  if (basicTimepicker.length) {
    basicTimepicker.timepicker({
      orientation: isRtl ? "r" : "l",
    });
  }

  // Min & Max
  if (minMaxTimepicker.length) {
    minMaxTimepicker.timepicker({
      minTime: "2:00ب.ظ",
      maxTime: "7:00ب.ظ",
      showDuration: true,
      orientation: isRtl ? "r" : "l",
    });
  }

  // Disabled Picker
  if (disabledTimepicker.length) {
    disabledTimepicker.timepicker({
      disableTimeRanges: [
        ["12ق.ظ", "3ق.ظ"],
        ["4ق.ظ", "4:30ق.ظ"],
      ],
      orientation: isRtl ? "r" : "l",
    });
  }

  // Format Picker
  if (formatTimepicker.length) {
    formatTimepicker.timepicker({
      timeFormat: "H:i:s",
      orientation: isRtl ? "r" : "l",
    });
  }

  // Steps Picker
  if (stepTimepicker.length) {
    stepTimepicker.timepicker({
      step: 15,
      orientation: isRtl ? "r" : "l",
    });
  }

  // 24 Hours Format
  if (altHourTimepicker.length) {
    altHourTimepicker.timepicker({
      show: "24:00",
      timeFormat: "H:i:s",
      orientation: isRtl ? "r" : "l",
    });
  }
});

(function () {
  // Comment editor

  const commentEditor = document.querySelector(".comment-editor");

  if (commentEditor) {
    new Quill(commentEditor, {
      modules: {
        toolbar: ".comment-toolbar",
      },
      placeholder: "Product Description",
      theme: "snow",
    });
  }

  // previewTemplate: Updated Dropzone default previewTemplate

  // ! Don't change it unless you really know what you are doing

  const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

  // ? Start your code from here

  // Basic Dropzone

  const dropzoneBasic = document.querySelector("#dropzone-basic");
  if (dropzoneBasic) {
    const myDropzone = new Dropzone(dropzoneBasic, {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: ".jpg,.jpeg,.png,.gif",
      addRemoveLinks: true,
      maxFiles: 1,
    });
  }

  // Basic Tags

  const tagifyBasicEl = document.querySelector("#ecommerce-product-tags");
  const TagifyBasic = new Tagify(tagifyBasicEl);

  // Flatpickr

  // Datepicker
  const date = new Date();

  const productDate = document.querySelector(".product-date");

  if (productDate) {
    productDate.flatpickr({
      monthSelectorType: "static",
      defaultDate: date,
    });
  }
})();

//Jquery to handle the e-commerce product add page

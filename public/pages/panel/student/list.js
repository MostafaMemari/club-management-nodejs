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

function removeStudent(studentID) {
  Swal.fire({
    title: "مطمئنی؟",
    text: "آیا از حذف هنرجو اطمینان دارید؟!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله, حذف شود!",
    cancelButtonText: "بازگشت",
    customClass: {
      confirmButton: "btn btn-primary me-3 waves-effect waves-light",
      cancelButton: "btn btn-label-secondary waves-effect waves-light",
    },
    buttonsStyling: false,
  }).then(async function (result) {
    if (result.isConfirmed) {
      const res = await fetch(`${apiUrl}/students/${studentID}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "حذف شد!",
          text: "هنرجو با موفقیت حذف شد.",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success waves-effect waves-light",
          },
        }).then((res) => {
          window.location.href = "/students";
        });
      }
    }
  });
}

const apiUrl = "http://localhost:4040/api/v1";

//Toastr (jquery)
// --------------------------------------------------------------------
$(function () {
  const successMessage = document.querySelector("#success-message").innerHTML;
  // if (successMessage) {
  //   toastr.options = {
  //     newestOnTop: false,
  //     positionClass: "toast-top-center",
  //     showDuration: 300,
  //     hideDuration: 1000,
  //     timeOut: 5000,
  //     extendedTimeOut: 1000,
  //     showEasing: "swing",
  //     hideEasing: "linear",
  //     showMethod: "fadeIn",
  //     hideMethod: "fadeOut",
  //   };
  //   toastr.success(successMessage);
  // }

  if (successMessage) {
    Swal.fire({
      title: "موفق!",
      text: successMessage,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        confirmButton: "btn btn-primary waves-effect waves-light",
      },
      buttonsStyling: false,
    });
  }
});

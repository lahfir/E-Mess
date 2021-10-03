$("#login-btn").click(function () {
  $("#login-btn").css({ "font-weight": "600", color: "white" });
  $("#register-btn").css({ "font-weight": "400", color: "black" });
  $("#switcher").css({ right: "unset", left: "6px", width: "85px" });
  $("#register-form").hide();
  $("#login-form").fadeIn(250);
});

$("#register-btn").click(function () {
  $("#register-btn").css({ "font-weight": "600", color: "white" });
  $("#switcher").css({ left: "unset", right: "6px", width: "110px" });
  $("#login-btn").css({ "font-weight": "400", color: "black" });
  $("#login-form").hide();
  $("#register-form").fadeIn(250);
});

$("#register-form").submit(function (e) {
  var $form = $(this);
  var data = $form.serialize();

  if ($("#password-input").val() === $("#confirm-password-input").val()) {
    $.ajax({
      url: "/register",
      type: "POST",
      data: data,
      success: function (data) {
        window.location.href = "/";
        $(".logged-out-logging").css("display", "none");
        $(".logged-in-profile-container").css("display", "flex");
        $("#username").text(data["roll-no"]);
      },
      error: function (request, response) {
        alert(request.responseJSON.message);
      },
    });
  } else {
    alert("Passwords doesn't match");
  }

  e.preventDefault();
});

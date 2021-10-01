$("#login-btn").click(function () {
  $("#login-btn").css({ "font-weight": "600", color: "white" });
  $("#register-btn").css({ "font-weight": "400", color: "black" });
  $("#switcher").css({ right: "unset", left: "6px", width: "85px" });
});

$("#register-btn").click(function () {
  $("#register-btn").css({ "font-weight": "600", color: "white" });
  $("#switcher").css({ left: "unset", right: "6px", width: "110px" });
  $("#login-btn").css({ "font-weight": "400", color: "black" });
});

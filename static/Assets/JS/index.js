var _id = 0;
var breakfast = null,
  lunch = null,
  snack = null,
  dinner = null,
  egg = false,
  chicken = false,
  gobi = false,
  morning = null,
  afternoon = null,
  evening = null,
  night = null,
  schedule = null,
  User;
var days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

var times = ["breakfast", "lunch", "snack", "dinner"];

var i_modal = document.getElementById("information-modal");

$(document).ready(function () {
  $.ajax({
    data: _id,
    type: "GET",
    url: "/home",
  }).done(function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      User = data["user"];
      if (data["status"]) {
        $("#mess-status").text("Open");
        $("#mess-status").css("background", "#43CD51");
      } else {
        $("#mess-status").text("Closed");
        $("#mess-status").css("background", "#cd4343");
      }
      $("#lds-spinner").css("display", "none");
      $(".body-container").css("display", "flex");

      $.ajax({
        data: _id,
        type: "GET",
        url: "/",
      });
    }
  });

  $.ajax({
    data: _id,
    type: "GET",
    url: "/menu",
  }).done(function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      breakfast = data["breakfast"];
      lunch = data["lunch"];
      snack = data["snack"];
      dinner = data["dinner"];
      chicken = data["chicken"];
      egg = data["egg"];
      gobi = data["gobi"];
    }
  });

  $.ajax({
    data: _id,
    type: "GET",
    url: "/timings",
  }).done(function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      morning = data["morning"];
      afternoon = data["afternoon"];
      evening = data["evening"];
      night = data["night"];
    }
  });

  $.ajax({
    data: _id,
    type: "GET",
    url: "/schedule",
  }).done(function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      schedule = data["schedule"];
    }
  });

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

  $("#p-show-pd").click(function () {
    console.log("Clicked");
    $("#p-show-pd").hide();
    $("#p-hide-pd").show();
    $("#password-input").removeAttr("type");
  });

  $("#p-hide-pd").click(function () {
    console.log("Clicked");
    $("#p-hide-pd").hide();
    $("#p-show-pd").show();
    $("#password-input").attr("type", "password");
  });

  $("#c-show-pd").click(function () {
    console.log("Clicked");
    $("#c-show-pd").hide();
    $("#c-hide-pd").show();
    $("#confirm-password-input").removeAttr("type");
  });

  $("#c-hide-pd").click(function () {
    console.log("Clicked");
    $("#c-hide-pd").hide();
    $("#c-show-pd").show();
    $("#confirm-password-input").attr("type", "password");
  });

  $("#l-show-pd").click(function () {
    console.log("Clicked");
    $("#l-show-pd").hide();
    $("#l-hide-pd").show();
    $("#l-password-input").removeAttr("type");
  });

  $("#l-hide-pd").click(function () {
    console.log("Clicked");
    $("#l-hide-pd").hide();
    $("#l-show-pd").show();
    $("#l-password-input").attr("type", "password");
  });
});

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function card(e) {
  // Get the modal
  var modal = document.getElementById("main-modal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[2];

  if (User) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "flex";
    // informationmodal();
  }

  $("#lds-spinner").css("display", "inline-block");
  $("body").addClass("modal-open");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    $(".veg-icon").show();
    $(".non-veg-icon").hide();
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $(".veg-icon").show();
      $(".non-veg-icon").hide();
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $(".veg-icon").show();
        $(".non-veg-icon").hide();
        $("body").removeClass("modal-open");
      }
    },
    true
  );
  var _id = e.getAttribute("data-id");
  $("#modal-gallery").css("display", "none");
  $(".modal-main-content").css("display", "none");
  $(".menu-items-container").css("display", "none");
  var modal_main = document.querySelector(".menu-items-container");

  if (breakfast != null && lunch != null && snack != null && dinner != null) {
    switch (_id) {
      case "breakfast":
        $("#modal-image").attr("src", "../static/Assets/Images/Breakfast.jpg");
        $("#modal-title").text(_id);
        modal_main.innerHTML = "";
        for (var i = 0; i < breakfast.length; i++) {
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.appendChild(document.createTextNode(breakfast[i]));
          modal_main.appendChild(menu_item);
        }

        $("#lds-spinner").css("display", "none");
        $("#modal-gallery").css("display", "block");
        $(".modal-main-content").css("display", "block");
        $(".menu-items-container").css("display", "flex");
        break;
      case "lunch":
        $("#modal-image").attr("src", "../static/Assets/Images/Lunch.jpg");
        $("#modal-title").text(_id);
        modal_main.innerHTML = "";
        for (var i = 0; i < lunch.length; i++) {
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.appendChild(document.createTextNode(lunch[i]));
          modal_main.appendChild(menu_item);
        }

        if (egg) {
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.style.border = "2px solid green";
          menu_item.appendChild(document.createTextNode("Egg"));
          modal_main.appendChild(menu_item);
        }

        $("#lds-spinner").css("display", "none");
        $("#modal-gallery").css("display", "block");
        $(".modal-main-content").css("display", "block");
        $(".menu-items-container").css("display", "flex");
        break;
      case "snack":
        $("#modal-image").attr("src", "../static/Assets/Images/Snack.jpg");
        $("#modal-title").text(_id);
        modal_main.innerHTML = "";
        for (var i = 0; i < snack.length; i++) {
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.appendChild(document.createTextNode(snack[i]));
          modal_main.appendChild(menu_item);
        }
        $("#lds-spinner").css("display", "none");

        $("#modal-gallery").css("display", "block");
        $(".modal-main-content").css("display", "block");
        $(".menu-items-container").css("display", "flex");
        break;
      case "dinner":
        $("#modal-image").attr("src", "../static/Assets/Images/Dinner.jpg");
        $("#modal-title").text(_id);

        modal_main.innerHTML = "";
        for (var i = 0; i < dinner.length; i++) {
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.appendChild(document.createTextNode(dinner[i]));
          modal_main.appendChild(menu_item);
        }

        if (chicken) {
          $(".veg-icon").show();
          $(".non-veg-icon").show();
          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.appendChild(document.createTextNode("Chicken"));
          menu_item.style.border = "2px solid red";
          modal_main.appendChild(menu_item);

          var menu_item = document.createElement("P");
          menu_item.id = "modal-menu-item";
          menu_item.style.border = "2px solid green";
          menu_item.appendChild(document.createTextNode("Gobi"));
          modal_main.appendChild(menu_item);
        }

        $("#lds-spinner").css("display", "none");
        $("#modal-gallery").css("display", "block");
        $(".modal-main-content").css("display", "block");
        $(".menu-items-container").css("display", "flex");
        break;
    }
  } else {
    $.ajax({
      data: _id,
      type: "GET",
      url: "/menu",
    }).done(function (data) {
      if (data.error) {
        alert(data.error);
      } else {
        breakfast = data["breakfast"];
        lunch = data["lunch"];
        snack = data["snack"];
        dinner = data["dinner"];

        switch (_id) {
          case "breakfast":
            $("#modal-image").attr(
              "src",
              "../static/Assets/Images/Breakfast.jpg"
            );
            $("#modal-title").text(_id);
            modal_main.innerHTML = "";
            for (var i = 0; i < breakfast.length; i++) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode(breakfast[i]));
              modal_main.appendChild(menu_item);
            }
            $("#lds-spinner").css("display", "none");
            $("#modal-gallery").css("display", "block");
            $(".modal-main-content").css("display", "block");
            $(".menu-items-container").css("display", "flex");
            break;
          case "lunch":
            $("#modal-image").attr("src", "../static/Assets/Images/Lunch.jpg");
            $("#modal-title").text(_id);
            modal_main.innerHTML = "";

            for (var i = 0; i < lunch.length; i++) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode(lunch[i]));
              modal_main.appendChild(menu_item);
            }

            if (egg) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode("Egg"));
              modal_main.appendChild(menu_item);
            }

            $("#lds-spinner").css("display", "none");
            $("#modal-gallery").css("display", "block");
            $(".modal-main-content").css("display", "block");
            $(".menu-items-container").css("display", "flex");
            break;
          case "snack":
            $("#modal-image").attr("src", "../static/Assets/Images/Snack.jpg");
            $("#modal-title").text(_id);
            modal_main.innerHTML = "";
            for (var i = 0; i < snack.length; i++) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode(snack[i]));
              modal_main.appendChild(menu_item);
            }
            $("#lds-spinner").css("display", "none");

            $("#modal-gallery").css("display", "block");
            $(".modal-main-content").css("display", "block");
            $(".menu-items-container").css("display", "flex");
            break;
          case "dinner":
            $("#modal-image").attr("src", "../static/Assets/Images/Dinner.jpg");
            $("#modal-title").text(_id);

            modal_main.innerHTML = "";
            for (var i = 0; i < dinner.length; i++) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode(dinner[i]));
              modal_main.appendChild(menu_item);
            }

            if (chicken) {
              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode("Chicken"));
              modal_main.appendChild(menu_item);

              var menu_item = document.createElement("P");
              menu_item.id = "modal-menu-item";
              menu_item.appendChild(document.createTextNode("Gobi"));
              modal_main.appendChild(menu_item);
            }

            $("#lds-spinner").css("display", "none");
            $("#modal-gallery").css("display", "block");
            $(".modal-main-content").css("display", "block");
            $(".menu-items-container").css("display", "flex");
            break;
        }
      }
    });
  }
}
function contact() {
  var modal = document.getElementById("contact-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );
}
function thirdcontainer(e) {
  var modal = document.getElementById("third-container-modal");
  var _id = e.getAttribute("data-id");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[3];

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );

  $("#m-from-timing").text(morning[0]);
  $("#m-to-timing").text(morning[1]);

  $("#a-from-timing").text(afternoon[0]);
  $("#a-to-timing").text(afternoon[1]);

  $("#e-from-timing").text(evening[0]);
  $("#e-to-timing").text(evening[1]);

  $("#n-from-timing").text(night[0]);
  $("#n-to-timing").text(night[1]);
}
function scheduleModal(e) {
  var modal = document.getElementById("schedule-modal");
  var _id = e.getAttribute("data-id");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[4];

  if (User) {
    modal.style.display = "flex";
  } else {
    informationmodal();
  }
  $("body").addClass("modal-open");
  $(".schedule-container").css("display", "none");
  $("#lds-spinner").css("display", "inline-block");

  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  console.log(schedule);
  if (schedule != null) {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 4; j++) {
        document.querySelector(
          "." + days[i] + "-" + times[j].toString()
        ).innerHTML = "";
        for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
          var menu_item = document.createElement("P");
          menu_item.appendChild(
            document.createTextNode(schedule[days[i]][times[j]][k].capitalize())
          );
          document
            .querySelector("." + days[i] + "-" + times[j].toString())
            .appendChild(menu_item);
        }
        $(".schedule-container").css("display", "block");
        $("#lds-spinner").css("display", "none");
        // for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
        //   var menu_item = document.createElement("P");
        //   menu_item.appendChild(
        //     document.createTextNode(schedule[days[i]][times[j]][k])
        //   );
        //   $("." + schedule[days[i]] + "-lunch").appendChild(menu_item);
        // }
        // for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
        //   var menu_item = document.createElement("P");
        //   menu_item.appendChild(
        //     document.createTextNode(schedule[days[i]][times[j]][k])
        //   );
        //   $("." + schedule[days[i]] + "-snack").appendChild(menu_item);
        // }
        // for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
        //   var menu_item = document.createElement("P");
        //   menu_item.appendChild(
        //     document.createTextNode(schedule[days[i]][times[j]][k])
        //   );
        //   $("." + schedule[days[i]] + "-dinner").appendChild(menu_item);
        // }
      }
    }
  } else {
    $.ajax({
      data: _id,
      type: "GET",
      url: "/schedule",
    }).done(function (data) {
      if (data.error) {
        alert(data.error);
      } else {
        schedule = data["schedule"];
        for (var i = 0; i < 7; i++) {
          for (var j = 0; j < 4; j++) {
            document.querySelector(
              "." + days[i] + "-" + times[j].toString()
            ).innerHTML = "";
            for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
              var menu_item = document.createElement("P");
              menu_item.appendChild(
                document.createTextNode(schedule[days[i]][times[j]][k])
              );
              document
                .querySelector("." + days[i] + "-" + times[j].toString())
                .appendChild(menu_item);
            }
          }
        }
        $(".schedule-container").css("display", "block");
        $("#lds-spinner").css("display", "none");
      }
    });
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );
}
function moreinfo() {
  var modal = document.getElementById("more-info-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[1];

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );
}
function aboutmodal() {
  var modal = document.getElementById("about-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[5];

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );
}
function informationmodal() {
  var modal = document.getElementById("information-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[6];

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $("body").removeClass("modal-open");
    }
  };
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) &&
        e.target.nodeName == "BODY"
      ) {
        modal.style.display = "none";
        $("body").removeClass("modal-open");
      }
    },
    true
  );
}

$("#register-form").submit(function (e) {
  e.preventDefault();
  var $form = $(this);
  var data = $form.serialize();

  document.getElementById("register-submit-btn").innerHTML = "Registering...";
  $("#register-submit-btn").css({
    animation: "pulse 0.3s infinite",
    "background-color": "#fdba63",
  });

  if ($("#password-input").val() === $("#confirm-password-input").val()) {
    $.ajax({
      url: "/register",
      type: "POST",
      data: data,
      dataType: "json",
      success: function (data) {
        window.location.href = "/";
        $("#register-submit-btn").text("Register");
        // $(".logged-out-logging").css("display", "none");
        // $(".logged-in-profile-container").css("display", "flex");
        // $("#username").text(data["name"]);
      },
      error: function (request, response) {
        alert(request.responseJSON.message);
      },
    });
  } else {
    alert("Passwords doesn't match");
  }
});

$("#login-form").submit(function (e) {
  e.preventDefault();
  var $form = $(this);
  var data = $form.serialize();

  $.ajax({
    url: "/login",
    dataType: "json",
    type: "POST",
    data: data,
  }).done(function (response) {
    console.log(response);
    if (response.responseJSON.message) {
      alert(response.responseJSON.message);
    } else {
      window.location.href = "/";
    }
  });
});

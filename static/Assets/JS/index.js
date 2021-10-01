var _id = 0;
var breakfast,
  lunch,
  snack,
  dinner,
  morning,
  afternoon,
  evening,
  night,
  schedule = null;
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

$(document).ready(function () {
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
});

function card(e) {
  // Get the modal
  var modal = document.getElementById("main-modal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[2];

  modal.style.display = "flex";
  $("#lds-spinner").css("display", "inline-block");
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
  var _id = e.getAttribute("data-id");
  $("#modal-gallery").css("display", "none");
  $(".modal-main-content").css("display", "none");
  $(".menu-items-container").css("display", "none");
  var modal_main = document.querySelector(".menu-items-container");

  if (modal_main.innerHTML != "") {
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

  modal.style.display = "flex";
  $("body").addClass("modal-open");

  span.onclick = function () {
    modal.style.display = "none";
    $("body").removeClass("modal-open");
  };

  console.log(schedule["monday"]["breakfast"].length);
  if (schedule != null) {
    console.log("done");
    for (var i = 0; i < 7; i++) {
      console.log("done");
      for (var j = 0; j < 4; j++) {
        console.log("done");
        for (var k = 0; k < schedule[days[i]][times[j]].length; k++) {
          var menu_item = document.createElement("P");
          menu_item.appendChild(
            document.createTextNode(schedule[days[i]][times[j]][k])
          );
          console.log("done");
          document
            .querySelector("." + days[i] + "-" + times[j].toString())
            .appendChild(menu_item);
        }
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
        for (var i = 0; i < schedule.length; i++) {
          for (var j = 0; j < schedule[i].length; j++) {
            var menu_item = document.createElement("P");
            menu_item.appendChild(document.createTextNode(schedule[i][j]));
            $("." + schedule[i] + "-breakfast").appendChild(menu_item);
          }
          for (var j = 0; j < schedule[i].length; j++) {
            var menu_item = document.createElement("P");
            menu_item.appendChild(document.createTextNode(schedule[i][j]));
            $("." + schedule[i] + "-lunch").appendChild(menu_item);
          }
          for (var j = 0; j < schedule[i].length; j++) {
            var menu_item = document.createElement("P");
            menu_item.appendChild(document.createTextNode(schedule[i][j]));
            $("." + schedule[i] + "-snack").appendChild(menu_item);
          }
          for (var j = 0; j < schedule[i].length; j++) {
            var menu_item = document.createElement("P");
            menu_item.appendChild(document.createTextNode(schedule[i][j]));
            $("." + schedule[i] + "-dinner").appendChild(menu_item);
          }
        }
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

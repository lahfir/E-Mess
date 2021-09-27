var _id = 0;

function card(e) {
  // Get the modal
  var modal = document.getElementById("main-modal");

  var _id = e.getAttribute("data-id");

  $("#modal-title").text(_id);

  switch (_id) {
    case "breakfast":
      $("#modal-image").attr("src", "../static/Assets/Images/Breakfast.jpg");
      break;
    case "lunch":
      $("#modal-image").attr("src", "../static/Assets/Images/Lunch.jpg");
      break;
    case "snack":
      $("#modal-image").attr("src", "../static/Assets/Images/Snack.jpg");
      break;
    case "dinner":
      $("#modal-image").attr("src", "../static/Assets/Images/Dinner.jpg");
      break;
  }

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[2];

  modal.style.display = "flex";

  $.ajax({
    data: _id,
    type: "GET",
    url: "/menu",
  }).done(function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      var modal_main = document.querySelector(".menu-items-container");
      modal_main.innerHTML = "";
      for (var i = 0; i < data[_id].length; i++) {
        var menu_item = document.createElement("P");
        menu_item.id = "modal-menu-item";
        menu_item.appendChild(document.createTextNode(data[_id][i]));
        modal_main.appendChild(menu_item);
      }
    }
  });
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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
      }
    },
    true
  );
}

function contact() {
  var modal = document.getElementById("contact-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "flex";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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
      }
    },
    true
  );
}

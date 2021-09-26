function card(e) {
  // Get the modal
  var modal = document.getElementById("main-modal");

  var type = e.getAttribute("data-id");

  $("#modal-title").text(type);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[2];

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

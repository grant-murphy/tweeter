// Character Counter Function (Checking if the user inputs more than 140 characts within the textfield)
$(document).ready(function () {
  $('.tweet-text-area').on("input", function () {
    var maxlength = 140;
    var currentLength = $(this).val().length;
    var $counter = $(this).siblings(".counter")
    $counter.text(maxlength - currentLength);
    if (currentLength > maxlength) {
      $counter.addClass("invalid");
    } else {
      $counter.removeClass("invalid");
    }
  });
});
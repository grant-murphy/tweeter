$(document).ready(function () {

  $("#submit-form").submit(function (event) {
    event.preventDefault();
    const post_url = $(this).attr("action");
    const form_data = $(this).serialize();
    const counterLen = $(this).children(".tweet-text-area").val().length;
    
    if (counterLen === 0 || counterLen > 140) {
      if(counterLen === 0) {
        alert('Text field empty!')
      }
      if(counterLen > 140) {
        alert('Text field too long')
      }
    } else {
      $.post(post_url, form_data, function (response) {
      });
    }
  });
});


// form empty or form length > 140
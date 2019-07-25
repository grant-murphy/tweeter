// Preventing XSS with Escaping Function
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Focus in on Textfield Function
const focusField = function () {
  $(".tweet-text-area").focus()

}

// Toggle Button Function (Toggles Tweet Input using the Compose Button)
const toggleButton = function () {
  $(".new-tweet").slideToggle("slow", function () {
    focusField();
    $(".errors").hide();
  })
};

// Error Button Function (Displays errors within Form Submission Function)
// const errorButton = function () {
//   $(".errors").slideToggle("slow")
// };


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const createTweetElement = function (tweetData) {

  return `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweetData.user.avatars}" />
        <p class="name">${tweetData.user.name}</p>
        <p class="handle">${tweetData.user.handle}</p>
      </header>
      <p class="content">${escape(tweetData.content.text)}</p>
      <footer>
        <p class="created_at">${jQuery.timeago(new Date(tweetData.created_at))}</p>
        <div class="buttons">
          <img src="/images/flag.png" />
          <img src="/images/refresh.png" />
          <img src="/images/favorite-heart-button.png" />
        </div>
      </footer>
  </article> `
}

const renderTweets = function (tweets) {
  let array = [];
  for (let tweet of tweets) {
    array.unshift(createTweetElement(tweet));
  }
  $('#tweets-container').append(array)
}

const loadTweets = function () {
  $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
      $('#tweets-container').empty()
      renderTweets(tweets);
    });
}

// Form Submission Function (IF/ELSE statements making sure user inputs text and doesn't exceed character count)
const formSubmission = function () {
  $("#submit-form").submit(function (event) {
    event.preventDefault();
    const form_data = $(this).serialize();
    const counterLen = $(this).children(".tweet-text-area").val().length;

    if (counterLen === 0 || counterLen > 140) {
      if (counterLen === 0) {
        $(".errors").html(`<img src="/images/invalid-input.png" />`)
        $('.errors').slideDown(200);
      }
      if (counterLen > 140) {
        $(".errors").html(`<img src="/images/exceeded-characters.png" />`)
        $('.errors').slideDown(200);
      }
    } else {
      $(".errors").hide();
      $.ajax('/tweets/', {
        method: 'POST',
        data: form_data
      })
        .then(function () {
          $('.tweet-text-area').val('');
          $('.counter').text(140);
          loadTweets();
        })
    }
  });
}

$(document).ready(function () {
  loadTweets();
  formSubmission();
  $('.errors').hide();
  $("time.timeago").timeago();
});
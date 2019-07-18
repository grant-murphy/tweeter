const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const focusField = function() {
  $( ".tweet-text-area" ).focus()
}

const toggleButton = function () {
  $(".new-tweet").slideToggle("slow", function () {
    focusField()
  })
};

const errorButton = function () {
  $(".errors").slideToggle("slow")
};

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

const formSubmission = function () {
  $("#submit-form").submit(function (event) {
    event.preventDefault();
    const form_data = $(this).serialize();
    const counterLen = $(this).children(".tweet-text-area").val().length;

    if (counterLen === 0 || counterLen > 140) {
      if (counterLen === 0) {
        errorButton()
        $(".errors").html(`<img src="/images/invalid-input.png" />`)
      }
      if (counterLen > 140) {
        errorButton()
        $(".errors").html(`<img src="/images/exceeded-characters.png" />`)
      }
    } else {
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
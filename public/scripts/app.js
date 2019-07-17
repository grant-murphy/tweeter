const createTweetElement = function (tweetData) {

  return `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweetData.user.avatars}" />
        <p class="name">${tweetData.user.name}</p>
        <p class="handle">${tweetData.user.handle}</p>
      </header>
      <p class="content">${tweetData.content.text}</p>
      <footer>
        <p class="created_at">${new Date(tweetData.created_at)}</p>
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
        alert('Text field empty!')
      }
      if (counterLen > 140) {
        alert('Text field too long')
      }
    } else {
      $.ajax('/tweets/', {
        method: 'POST',
        data: form_data
      })
        .then(function () {
          loadTweets();
          console.log('hello')
        })
    }
  });
}

$(document).ready(function () {
  loadTweets();
  formSubmission();

});
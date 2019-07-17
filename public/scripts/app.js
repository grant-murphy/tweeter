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
  
  const renderTweets = function(tweets) {
    let array = [];
    for(let tweet of tweets) {
      array.unshift(createTweetElement(tweet));
      }
      $('#tweets-container').append(array)
    }

    const loadTweets = function() {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
       renderTweets(tweets);
      });
}

  $(document).ready(function() {
  loadTweets();
});
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

createTweetElement = function (tweet) {
  const text = $("<div>").text(tweet.content.text).html();
  const name = $("<div>").text(tweet.user.name).html();
  const username = $("<div>").text(tweet.user.handle).html();
  const avatar = $("<div>").text(tweet.user.avatars).html();
  const time = $("<div>").text(tweet.created_at).html();


  let $tweet = $(`<section class="tweets">
  <article>
    <div>
      <img class="avatar" src="${avatar}">
      <h3 class="name">${name}</h3>
      <p class="username">${username}</p>
    </div>
    <p class="tweet-body">
        ${text}
      </p>
      <footer>
        <p class="footer-text">${timeago.format(time)}</p>
        <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </footer>
    </article>
  </section>`
  )
  return $tweet
}


$(document).ready(() => {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweet-container').empty()
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $('.tweet-container').prepend($tweet)
    }
  }
  
  $('.new-tweet form').on('submit', (event) => {
    event.preventDefault();
    let inputLength = $('#tweet-text').val().length;

    if (inputLength > 140){
      alert('Tweet exceeded character limit.')
      return;
    } else if (!inputLength){
      alert('Tweet is empty.')
    }

    let $tweet = $('.new-tweet form').serialize();
    $.post('/tweets/', $tweet, (err, data) => {
      tweetLoader();
      //clears and refocuses text box
      const $input = $('#tweet-text')
      $($input).val('').focus();
    })
  
  });
  
  const tweetLoader = () => {
    $.get('/tweets', (tweet) => {
      renderTweets(tweet)
    })
  }

  tweetLoader()

});
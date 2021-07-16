/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//tweet post skeleton
createTweetElement = function(tweet) {
  const text = $("<div>").text(tweet.content.text).html();
  const name = $("<div>").text(tweet.user.name).html();
  const username = $("<div>").text(tweet.user.handle).html();
  const avatar = $("<div>").text(tweet.user.avatars).html();
  const time = $("<div>").text(tweet.created_at).html();


  let $tweet = $(`<section class="tweets">
  <article>
    <div>
      <img class="avatar" src="${escape(avatar)}">
      <h3 class="name">${escape(name)}</h3>
      <p class="username">${escape(username)}</p>
    </div>
    <p class="tweet-body">
        ${escape(text)}
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
  return $tweet;
};


$(document).ready(() => {
  $('.error').hide;

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweet-container').empty()
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  }

  //hide error message until called
  const error = (errMsg) => {
    $('.error').slideDown().text(errMsg);
    $('#tweet-text').on('keypress', function () {
      $('.error').slideUp();
      $('textarea').focus();
    })
  }

  //user makes new tweet via form
  $('.new-tweet form').on('submit', (event) => {
    event.preventDefault();
    let inputLength = $('#tweet-text').val().length;

    //validates input
    if (inputLength > 140) {
      error('Tweet exceeded character limit.');
      return;

    } else if (!inputLength) {
      error('Tweet is empty.');
    }

    //post newly created tweet
    let $tweet = $('.new-tweet form').serialize();
    $.post('/tweets/', $tweet, (err, data) => {
      tweetLoader();
      //clears and refocuses text box
      const $input = $('#tweet-text');
      $($input).val('').focus();
    })
  });

  //get previous tweets
  const tweetLoader = () => {
    $.get('/tweets', (tweet) => {
      renderTweets(tweet);
    })
  }

  tweetLoader();

});
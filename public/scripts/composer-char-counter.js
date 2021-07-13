
$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    const count = 140;
    const $counter = $('.counter')
    let inputLength = $(this).val().length;
    $counter.text(count - inputLength)

    //changes colour to red if input goes over char limit
    if (inputLength > 140) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', 'black')
    }
  })
});

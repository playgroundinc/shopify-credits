$(function () {
  const playBtn = document.getElementById('autoplay');
  const progressBar = document.getElementById('progressbar');

  const docHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const calcHeight = docHeight - windowHeight;

  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  let percentage = (scrollTop / calcHeight) * 100;
  progressBar.style.width = `${percentage}%`;
  progressBar.style.transition = 'width 0.1s ease';

  let scrollInterval;
  let playing = false;

  window.onscroll = function () {
    // Get current scroll position
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    // Update current scroll percentage
    percentage = (scrollTop / calcHeight) * 100;
    // Set width of progress bar
    progressBar.style.width = `${percentage}%`;

    if (percentage === 100) {
      playBtn.innerHTML = 'Return to Top';
      playing = false;
      clearInterval(scrollInterval);
    } else {
      playBtn.innerHTML = playing ? 'Pause' : 'Play';
    }

  };

  playBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (percentage === 100) {
      playBtn.innerHTML = 'Play';
      window.scrollTo(0, 0);
      percentage = 0;
    } else {
      if (playing) {
        playBtn.innerHTML = 'Play';
        playing = false;
        clearInterval(scrollInterval);
      } else {
        playing = true;
        playBtn.innerHTML = 'Pause';
        scrollInterval = setInterval(
          function () {
            window.requestAnimationFrame(function () {
              window.scrollBy(0, 10);
            });
          }, 10);
      }
    }

  });
});

    // TODO: Add resize listeners
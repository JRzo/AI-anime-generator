const progressFill = document.querySelector('.progress-fill');
let progress = 0;

const loadInterval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        progressFill.style.width = `${progress}%`;
      } else {
        clearInterval(loadInterval);
        //  Hide the loading screen here
      }
    }, 100);

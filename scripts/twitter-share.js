console.log("Sharing Twitter Tweet");

(async () => {
    const { value } = await chrome.storage.local.get(['value']);

    const interval = setInterval(() => {
        const shareButton = document.querySelector('[data-testid="tweetButton"]');
        if (shareButton) {
            clearInterval(interval);
            if (value === 'twitter') {
                chrome.runtime.sendMessage({
                  message: 'RERUN'
                })
              }
              chrome.runtime.sendMessage({
                  message: 'CLOSE_WINDOW'
              })
            shareButton.click();
        }
    }, 300)
})()
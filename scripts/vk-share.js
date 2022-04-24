console.log("Sharing VK Post");

(async () => {
  const { value } = await chrome.storage.get(['value']);

  const interval = setInterval(() => {
    const shareButton = document.querySelector('#post_button');
    if (shareButton) {

      if (value === 'vk') {
        chrome.runtime.sendMessage({
          message: 'RERUN'
        })
      }

      clearInterval(interval);
      chrome.runtime.sendMessage({
        message: 'CLOSE_WINDOW'
      })
      shareButton.click();
    }
  }, 300)
})()
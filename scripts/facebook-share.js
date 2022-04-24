console.log("Sharing Facebook Post");

(async () => {
    const { value } = await chrome.storage.get(['value']);
    const interval = setInterval(() => {
        const shareButton = document.querySelector('[name="__CONFIRM__"]');
        if (shareButton) {
            
            clearInterval(interval);
            if (value === 'facebook') {
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
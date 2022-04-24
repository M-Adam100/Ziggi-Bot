

console.log("Sharing LinkedIn Post");

(async () => {
    const { value } = await chrome.storage.get(['value']);

    const interval = setInterval(() => {
        const ShareDiv = document.querySelector('button');

        if (ShareDiv) {
            ShareDiv.click();
            const shareButton = document.querySelector('.share-box_actions').querySelector('button').click();
            if (shareButton) {
                clearInterval(interval);
                if (value === 'linkedin') {
                    chrome.runtime.sendMessage({
                      message: 'RERUN'
                    })
                  }
            
                  chrome.runtime.sendMessage({
                    message: 'CLOSE_WINDOW'
                  })
                  shareButton.click();
                
            } 
        }
    }, 300)
})()

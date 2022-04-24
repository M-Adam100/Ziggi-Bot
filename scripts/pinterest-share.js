
console.log("Sharing Pinterest Post");

(async () => {
    const { value } = await chrome.storage.get(['value']);

    const interval = setInterval(() => {
        const shareButton = document.querySelector('[data-test-id="BoardPickerSaveButton"]');
        if (shareButton) {
            clearInterval(interval);
            if (value === 'pinterest') {
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
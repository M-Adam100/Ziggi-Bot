
console.log("Sharing Pinterest Post");

(async () => {
    const interval = setInterval(() => {
        const shareButton = document.querySelector('[data-test-id="BoardPickerSaveButton"]');
        if (shareButton) {
            clearInterval(interval);
            shareButton.click();
            setTimeout(() => {
                window.close();
            },1500)
        }
    }, 300)
})()
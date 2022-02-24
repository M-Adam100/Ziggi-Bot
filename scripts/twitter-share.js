console.log("Sharing Twitter Tweet");

(async () => {
    const interval = setInterval(() => {
        const shareButton = document.querySelector('[data-testid="tweetButton"]');
        if (shareButton) {
            clearInterval(interval);
            shareButton.click();
            setTimeout(() => {
                window.close();
            },1500)
        }
    }, 300)
})()
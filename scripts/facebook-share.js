console.log("Sharing Facebook Post");

(async () => {
    const interval = setInterval(() => {
        const shareButton = document.querySelector('[name="__CONFIRM__"]');
        if (shareButton) {
            clearInterval(interval);
            shareButton.click();
            setTimeout(() => {
                window.close();
                
            },1500)
        }
    }, 300)
})()
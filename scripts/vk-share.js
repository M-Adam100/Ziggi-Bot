console.log("Sharing VK Post");

(async () => {
    const interval = setInterval(() => {
        const shareButton = document.querySelector('#post_button');
        if (shareButton) {
            chrome.runtime.sendMessage({
                message: 'RERUN'
            })
            clearInterval(interval);
            shareButton.click();
            setTimeout(() => {    
                window.close();
            },1500)
        }
    }, 300)
})()
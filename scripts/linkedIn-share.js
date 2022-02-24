

console.log("Sharing LinkedIn Post");

(async () => {
    const interval = setInterval(() => {
        const ShareDiv = document.querySelector('button');

        if (ShareDiv) {
            ShareDiv.click();
            const shareButton = document.querySelector('.share-box_actions').querySelector('button').click();
            if (shareButton) {
                clearInterval(interval);
                shareButton.click();
                setTimeout(() => {
                    window.close();
                },1500)
            } 
        }
    }, 300)
})()

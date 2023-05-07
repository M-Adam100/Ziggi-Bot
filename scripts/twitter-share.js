console.log("Sharing Twitter Tweet");

(async () => {
    function urldecode(str) {
        return decodeURIComponent((str + '').replace(/\+/g, '%20'))
      }
    
      const setDetailsCache = async (url) => {
        const { posts } = await chrome.storage.local.get('["posts"]')
        const post = {
          postUrl: url,
          date: new Date().getTime() + 12 * 60 * 60 * 1000,
          twitter: true,
        }
        if (posts && posts.length) {
          const allPosts = [...posts, post];
          chrome.storage.local.set({
            posts: allPosts
          })
        } else {
          const allPosts = [post]
          chrome.storage.local.set({
            posts: allPosts
          })
        }
      }
      const { twitterStatus } = await chrome.storage.local.get(['twitterStatus'])
      if (!twitterStatus) {
        return
      }

    const interval = setInterval(() => {
        const shareButton = document.querySelector('[data-testid="tweetButton"]');
        if (shareButton) {
            clearInterval(interval);
            const url = urldecode(window.location.href);
            setDetailsCache(url);
              chrome.runtime.sendMessage({
                  message: 'CLOSE_WINDOW'
              })
            shareButton.click();
        }
    }, 300)
})()
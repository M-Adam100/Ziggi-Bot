console.log('Sharing LinkedIn Post')

;(async () => {

  function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'))
  }
  
  const setDetailsCache = async (url) => {
    const { posts } = await chrome.storage.local.get('["posts"]');
    const post = {
      postUrl: url,
      date: new Date().getTime() + 12 * 60 * 60 * 1000,
      linkedIn: true,
    }
    if (posts && posts.length) {
      const allPosts = [...posts, post]
      chrome.storage.local.set({
        posts: allPosts,
      })
    } else {
      const allPosts = [post]
      chrome.storage.local.set({
        posts: allPosts,
      })
    }
  }

  const { linkedInStatus } = await chrome.storage.local.get(['linkedInStatus'])
  if (!linkedInStatus) {
    return
  }
  const interval = setInterval(() => {
    const ShareDiv = document.querySelector('button');

    if (ShareDiv) {
      clearInterval(interval);
      ShareDiv.click();

      const buttonInterval = setInterval(() => {
        const shareButton = document
        .querySelector('.share-box_actions')
        .querySelector('button');
        const url = urldecode(window.location.href);
        setDetailsCache(url);
      if (shareButton) {
        clearInterval(buttonInterval);
        chrome.runtime.sendMessage({
          message: 'CLOSE_WINDOW',
        })
        shareButton.click()
        console.log('Post Shared')
      }
      }, 1000)
    
    }
  }, 300)
})();

console.log('Sharing Facebook Post')
;(async () => {
  function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'))
  }

  const setDetailsCache = async (url) => {
    const { posts } = await chrome.storage.local.get('["posts"]')
    const post = {
      postUrl: url,
      date: new Date().getTime() + 12 * 60 * 60 * 1000,
      facebook: true,
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
  const { facebookStatus } = await chrome.storage.local.get(['facebookStatus'])
  if (!facebookStatus) {
    return;
  }
  const interval = setInterval(async () => {
    const shareButton = document.querySelector('[name="__CONFIRM__"]')
    if (shareButton) {
      const url = urldecode(window.location.href);
      setDetailsCache(url);
      clearInterval(interval);
      chrome.runtime.sendMessage({
        message: 'CLOSE_WINDOW',
      })
      shareButton.click()
      console.log('Post Shared!')
    }
  }, 300)
})()

console.log('Sharing Twitter Tweet')

;(async () => {
  setTimeout(async () => {
    console.log('Some Error Occured!')
    await chrome.storage.local.set({
      sharingTwitterStatus: false,
    })
    window.close()
  }, 10000)

  function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'))
  }

  const setDetailsCache = async (url) => {
    const { posts } = await chrome.storage.local.get('posts')
    const post = {
      postUrl: url,
      date: new Date().getTime() + 12 * 60 * 60 * 1000,
      twitter: true,
    }
    if (posts && posts.length) {
      const allPosts = [...posts, post]
      await chrome.storage.local.set({
        posts: allPosts,
      })
    } else {
      const allPosts = [post]
      await chrome.storage.local.set({
        posts: allPosts,
      })
    }
  }
  const { twitterStatus } = await chrome.storage.local.get(['twitterStatus'])
  if (!twitterStatus) {
    return
  }

  const interval = setInterval(async () => {
    const shareButton = document.querySelector('[data-testid="tweetButton"]')
    if (shareButton) {
      clearInterval(interval)
      const url = urldecode(window.location.href)
      await setDetailsCache(url)
      shareButton.click()
      await chrome.storage.local.set({
        sharingTwitterStatus: false,
      })

      setTimeout(() => {
        window.close()
      }, 2500)
    }
  }, 300)
})()

console.log('Sharing Facebook Post')
;(async () => {
  setTimeout(async () => {
    console.log('Some Error Occured!')
    await chrome.storage.local.set({
      sharingFacebookStatus: false,
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
      facebook: true,
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
  const { facebookStatus } = await chrome.storage.local.get(['facebookStatus'])
  if (!facebookStatus) {
    return
  }
  const interval = setInterval(async () => {
    const shareButton = document.querySelector('[name="__CONFIRM__"]')
    if (shareButton) {
      const url = urldecode(window.location.href)
      await setDetailsCache(url)
      clearInterval(interval)
      shareButton.click()
      await chrome.storage.local.set({
        sharingFacebookStatus: false,
      })

      setTimeout(() => {
        window.close()
      }, 2500)
      console.log('Post Shared!')
    }
  }, 300)
})()

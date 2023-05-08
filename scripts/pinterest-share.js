console.log('Sharing Pinterest Post')

;(async () => {
  setTimeout(async () => {
    console.log('Some Error Occured!')
    await chrome.storage.local.set({
      sharingPinterestStatus: false,
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
      pinterest: true,
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
  const { pinterestStatus } = await chrome.storage.local.get([
    'pinterestStatus',
  ])
  if (!pinterestStatus) {
    return
  }

  const interval = setInterval(async () => {
    const shareButton = document.querySelector(
      '[data-test-id="BoardPickerSaveButton"]',
    )
    if (shareButton) {
      clearInterval(interval)
      const url = urldecode(window.location.href)
      await setDetailsCache(url)
      shareButton.click()
      await chrome.storage.local.set({
        sharingPinterestStatus: false,
      })

      setTimeout(() => {
        window.close()
      }, 2500)
    }
  }, 300)
})()

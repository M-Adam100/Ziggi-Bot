console.log("Sharing VK Post");

(async () => {

  setTimeout(async () => {
    console.log('Some Error Occured!');
    await chrome.storage.local.set({
      sharingVkStatus: false,
    })
    window.close();
  }, 10000);

  function urldecode(str) {
    return decodeURIComponent((str + '').replace(/\+/g, '%20'))
  }

  const setDetailsCache = async (url) => {
    const { posts } = await chrome.storage.local.get('posts')
    const post = {
      postUrl: url,
      date: new Date().getTime() + 12 * 60 * 60 * 1000,
      vk: true,
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
  const { vkStatus } = await chrome.storage.local.get(['vkStatus'])
  if (!vkStatus) {
    return;
  }

  const interval = setInterval(async () => {
    const shareButton = document.querySelector('#post_button');
    if (shareButton) {
      clearInterval(interval);
      const url = urldecode(window.location.href);
      await setDetailsCache(url);
      shareButton.click();
      await chrome.storage.local.set({
        sharingVkStatus: false,
      })

      setTimeout(() => {
        window.close();
      }, 2500);
    }
  }, 300)
})()
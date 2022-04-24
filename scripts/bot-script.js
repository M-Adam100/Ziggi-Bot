console.log("Launching Bot");

(async () => {
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const storeTabId = async () => {
    chrome.runtime.sendMessage({
      message: 'SAVE_TAB_ID'
    });
  }

  const setRerunVar = async (value) => {
    chrome.storage.local.set({
      value
    })
  }

  const CS = await chrome.storage.local.get(['facebookStatus', 'twitterStatus', 'linkedInStatus', 'pinterestStatus', 'vkStatus']);

  const postInterval = setInterval(() => {
    const post = [...document.querySelector('.js_posts_stream')?.querySelector('ul').children].filter(item => !item.getAttribute('shared'))[0];
  if (post) {
    clearInterval(postInterval);
    storeTabId();
    post.setAttribute('shared', 'true');

    console.log(post);

    if (CS.facebookStatus) {
      console.log("Sharing on Facebook");
      const facebookUrl = post.querySelector('a.btn-facebook').href;
      chrome.runtime.sendMessage({
        message: 'FACEBOOK_SHARE',
        url: facebookUrl
      })
      await sleep(2000);

      setRerunVar('facebook');
    }




    if (CS.twitterStatus) {
      console.log("Sharing on Twitter");
      const twitterUrl = post.querySelector('a.btn-twitter').href;
      chrome.runtime.sendMessage({
        message: 'TWITTER_SHARE',
        url: twitterUrl
      })
      await sleep(2000);
      setRerunVar('twitter');

    }



    if (CS.vkStatus) {
      console.log("Sharing on VK");
      const VkUrl = post.querySelector('a.btn-vk').href;
      chrome.runtime.sendMessage({
        message: 'VK_SHARE',
        url: VkUrl
      })
      await sleep(2000);
      setRerunVar('vk');
    }

    if (CS.linkedInStatus) {

      console.log("Sharing on LinkedIn");
      const linkedIn = post.querySelector('a.btn-linkedin').href;

      chrome.runtime.sendMessage({
        message: 'LINKEDIN_SHARE',
        url: linkedIn
      })
      await sleep(2000);
      setRerunVar('linkedin');

    }


    if (CS.pinterestStatus) {
    console.log("Sharing on Pinterest");
    const pinterestUrl = post.querySelector('a.btn-pinterest').href;
      chrome.runtime.sendMessage({
        message: 'PINTEREST_SHARE',
        url: pinterestUrl
      })
      await sleep(2000);
      setRerunVar('linkedIn');

    }

    await sleep(2000);


  } else {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
  }
  }, 1000);
  

})()
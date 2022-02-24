console.log("Launching Bot");

(async () => {
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const CS = await chrome.storage.local.get(['facebookStatus', 'twitterStatus', 'linkedInStatus', 'pinterestStatus', 'vkStatus']);

  const post = [...document.querySelector('.js_posts_stream')?.querySelector('ul').children].filter(item => !item.getAttribute('shared'))[0];
  if (post) {
    post.setAttribute('shared', 'true');

    console.log("Sharing on Facebook");
    const facebookUrl = post.querySelector('a.btn-facebook').href;
    await sleep(2000);

    console.log("Sharing on Twitter");
    const twitterUrl = post.querySelector('a.btn-twitter').href;

    if (CS.twitterStatus) {
      chrome.runtime.sendMessage({
        message: 'TWITTER_SHARE',
        url: twitterUrl
      })
    }

    await sleep(2000);
    console.log("Sharing on VK");
    const VkUrl = post.querySelector('a.btn-vk').href;

    if (CS.vkStatus) {
      chrome.runtime.sendMessage({
        message: 'VK_SHARE',
        url: VkUrl
      })
    }
    
    await sleep(2000);
    console.log("Sharing on LinkedIn");
    const linkedIn = post.querySelector('a.btn-linkedin').href;

    if (CS.linkedInStatus) {
      chrome.runtime.sendMessage({
        message: 'LINKEDIN_SHARE',
        url: linkedIn
      })
    }

    await sleep(2000);
    console.log("Sharing on Pinterest");
    const pinterestUrl = post.querySelector('a.btn-pinterest').href;

    if (CS.pinterestStatus) {
      chrome.runtime.sendMessage({
        message: 'PINTEREST_SHARE',
        url: pinterestUrl
      })
    }
   
    await sleep(2000);

    if (CS.facebookStatus) {
      chrome.runtime.sendMessage({
        message: 'FACEBOOK_SHARE',
        url: facebookUrl
      })
    }

   
  }

})()
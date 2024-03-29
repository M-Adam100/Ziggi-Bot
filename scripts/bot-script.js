console.log('Launching Bot')
;(async () => {
  const loader = document.createElement('div')
  loader.id = 'nihao-loader';
  loader.className = 'nihao-loader';

  if (!document.querySelector('#nihao-loader')) {
    document.querySelector('body').appendChild(loader)
  }

  await chrome.storage.local.set({
    sharingFacebookStatus: false,
    sharingTwitterStatus: false,
    sharingVkStatus: false,
    sharingLinkedInStatus: false,
    sharingPinterestStatus: false,
  })

  if (!window.location.href.includes('https://zigi.be/')) {
    alert('Bot will only work on Zigi.be :)')
    return
  }
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const setRerunVar = async (value) => {
    chrome.storage.local.set({
      value,
    })
  }

  const CS = await chrome.storage.local.get([
    'facebookStatus',
    'twitterStatus',
    'linkedInStatus',
    'pinterestStatus',
    'vkStatus',
    'posts',
  ])

  const postInterval = setInterval(async () => {
    const post = [
      ...document.querySelector('.js_posts_stream')?.querySelector('ul')
        .children,
    ].filter((item) => !item.getAttribute('shared'))[0]
    const {
      sharingFacebookStatus,
      sharingTwitterStatus,
      sharingLinkedInStatus,
      sharingVkStatus,
      sharingPinterestStatus,
    } = await chrome.storage.local.get([
      'sharingFacebookStatus',
      'sharingTwitterStatus',
      'sharingLinkedInStatus',
      'sharingVkStatus',
      'sharingPinterestStatus',
    ])
    if (
      post &&
      !sharingFacebookStatus &&
      !sharingTwitterStatus &&
      !sharingLinkedInStatus &&
      !sharingVkStatus &&
      !sharingPinterestStatus
    ) {
      post.setAttribute('shared', 'true')

      if (CS.facebookStatus) {
        console.log('Sharing on Facebook')
        chrome.storage.local.set({
          sharingFacebookStatus: true,
        })
        const facebookUrl = post.querySelector('a.btn-facebook')
        if (CS.posts && CS.posts.length) {
          const found = CS.posts.find((p) => p.postUrl === facebookUrl.href)
          if (found && found.facebook == true) {
            return
          }
        }
        facebookUrl.click()
        await sleep(2000)
        setRerunVar('facebook')
      }

      if (CS.twitterStatus) {
        console.log('Sharing on Twitter')
        chrome.storage.local.set({
          sharingTwitterStatus: true,
        })
        const twitterUrl = post.querySelector('a.btn-twitter')
        if (CS.posts && CS.posts.length) {
          const found = CS.posts.find((p) => p.postUrl === twitterUrl.href)
          if (found && found.twitter == true) {
            return
          }
        }
        twitterUrl.click()
        await sleep(2000)
        setRerunVar('twitter')
      }

      if (CS.vkStatus) {
        console.log('Sharing on VK')
        chrome.storage.local.set({
          sharingVkStatus: true,
        })
        const VkUrl = post.querySelector('a.btn-vk')
        if (CS.posts && CS.posts.length) {
          const found = CS.posts.find((p) => p.postUrl === VkUrl.href)
          if (found && found.vk == true) {
            return
          }
        }
        VkUrl.click()
        await sleep(2000)
        setRerunVar('vk')
      }

      if (CS.linkedInStatus) {
        console.log('Sharing on LinkedIn')
        const linkedIn = post.querySelector('a.btn-linkedin')
        chrome.storage.local.set({
          sharingLinkedInStatus: true,
        })

        if (CS.posts && CS.posts.length) {
          const found = CS.posts.find((p) => p.postUrl === linkedIn.href)
          if (found && found.linkedIn == true) {
            return
          }
        }
        linkedIn.click()
        await sleep(2000)
        setRerunVar('linkedin')
      }

      if (CS.pinterestStatus) {
        console.log('Sharing on Pinterest')
        chrome.storage.local.set({
          sharingPinterestStatus: true,
        })
        const pinterestUrl = post.querySelector('a.btn-pinterest')
        if (CS.posts && CS.posts.length) {
          const found = CS.posts.find((p) => p.postUrl === pinterestUrl.href)
          if (found && found.pinterest == true) {
            return
          }
        }
        pinterestUrl.click()
        await sleep(2000)
        setRerunVar('linkedIn')
      }

      await sleep(2000)
    } else if (!post) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, 5000)
})()

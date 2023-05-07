chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension Installed')
})

const getCurrentTabId = async () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      resolve(tabs[0].id)
    })
  })
}

const addTabId = async (tabId) => {
  chrome.storage.local.set({
    tabId,
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (
      tab.url.includes('https://www.facebook.com/sharer.php') &&
      tab.url.includes('zigi.be')
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['scripts/facebook-share.js'],
        },
        () => {
          console.log('Ran Facebook Script')
        },
      )
    } else if (
      tab.url.includes('https://twitter.com/intent/tweet') &&
      tab.url.includes('zigi.be')
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['scripts/twitter-share.js'],
        },
        () => {
          console.log('Ran Twitter Script')
        },
      )
    } else if (
      tab.url.includes('https://www.linkedin.com/sharing/share-offsite') &&
      tab.url.includes('zigi.be')
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['scripts/linkedIn-share.js'],
        },
        () => {
          console.log('Ran LinkedIn Script')
        },
      )
    } else if (
      tab.url.includes('https://www.pinterest.com/pin/create/button') &&
      tab.url.includes('zigi.be')
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['scripts/pinterest-share.js'],
        },
        () => {
          console.log('Ran Pinteret Script')
        },
      )
    } else if (
      tab.url.includes('https://vk.com/share.php') &&
      tab.url.includes('zigi.be')
    ) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['scripts/vk-share.js'],
        },
        () => {
          console.log('Ran VK Script')
        },
      )
    }
  }
})

chrome.runtime.onMessage.addListener((request, sender) => {
  const { url } = request
  if (request.message == 'SAVE_TAB_ID') {
    ;(async () => {
      const tabId = await getCurrentTabId()
      await addTabId(tabId)
    })()
  } else if (request.message == 'FACEBOOK_SHARE') {
    chrome.windows.getAll({ populate: true, windowTypes: ['popup'] }, function (
      windows,
    ) {
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          //collect all of the urls here, I will just log them instead
          console.log(tab.url)
          if (tab.url === request.url) {
            setTimeout(() => {
              chrome.scripting.executeScript(
                {
                  target: { tabId: newTab.id },
                  files: ['scripts/facebook-share.js'],
                },
                (res) => {
                  console.log('Executed Script')
                },
              )
            }, 2000)
          }
        })
      })
    })
  } else if (request.message == 'LINKEDIN_SHARE') {
    chrome.windows.create(
      {
        url,
        state: 'minimized',
        width: 950,
        height: 775,
        type: 'popup',
      },
      ({ tabs: [newTab] }) => {
        setTimeout(() => {
          chrome.scripting.executeScript(
            {
              target: { tabId: newTab.id },
              files: ['scripts/linkedin-share.js'],
            },
            (res) => {
              console.log(res)
              console.log('Executed Script')
            },
          )
        }, 2000)
      },
    )
  } else if (request.message == 'VK_SHARE') {
    chrome.windows.create(
      {
        url,
        state: 'minimized',
        width: 950,
        height: 775,
        type: 'popup',
      },
      ({ tabs: [newTab] }) => {
        setTimeout(() => {
          chrome.scripting.executeScript(
            {
              target: { tabId: newTab.id },
              files: ['scripts/vk-share.js'],
            },
            (res) => {
              console.log(res)
              console.log('Executed Script')
            },
          )
        }, 2000)
      },
    )
  } else if (request.message == 'PINTEREST_SHARE') {
    chrome.windows.create(
      {
        url,
        state: 'minimized',
        width: 950,
        height: 775,
        type: 'popup',
      },
      ({ tabs: [newTab] }) => {
        setTimeout(() => {
          chrome.scripting.executeScript(
            {
              target: { tabId: newTab.id },
              files: ['scripts/pinterest-share.js'],
            },
            (res) => {
              console.log(res)
              console.log('Executed Script')
            },
          )
        }, 2000)
      },
    )
  } else if (request.message == 'TWITTER_SHARE') {
    chrome.windows.create(
      {
        url,
        state: 'minimized',
      },
      ({ tabs: [newTab] }) => {
        setTimeout(() => {
          chrome.scripting.executeScript(
            {
              target: { tabId: newTab.id },
              files: ['scripts/twitter-share.js'],
            },
            (res) => {
              console.log(res)
              console.log('Executed Script')
            },
          )
        }, 2000)
      },
    )
  } else if (request.message == 'RERUN') {
    chrome.storage.local.get(['tabId'], (CS) => {
      setTimeout(() => {
        chrome.scripting.executeScript(
          {
            target: { tabId: CS.tabId },
            files: ['scripts/bot-script.js'],
          },
          (res) => {
            console.log(res)
            console.log('Executed Script')
          },
        )
      }, 10000)
    })
  } else if (request.message == 'CLOSE_WINDOW') {
    setTimeout(() => {
      chrome.windows.remove(sender.tab.windowId)
      console.log('Window Removed!')
    }, 3000)
  }
})

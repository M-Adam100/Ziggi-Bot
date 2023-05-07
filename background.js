chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension Installed')
})

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


document.querySelector('button#launch-bot').addEventListener('click', () => {

    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        const currentTab = tabs[0];
        chrome.storage.local.set({
          tabId: currentTab.id
        })
        chrome.scripting.executeScript(
            {
              target: {tabId: currentTab.id},
              files: ['scripts/bot-script.js'],
            },
            () => { console.log("RAN-Category-Pages") });
    });
})

chrome.storage.local.get(['facebookStatus', 'twitterStatus', 'linkedInStatus', 'pinterestStatus', 'vkStatus'], (data) => {
  document.querySelector('input#facebook').checked = data?.facebookStatus;
  document.querySelector('input#twitter').checked = data?.twitterStatus;
  document.querySelector('input#pinterest').checked = data?.pinterestStatus;
  document.querySelector('input#linkedIn').checked = data?.linkedInStatus;
  document.querySelector('input#vk').checked = data?.vkStatus;

})

document.querySelector('input#facebook').addEventListener('change', (e) => {
  chrome.storage.local.set({facebookStatus: e.target.checked})
})
document.querySelector('input#twitter').addEventListener('change', (e) => {
  chrome.storage.local.set({twitterStatus: e.target.checked})
})
document.querySelector('input#linkedIn').addEventListener('change', (e) => {
  chrome.storage.local.set({linkedInStatus: e.target.checked})
})
document.querySelector('input#pinterest').addEventListener('change', (e) => {
  chrome.storage.local.set({pinterestStatus: e.target.checked})
})
document.querySelector('input#vk').addEventListener('change', (e) => {
  chrome.storage.local.set({vkStatus: e.target.checked})
})


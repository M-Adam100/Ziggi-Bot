chrome.runtime.onInstalled.addListener(async () => {
    console.log("Extension Installed")
});

chrome.runtime.onMessage.addListener((request, message) => {
    console.log(request);
    if (request.message == 'FACEBOOK_SHARE') {
        chrome.tabs.create({url: request.url, active: false}, (tab => {
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tab.id},
                      files: ['scripts/facebook-share.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 5000);
        }));
    }
    else if (request.message == 'LINKEDIN_SHARE') {
        chrome.tabs.create({url: request.url, active: false}, (tab => {
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tab.id},
                      files: ['scripts/linkedIn-share.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 5000);
        }));
    } else if (request.message == 'VK_SHARE') {
        chrome.tabs.create({url: request.url, active: false}, (tab => {
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tab.id},
                      files: ['scripts/vk-share.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 5000);
        }));
    }
    else if (request.message == 'PINTEREST_SHARE') {
        chrome.tabs.create({url: request.url, active: false}, (tab => {
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tab.id},
                      files: ['scripts/pinterest-share.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 5000);
        }));
    }

    else if (request.message == 'TWITTER_SHARE') {
        chrome.tabs.create({url: request.url, active: false}, (tab => {
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tab.id},
                      files: ['scripts/twitter-share.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 5000);
        }));
    }
    else if (request.message == 'RERUN') {
        chrome.storage.local.get(['tabId'], CS => { 
            setTimeout(() => {
                chrome.scripting.executeScript(
                    {
                      target: {tabId: CS.tabId},
                      files: ['scripts/bot-script.js']
                    },
                    (res) => { console.log(res); console.log("Executed Script")});
            }, 10000)
          
        })
       
    }
})



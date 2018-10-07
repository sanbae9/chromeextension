chrome.runtime.onInstalled.addListener(function() {
    if (!chrome.storage.sync.get(['wordlist'], () => {})) {
        chrome.storage.sync.set({'wordlist': []}), () => {
            console.log("Initializing empty english word list.");
        }
    }
    if (!chrome.storage.sync.get(['translist'], () => {})) {
        chrome.storage.sync.set({'translist': []}), () => {
            console.log("Initializing empty translated word list.");
        }
    }

})



let tempWords = [];
let tempTranslations = [];

chrome.storage.sync.get(['wordlist'], (e) => {
    tempWords = e.wordlist;
    console.log("Loaded existing list: " + tempWords);
});

chrome.storage.sync.get(['translist'], (e) => {
    tempTranslations = e.translist;
    console.log("Loaded existing list: " + tempTranslations);
});


window.onload = function() {
    // Alerts user of list of words;
    document.getElementById('showlistofwords').onclick = function() {
        if (tempWords.length == 0) {
            alert("You aren't replacing any words. Fill in the boxes and click submit to add some!");
        } else {
            alert("You are currently replacing these words: " + tempWords)
        }
    }

    // Clears the stored list. 
    document.getElementById('clearwords').onclick = function() {
        tempWords = [];
        tempTranslations = [];
        chrome.storage.sync.set({'wordlist': tempWords}), () => {
            console.log("Initializing empty english word list.");
        }
        chrome.storage.sync.set({'translist': tempTranslations}, () => {
            console.log("Initializing empty translations list.");
        })
        alert("You have successfully cleared your words list.")
    }
    document.getElementById('newWordSubmission').onclick = function() {
        if (document.getElementById("english_word").value != "") {
            if (document.getElementById("foreign_word").value != "") {
                var word = document.getElementById("english_word").value;
                var translation = document.getElementById("foreign_word").value;
                // Appending new values to old list. 
                tempWords[tempWords.length] = word;
                tempTranslations[tempTranslations.length] = translation;
                // Updating stored list of words and translations.
                chrome.storage.sync.set({'wordlist': tempWords}, () => {
                    console.log("Updating wordlist..");
                })
                chrome.storage.sync.set({'translist': tempTranslations}, () => {
                    console.log("Updating translist...");
                })
                // Notification and resetting of text boxes. 
                alert("You have successfully added " + word + " to the list!");
                document.getElementById("english_word").value = "";
                document.getElementById("foreign_word").value = "";

            } else {
                alert("No submission for translation.")
            }
        } else {
            alert("No submission for english word.")
        }

    }
}

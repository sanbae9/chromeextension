
var elements = document.getElementsByTagName('*');

// chrome.storage.sync.get(['wordlist'], (e) => {
//     words = e.wordlist;
// });
// chrome.storage.sync.get(['translist'], (e) => {
//     translations = e.translist;
// });

function getWords() {
    var words = [];
    chrome.storage.sync.get(['wordlist'], function(e) {
        words = e.wordlist;
    });
    return words;
}

function getTranslations() {
    var translations = [];
    chrome.storage.sync.get(['translist'], function(e) {
        words = e.wordlist;
    });
    return translations;
}

// words = ["banana", "apple"];
// translations = ["plátano", "manzana"];

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
        // We are now looping through every element and child node on the document. 
        var node = element.childNodes[j];
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            for (var k = 0; k < getWords.length; k++) {
                if (text.toLowerCase() === getWords[k].toLowerCase()) {
                    var newText = text.replace(text, capsIfNeeded(text, getTranslations()[k]));
                    element.replaceChild(document.createTextNode(newText), node);
                }
            }

        }
    }
}

function capsIfNeeded(p1, p2) {
    if (p1.charAt(0) === p1.charAt(0).toUpperCase()) {
        return capitalize(p2);
    } else {
        return p2;
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO
// Highlight replaced words
// Make them clickable/link to google translate? 
// On/off by clicking the icon. 
// Fix stored list...



var elements = document.getElementsByTagName('*');

function script() {
    chrome.storage.sync.get(['wordlist'], function (e) {
        chrome.storage.sync.get(['translist'], function (v) {
            words = e.wordlist;
            console.log(words);
            translations = v.translist;
            console.log(translations);

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                for (var j = 0; j < element.childNodes.length; j++) {
                    // We are now looping through every element and child node on the document. 
                    var node = element.childNodes[j];
                    if (node.nodeType === 3) {
                        var text = node.nodeValue;
                        for (var k = 0; k < words.length; k++) {
                            if (text.toLowerCase() === words[k].toLowerCase()) {
                                var newText = text.replace(text, capsIfNeeded(text, translations[k]));
                                element.replaceChild(document.createTextNode(newText), node);
                            }
                        }

                    }
                }
            }
        });
    });
}

script();


// Helper Functions // ~~~~~~~~~~~~

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


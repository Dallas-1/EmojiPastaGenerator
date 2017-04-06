var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

var fs = require('fs');
var emojiDB = JSON.parse(fs.readFileSync('emojiDB.json', 'utf8'));

function lookupEmoji(word) {
    let emojiResults =  emojiDB[word];

    if(emojiResults !== undefined){
        return Object.keys(emojiResults).reduce(function(a, b){ return emojiResults[a] > emojiResults[b] ? a : b });
    }else{
        return undefined;
    }
}

function cleanWord(word){
    return word.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "").replace(/\r?\n|\r/g, "").replace(/\s{2,}/g, " ").toLowerCase(); //remove double and above spaces //remove new lines //remove punctuation
}

app.get('/parse', function (req, res) {
    console.log("Parse");
    let textA = req.query.text.split(' ');
    let newText = "";
    for (var wordPos in textA) {
        let emojiResult = lookupEmoji(cleanWord(textA[wordPos]));
        if (emojiResult !== undefined) {
            newText += textA[wordPos] + " " + emojiResult + " ";
        } else { 
            newText += textA[wordPos] + " ";
        }
    }
    res.json({ newText: newText });
});

app.listen(2345, function () {
    console.log("API Listening on 2345");
});

var snoowrap = require('snoowrap');
var jsonfile = require('jsonfile');
var fs = require('fs');
var emojiStrip = require('emoji-strip');

var redditAPI = jsonfile.readFileSync('redditAPI.json');

var jsonMongoRep = {};

function parsePost(dataIn) {
    var dataNoPunch = dataIn.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, ""); //remove punctuation
    var dataNoNL = dataNoPunch.replace(/\r?\n|\r/g, "");//remove new lines
    var data = dataNoNL.replace(/\s{2,}/g, " "); //remove double and above spaces

    var spaces = [0];
    var emojis = [];
    let s = [...data.toLowerCase()] //space out the data as characters
    var lastWasEmoji;
    //step through characters
    for (var i = 0, len = s.length; i < len; i++) {
        //if emoji
        if (isEmoji(s[i])) {
            emojis.push(i);
            if (!lastWasEmoji) {
                lastWasEmoji = true;
                var word = "";
                var emoji = s[i];
                //step back to last space
                var lastSpacePos;
                var endOfWord;
                //
                if (spaces[spaces.length - 1] === i - 1) {
                    lastSpacePos = spaces[spaces.length - 2] + 1;
                    endOfWord = i - 1;
                } else {
                    endOfWord = i;
                    lastSpacePos = spaces[spaces.length - 1] + 1;
                }

                if (emojis[emojis.length - 2] > lastSpacePos) {
                    lastSpacePos = emojis[emojis.length - 2] + 1;
                }
                for (var w = lastSpacePos; w < endOfWord; w++) {
                    //todo db
                    word += s[w];
                }
                //Should strip emojis off the words if they slip through
                word = emojiStrip(word);
                if (word !== "") {
                    //DB
                    if (jsonMongoRep.hasOwnProperty(word)) {
                        if (jsonMongoRep[word].hasOwnProperty(emoji)) {
                            jsonMongoRep[word][emoji] = jsonMongoRep[word][emoji] + 1;
                        } else {
                            jsonMongoRep[word][emoji] = 1;
                        }
                    } else {
                        jsonMongoRep[word] = {};
                        jsonMongoRep[word][emoji] = 1;
                    }
                }
            }
        } else if (isSpace(s[i])) {
            //else if space
            //push spaces
            spaces.push(i);
            lastWasEmoji = false;

        } else {
            lastWasEmoji = false;
        }
    }
}

function incDBWordEmoji(word, emoji) {

}

function isSpace(str) {
    if (str === ' ') {
        return true;
    } else {
        return false;
    }
}

function isEmoji(str) {
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}



///////////////////////////////////// F

function processPosts(data) {
    var startTime = new Date().getTime();
    var count = 0;
    for(var i =0 ; i < data.length;i++){
        if (data[i].hasOwnProperty('selftext')) {
            parsePost(data[i].selftext);
            count++;
        }
    }
    jsonfile.writeFile('emojiDB.json', jsonMongoRep, function (err) { });
    var endTime = new Date().getTime();

    var totalTime = (endTime - startTime) / 1000;
    console.log("Complete Took : " + totalTime + " Seconds");
    console.log("Processed : " + count + " Emoji Cancers");

    if(count === 999){
        fs.createReadStream('emojiDB.json').pipe(fs.createWriteStream('../Server/emojiDB.json'));//After we process them send them to the server folder //todo config option
    }else{
        //todo we should probs log this .... ah well later
    }
}

const r = new snoowrap(redditAPI);

r.getTop('emojipasta', { time: 'all', limit: 1000 }).then(processPosts);
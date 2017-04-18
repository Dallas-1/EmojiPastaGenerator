//Hide the emoji input
$(document).ready(function () {
            $("#emojiInput").emojioneArea();
        });
        /*
        Not working yet
$(function () {
    $('textarea[name="emojiInput"]').hide();

    //show it when the checkbox is clicked
    $('input[name="eBetween"]').on('click', function () {
        if ($(this).prop('checked')) {
            $('textarea[name="emojiInput"]').fadeIn();
        } else {
            $('textarea[name="emojiInput"]').hide();
        }
    });
});*/

//Text box autosize
$(function () {
        $('.normal').autosize();
        $('.animated').autosize({ append: "\n" });
    });
function convertToEmojiPasta(s, callback) {
    $.get("http://emojipasta.co:2345/parse/", { text: s }, function (data, status) {
        callback(data.newText);
    });
}

function convertToEmoji(s, emoji, callback) {
    let textA = s.split(" ");
    let newText = "";
    for (var wordPos in textA) {
        newText += textA[wordPos] + " " + emoji + " ";
    }
    callback(newText);
}

function CopyToClipboard(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("Copy");

    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("Copy");
    }
}


//Button attachments
$('#submit').on('click', function () {
    if (document.getElementById('eBetween').checked) {
        convertToEmoji($('#text').val(),$('#emojiInput').val(), function (returnedClap) {
            document.getElementById("output").innerHTML = returnedClap;
        });
    } else {
        convertToEmojiPasta($('#text').val(), function (returnedEmojiPasta) {
            document.getElementById("output").innerHTML = returnedEmojiPasta;
        });
    }
})



function convertToEmojiPasta(s, callback) {
    $.get("http://emojipasta.co:2345/parse/", { text: s }, function (data, status) {
        callback(data.newText);
    });
}

function convertToClap(s, callback) {
    let textA = s.split(" ");
    let newText = "";
    for (var wordPos in textA) {
        newText += textA[wordPos] + " 👏 ";
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
    var $btn = $(this).button('🔥🔥🔥🔥💯💯👅');
    if (document.getElementById('clap').checked) {
        convertToClap($('#text').val(), function (returnedClap) {
            document.getElementById("output").innerHTML = returnedClap;
            $btn.button('reset');
        });
    } else {
        convertToEmojiPasta($('#text').val(), function (returnedEmojiPasta) {
            document.getElementById("output").innerHTML = returnedEmojiPasta;
            $btn.button('reset');
        });
    }
})

//Text box autosize
$(function () {
    $('.normal').autosize();
    $('.animated').autosize({ append: "\n" });
});
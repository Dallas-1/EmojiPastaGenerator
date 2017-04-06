function convertToEmojiPasta(s, callback) {
    console.log("Convert");
    $.get("http://emojipasta.co:2345/parse/", { text: s }, function (data, status) {
        callback(data.newText);
    });
}

$(function () {
    $('.normal').autosize();
    $('.animated').autosize({ append: "\n" });
});
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
$('#submit').on('click', function () {
    var $btn = $(this).button('🔥🔥🔥🔥💯💯👅');
    convertToEmojiPasta($('#text').val(), function (returnedEmojiPasta) {
        document.getElementById("output").innerHTML = returnedEmojiPasta;
        $btn.button('reset');
    });
})
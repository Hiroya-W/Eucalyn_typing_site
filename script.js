var p_word = document.getElementById("word");
var p_roma = document.getElementById("roma");
var checkTexts = [];
var json;
var word_data;

queryGistAsync("cbbbd01c63e4fb3db6da217dedf9db3f", function (gist) {
    // gist.files[ファイル名].content にファイルの内容が入ってる
    console.log(gist.files["typing-data"].content);
    json = gist.files["typing-data"].content;
    word_data = JSON.parse(json);
    createText();
});

function createText() {
    // var rnd = Math.floor(Math.random() * textLists.length);
    var rnd = Math.floor(Math.random() * word_data.length);

    p_roma.textContent = "";
    p_word.textContent = word_data[rnd]["word"];
    // checkTexts = textLists[rnd].split('').map(function (value) {
    checkTexts = word_data[rnd]["roma"].split('').map(function (value) {
        var span = document.createElement("span");
        span.textContent = value;
        p_roma.appendChild(span);
        return span;
    });
    checkTexts[0].classList.add("input");
    var key = checkTexts[0].textContent;
    var div = document.getElementById(key);
    if (div != null) {
        div.classList.add("next-key");
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (e.key == checkTexts[0].textContent) {
        checkTexts[0].classList.add("done");
        if (checkTexts[0].classList.contains("input")) {
            checkTexts[0].classList.remove("input");
        }

        var key = checkTexts[0].textContent;
        var div = document.getElementById(key);
        if (div != null && div.classList.contains("next-key")) {
            div.classList.remove("next-key");
        }

        checkTexts.shift();

        if (!checkTexts.length) {
            createText();
        }
        else {
            checkTexts[0].classList.add("input");

            var key = checkTexts[0].textContent;
            var div = document.getElementById(key);
            if (div != null) {
                div.classList.add("next-key");
            }
        }
    }
    var key = e.key;
    var div = document.getElementById(key);
    if (div != null) {
        div.classList.add("key-pressed");
    }
}

function keyUp(e) {
    var key = e.key;
    var div = document.getElementById(key);
    if (div != null) {
        div.classList.remove("key-pressed");
    }
}

function queryGistAsync(gid, callback) {
    $.ajax({
        type: "GET",
        url: "https://api.github.com/gists/" + gid,
        dataType: "jsonp",
        success: function (json) {callback(json.data);}
    });
}

var input_off = function () {
    checkTexts[0].classList.remove("input");
}

var input_on = function () {
    checkTexts[0].classList.add("input");
    setTimeout(input_off, 500);
}

setInterval(input_on, 1000);

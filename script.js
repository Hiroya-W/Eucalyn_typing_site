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
    key = eucalyn2qwerty[key];
    var div = document.getElementById(key);
    if (div != null) {
        div.classList.add("next-key");
    }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    var key = qwerty2eucalyn[e.key];
    if (key == checkTexts[0].textContent) {
        checkTexts[0].classList.add("done");
        if (checkTexts[0].classList.contains("input")) {
            checkTexts[0].classList.remove("input");
        }

        var key = checkTexts[0].textContent;
        key = eucalyn2qwerty[key];
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
            key = eucalyn2qwerty[key];
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

var qwerty2eucalyn = {
    "q": "q",
    "w": "w",
    "e": ",",
    "r": ".",
    "t": ";",
    "y": "m",
    "u": "r",
    "i": "d",
    "o": "y",
    "p": "p",
    "a": "a",
    "s": "o",
    "d": "e",
    "f": "i",
    "g": "u",
    "h": "g",
    "j": "t",
    "k": "k",
    "l": "s",
    ";": "n",
    "z": "z",
    "x": "x",
    "c": "c",
    "v": "v",
    "b": "f",
    "n": "b",
    "m": "h",
    ",": "j",
    ".": "l"
}

var eucalyn2qwerty = {
    "q": "q",
    "w": "w",
    ",": "e",
    ".": "r",
    ";": "t",
    "m": "y",
    "r": "u",
    "d": "i",
    "y": "o",
    "p": "p",
    "a": "a",
    "o": "s",
    "e": "d",
    "i": "f",
    "u": "g",
    "g": "h",
    "t": "j",
    "k": "k",
    "s": "l",
    "n": ";",
    "z": "z",
    "x": "x",
    "c": "c",
    "v": "v",
    "f": "b",
    "b": "n",
    "h": "m",
    "j": ",",
    "l": "."
}

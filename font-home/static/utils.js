function json_cp(str) {
    return JSON.parse(JSON.stringify(str));
}

function json_parse(array) {
    return JSON.parse(array);
}

function json1(array) {
    return JSON.parse(array);
}

function json_string(array) {
    return JSON.stringify(array);
}

function post1(str, params, callback) {
    return $.post(str, params, callback)
}

function get1(str, params, callback) {
    return $.get(str, params, callback)
}

function goto(url) {
    document.location.href = url;
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    // console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    // console.info(document.cookie);
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//清除cookie
function clearCookie(key) {
    this.setCookie(key, "", -1);
}

function checkCookie() {
    var user = this.getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            this.setCookie("username", user, 365);
        }
    }
}
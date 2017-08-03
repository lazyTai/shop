var express = require('express');
var router = express.Router();

function message(success, message) {

    return {
        success: success,
        message: message
    }
}

function routermap(str, callback) {
    router.get(str, callback);
    router.post(str, callback);
}

module.exports = {
    message: message,
    routermap: routermap
}
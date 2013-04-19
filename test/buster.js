var config = module.exports;
var fs = require("fs");

config["messengerTests"] = {
    env: "browser",
    rootPath: "../",
    sources: [
        "messenger.js"
    ],
    tests: [
        "test/*-test.js"
    ]
};

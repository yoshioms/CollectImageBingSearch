var request = require('request');
var qs = require('querystring');
var fs = require('fs');
var fetch = require('node-fetch');
var path = require('path');
var config = require('./config.js')

var searchWord = '三田友梨佳';
var folder = "Mita"

imageSearch(searchWord)

function saveImage(contentUrl) {
    fetch(contentUrl).then((response) => {
        var dest = fs.createWriteStream('./' + folder + '/' + path.basename(contentUrl));
        response.body.pipe(dest);
    });
}

function imageSearch(searchWord) {
    console.log(config)

    return fetch("https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + qs.escape(searchWord) + "&&mkt=ja-jp", {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': config.SubscriptionKey
        }
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json)
        json.value.forEach((value) => {
            saveImage(value.contentUrl)
        })
        return json;
    }).catch((error) => {
        console.log(error)
    })
}
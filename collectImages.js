var request = require('request');
var qs = require('querystring');
var fs = require('fs');

var searchWord = '桐谷美玲';

var queryParams = {
    Query: "'" + searchWord + "'"
}

var requestOptions = {
    url: 'https://api.datamarket.azure.com/Bing/Search/v1/Image?' + qs.stringify(queryParams) + "&$format=json",
    json: true,
    method: 'get',
    'auth':{
        'user': '',
        'pass': '<Bing Search API KEY>'
    }
}

request(requestOptions, function(err, res, body) {
    console.log(body);
        for(var index in body.d.results) {
            saveImage(index, body.d.results[index]);
        }
    }
);

function saveImage(index, result) {
    request.get(result.MediaUrl)
    .on('response', function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('content-length: ', res.headers['content-length']);
    })
    .pipe(fs.createWriteStream('./images' + index + '.jpg'));
}
// Config
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

app.set('port', definePort());
server.listen(definePort());

// Router
app.get('/', function (request, response) {
    response.setHeader('Content-type', 'text/html');
    response.sendFile('./index.html', {root: __dirname });
    response.status('200');
});

app.get('/get', function (request, response) {
    response.setHeader('Content-type', 'application/json');
    response.end(JSON.stringify(require('./data.json')));
    response.status('200');
});

app.get('/get/:id', function (request, response) {
    response.setHeader('Content-type', 'application/json');
    var data = (getById(require('./data.json'), request.params.id));
    if(data == undefined){
        response.end('Not Found');
        response.status('404');
    }else{
        response.end(data);
        response.status('200');
    }
});

// functions
function definePort() {
    if (process.env.PORT == undefined) {
        return '3000';
    } else {
        return process.env.PORT;
    }
};

function getById(data, id) {
    for (i in data) {
        if (data[i].Id == id) {
            var filteredData = data[i];
            break;
        }
    }
    return JSON.stringify(filteredData);
};
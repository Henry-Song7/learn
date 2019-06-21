var express = require('express');
var app = express();

var allHeaderMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); 
};

app.use(allHeaderMiddleware);

app.get("/data", (req, res) => {
    let data = require("./db.json");
    res.send(data);
    // res.send('ok')   
})


app.get("/users", (req, res) => {
    let users = [{name:'jack',age:33},{name:'jack',age:33},{name:'jack',age:33}]
    res.send(users);
})

var server = app.listen( 4000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("访问成功 http://%s:%s " , host, port) 
})


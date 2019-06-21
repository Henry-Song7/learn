const http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');//引入body-parser用于解析post的body

app.use(bodyParser.json());//使用body-parser用于解析post的body
app.use(bodyParser.urlencoded({extended: true}));//使用body parser用于解析post的body

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(express.static('public'));

//接收POST请求
app.post('/password', function(req, res) {
  let data = req.body;
  console.log(data);
  let message1 = {success: true}
  let message2 = {success: false}
  let userName = data.userName;
  let userPwd = data.userPwd;
  //判断并返回结果
  if( userName == "admin" && userPwd == "123456") {
    res.send(message1)
  }else{
    res.send(message2)
  }
});

app.get("/data", (req, res) => {
  let data = require("../mock/db.json");
  res.send(data);
  // res.send('ok')   
})
app.post("/user", (req, res) => {
  let data = req.body;
  console.log(data);
  let user = require("../mock/db.json");
  res.send(user);
})

app.get("/test", (req, res) => {
  let users = [{name:'jack',age:33},{name:'jack',age:33},{name:'jack',age:33}]
  res.send(users);
})

var server = app.listen(8001, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("访问地址 http://%s:%s", host, port)
})




//111111111111111111111111111
// var express = require('express')
// var app = express()
// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now()
//   next()
// }
// app.use(requestTime)
// app.get('/', function (req, res) {
//   var responseText = 'Hello World!<br>'
//   responseText += '<small>Requested at: ' + req.requestTime + '</small>'
//   res.send(responseText)
// })
// app.listen(8000)

//22222222222222222222222222222
/* var express = require('express');
const cookieParser = require('cookie-parser');
var app = express();

app.listen(8000);
// app.use(cookieParser('这段签名的字符串可以是随意的'));

app.get('/', function(req, res, next) {
  res.cookie('name', 'Luane Pine', {
    path: '/user',//访问哪一个路径的时候我们给你加上cookie
    maxAge: 20*60*1000 //cookie的存活时间,单位毫秒(现在不能获取，需要用cookie-parser)
  });
  res.send('ok');
}); */


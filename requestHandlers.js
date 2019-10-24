//请求处理程序
var url = require("url");  //引入url模块
var querystring = require('querystring');  //querystring.parse()用于将一个字符串反序列化为一个对象
var database = require("./link");  //引入数据库操作函数

function start(request,response) {  
    //console.log("Request handler 'start' was called."); 
    var params = url.parse(request.url, true).query;  
    //parse将字符串转成对象,request.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，
    //false表示params是url=123&name=321
    response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
    }); 
    if(params.username == 'admin'&& params.password == '123456') { 
         database.searchStart.then(res => {  //database.searchStart为一个promise对象
            var result = res;
            var respBody = {
                respCode:'1111',
                respDesc:'start返回成功',
                respData:result
            }
            response.write(JSON.stringify(respBody));  
            response.end();
         }).catch(err => {
             console.log(err);
         });
    } else {
        var respBody = {
            respCode:'0000',
            respDesc:'用户名或密码错误'
        }
        response.write(JSON.stringify(respBody));  
        response.end();
    }

}

function upload(request,response) {  
    //console.log(request);
    //console.log("Request handler 'upload' was called.");
    //request.setEncoding('binary');
    response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
    }); 
    var reqBody = '';
    request.on('data',function(chunk) {  //post请求接收请求参数
        reqBody += chunk;
    });
   request.on('end',function() {
        //解析参数
        reqBody = querystring.parse(reqBody);  //将一个字符串反序列化为一个对象
        if(reqBody.username && reqBody.password) {
            database.searchUpload.then(res => {  //database.searchUpload为一个promise对象
                var result = res;
                var respBody = {
                    respCode:'1111',
                    respDesc:'upload返回成功',
                    respData:{
                      data:result
                    }
                } 
                response.write(JSON.stringify(respBody));  
                response.end();
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            var respBody = {
                respCode:'0000',
                respDesc:'用户名或密码为空'
            }
            response.write(JSON.stringify(respBody));  
            response.end();
        }
    });  
}
function getContent(request,response) {
    response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
    }); 
    var reqBody = '';
    request.on('data',function(chunk) {  //post请求接收请求参数
        reqBody += chunk;
    });
    request.on('end',function() {
        reqBody = querystring.parse(reqBody);  //将一个字符串反序列化为一个对象
        if(reqBody.author == '情云朵朵') {
            database.getContent.then(res => {  //database.searchUpload为一个promise对象
                var result = res;
                var respBody = {
                    respCode:'1111',
                    respDesc:'getContent返回成功',
                    respData:{
                      data:result
                    }
                } 
                response.write(JSON.stringify(respBody));  
                response.end();
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            var respBody = {
                respCode:'0000',
                respDesc:'用户不存在'
            }
            response.write(JSON.stringify(respBody));  
            response.end();
        }
    })
}
exports.start = start;
exports.upload = upload;
exports.getContent = getContent;
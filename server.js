var http = require("http");  //引入nodejs的http模块
var url = require("url");  //引入url模块

//当服务器收到一个请求的时候，这个参数函数就会被调用，这是个回调函数
function startServer(route,handle) {
    function onRequest(request, response) { 
        response.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Origin,Access-Control-Max-Age");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        response.setHeader("Access-Control-Max-Age","1800");

        var pathname = url.parse(request.url).pathname;  //把/start取出来
        route(handle,pathname,request,response);   //把/start传入route中，将response对象传入route，在route中对浏览器做出响应

        //console.log("Request received.");  
    }
    http.createServer(onRequest).listen(8888);  //http的createServer创建一个服务器，监听8888端口
}

exports.startServer = startServer;
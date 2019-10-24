function route(handle,pathname,request,response,link) {  
    //console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {    //首先检查给定的路径对应的请求处理程序是否存在  
        handle[pathname](request,response);   //如果存在的话直接调用相应的函数
    } else {    
        //console.log("No request handler found for " + pathname); 
        response.writeHead(404, {"Content-Type": "text/plain"});    
        response.write("404 Not found");    
        response.end();
     }
}
exports.route = route;
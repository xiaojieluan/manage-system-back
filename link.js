//该文件连接数据库
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'articleInfo'
  });
  connection.connect();  //创建一个connection，连接数据库

  function searchDatabase(sql) {
    var promise = new Promise(function(resolve,reject) {
        connection.query(sql,function(err, results) {
            if (results) {
                resolve(results);
            }
            if (err) {
                console.log(err);
            }
            //connection.end();
        }
      );
    }).then(function (res) {
        return res;  // success  成功，将结果return
     }, function (value) {
         // failure  失败操作
         console.log(value);
     });
      return promise;
  }

//   function searchStart() {
//     return searchDatabase("select * from articleInfo");
//   }
//   function searchUpload() {
//     return searchDatabase("select author from articleInfo where postId=1");
//   }

 exports.searchStart = searchDatabase("select * from articleInfo");
 exports.searchUpload = searchDatabase("select * from articleInfo where postId=1");
 exports.getContent = searchDatabase('select * from articleInfo where upNum=11');

 //exports.searchStart = searchStart;
 //exports.searchUpload = searchUpload;
  

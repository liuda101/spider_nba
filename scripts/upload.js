var fs = require('fs');
var colors = require('colors');


function writeToTmp(fileName, data, callback) {
  var contentToSave = JSON.stringify(data);
  fs.writeFile(fileName, contentToSave, function(err) {
    if (err) {

    } else {
      callback();
    }
  });
}


function upload(fileName, data, column) {
  writeToTmp('./tmp/' + fileName, data, function() {
    console.log((' -----------  ' + column + ' 下载成功!!!!!!!!!!').yellow);
  });
}

module.exports = upload;
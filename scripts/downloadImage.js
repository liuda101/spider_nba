var request = require('request');
var colors = require('colors');
var fs = require('fs');

var Configs = require('./config.js');

function downloadPicture(url, name, id) {
  console.log((name + ' 准备下载...').blue);
  request.head(url, function(err, res, body) {
    if (err) {
      console.log((name + ' 下载失败!!!').red);
    }

    request(url).pipe(fs.createWriteStream('./playerImages/' + id + '.png')).on('close', function() {
      console.log((name + ' 下载成功!!!').green);
    });
  });
}

for(var key in Configs._PlayerCHName) {
  downloadPicture('http://stats.nba.com/media/players/230x185/' + Configs._PlayerCHName[key].player.id + '.png', Configs._PlayerCHName[key].player.name, Configs._PlayerCHName[key].player.id);
}
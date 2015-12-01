var request = require('request');
var colors = require('colors');

var Configs = require('./config.js');
var upload = require('./upload.js');

var qdzj = require('./qdzj');
var teamBasic = require('./teamBasic');
var teamDeep = require('./teamDeep');



var AllTeams = [];
var EastTeams = [];
var WestTeams = [];



function downloadTeamStanding(url) {
  request(url, function(error, response, body) {
    if (error == null) {
      var result = JSON.parse(body);
      var resultSets = result.resultSets;
      
      var wests = resultSets[5].rowSet;
      var easts = resultSets[4].rowSet;

      for (var i = 0; i < wests.length; i ++) {
        var team = wests[i];
        WestTeams.push({
          id: '' + team[0],
          name_en: team[5],
          name: Configs.NamesCache['' + team[0]],
          conference: 1, // 西部球队
        });

        AllTeams.push({
          id: '' + team[0],
          name_en: team[5],
          name: Configs.NamesCache['' + team[0]],
          conference: 1, // 西部球队
        });
      }

      for (var i = 0; i < easts.length; i ++) {
        var team = easts[i];
        EastTeams.push({
          id: '' + team[0],
          name_en: team[5],
          name: Configs.NamesCache['' + team[0]],
          conference: 2, // 西部球队
        });

        AllTeams.push({
          id: '' + team[0],
          name_en: team[5],
          name: Configs.NamesCache['' + team[0]],
          conference: 2, // 西部球队
        });
      }

      if (AllTeams.length == 30) {
        console.log('球队数据下载完毕'.green);
      } else {
        console.log('球队数据下载失败 - 不完整!!!!!!'.red);
      }


      upload('qdzj.json', qdzj.generateData(AllTeams, easts, wests), '球队排名');
      teamBasic.run(AllTeams);
      teamDeep.run(AllTeams);

    } else {
      console.log('球队数据下载失败 - 网络失败!!!!!!'.red);
    }
  });
}





function download() {
  console.log('');
  console.log('--------'.gray);
  console.log('开始爬球队数据'.blue);
  downloadTeamStanding(Configs.TEAM_STANDING);
}


module.exports = {
  download: download
};
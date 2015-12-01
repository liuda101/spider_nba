var request = require('request');
var colors = require('colors');

var Configs = require('./config.js');
var upload = require('./upload.js');

var playerBasic = require('./playerBasic');


var AllTeams = {};



function downloadTeamStanding(url) {
  request(url, function(error, response, body) {
    if (error == null) {
      var result = JSON.parse(body);
      var resultSets = result.resultSets;
      
      var teams = resultSets[0].rowSet;

      for (var i = 0; i < teams.length; i ++) {
        var team = teams[i];
        AllTeams[team[0] + ''] = {
          minutes: team[resultSets[0].headers.indexOf('MIN')]
        };
      }

      if (teams.length == 30) {
        console.log('为了爬球员，先爬球队出场时间 ----  完毕'.green);
      } else {
        console.log('为了爬球员，先爬球队出场时间 ----  球队数量不够！！！！'.red);
      }

      playerBasic.run(AllTeams);

    } else {
      console.log('为了爬球员，先爬球队出场时间 ----  失败！！！！'.red);
    }
  });
}





function download() {
  console.log('');
  console.log('--------'.gray);
  console.log('为了爬球员，先爬球队出场时间'.blue);
  downloadTeamStanding(Configs.TEAM_TIME);
}


module.exports = {
  download: download
};
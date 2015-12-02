var request = require('request');
var colors = require('colors');

var upload = require('./upload.js');
var Configs = require('./config.js');
var playerDataGenerator = require('./playerDataGenerator');
var playerDataGenerator1 = require('./playerDataGenerator1');
var playerDataGenerator2 = require('./playerDataGenerator2');
var playerDataGenerator3 = require('./playerDataGenerator3');
var playerDataGenerator4 = require('./playerDataGenerator4');


var All_Players = {

};


function downloadPlayerTimeInfo(players, url) {
  console.log('    正在下载球员出场时间的数据...'.blue);
  request(url, function(error, response, body) {
    if (error) {
      console.log('    下载球员出场时间的数据失败！！！！！'.red);
    } else {
      console.log('    下载球员出场时间的数据成功！！！！！'.green);

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      var playerIndex = json.resultSets[0].headers.indexOf('PLAYER_ID');

      var shouldIncludePlayers = [];
      for (var i = 0; i < rowSet.length; i ++) {
        if (players.indexOf(rowSet[i][playerIndex]) >= 0) {
          shouldIncludePlayers.push(rowSet[i]);
        }
      }

      upload('qycjsj.json', playerDataGenerator2.generateData({
        allData: shouldIncludePlayers,
        sortIndex: json.resultSets[0].headers.indexOf('MIN'),
        secondIndex: json.resultSets[0].headers.indexOf('GP'),
        sortColumnName: '出场时间',
        secondColumnName: '出场数',
        columnSummary: '',
        isSortPercent: false,
        isSecondPercent: false,
        sortType: 1              // 按数目倒序
      }), '球员出场时间');

     upload('qyzfq.json', playerDataGenerator4.generateData({
        allData: shouldIncludePlayers,
        freeThrowMadeIndex: json.resultSets[0].headers.indexOf('FTM'),
        fieldGoalMadeIndex: json.resultSets[0].headers.indexOf('FGA'),
        columnName: '数据',
        columnSummary: '个人罚球命中数/投篮出手数',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球员造罚球');
    }
  });
}


function downloadPlayerBasicInfoByCategory(url, category, callback) {
  console.log(('[爬球员基础数据' + category + '...]').blue);
  request(url + category, function(error, response, body) {
    if (error) {
      console.log(('[球员基础数据' + category + '下载失败！！！！！]').red);
    } else {
      console.log(('[球员基础数据' + category + '下载成功！！！！！]').green);

      var json = JSON.parse(body);
      var rowSet = json.resultSet.rowSet;

      callback(rowSet, json.resultSet.headers.indexOf(category));
    }
  });
}



function downloadPlayerDeep1(players, url) {
  console.log('爬球员进阶数据1...'.blue);
  request(url, function(error, response, body) {
    if (error) {
      console.log('球员进阶数据1下载失败！！！！！'.red);
    } else {
      console.log('球员进阶数据1下载成功！！！！！'.green);

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      var playerIndex = json.resultSets[0].headers.indexOf('PLAYER_ID');

      var shouldIncludePlayers = [];
      for (var i = 0; i < rowSet.length; i ++) {
        if (players.indexOf(rowSet[i][playerIndex]) >= 0) {
          shouldIncludePlayers.push(rowSet[i]);
        }
      }


      upload('qyzsmzl.json', playerDataGenerator.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('TS_PCT'),
        columnName: '数据',
        columnSummary: '加成了三分和罚球的命中率，代表球员把握进攻机会的能力',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球员真实命中率');

      upload('qyhhzyl.json', playerDataGenerator.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('USG_PCT'),
        columnName: '数据',
        columnSummary: '在场时以投篮、罚球或失误结束进攻回合的比重，代表球员制造进攻机会的能力',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球员回合占有率');


      upload('qyqbl.json', playerDataGenerator.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('OREB_PCT'),
        columnName: '数据',
        columnSummary: '在场时己方投失球转化为个人篮板的比重',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球员前板率');

      upload('qyhbl.json', playerDataGenerator.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('DREB_PCT'),
        columnName: '数据',
        columnSummary: '在场时对方投失球转化为个人篮板的比重',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球员后板率');

      
    }
  });
}


function downloadPlayerDeep2(players, url) {
  console.log('爬球员进阶数据2...'.blue);
  request(url, function(error, response, body) {
    if (error) {
      console.log('球员进阶数据2下载失败！！！！！'.red);
    } else {
      console.log('球员进阶数据2下载成功！！！！！'.green);

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      var playerIndex = json.resultSets[0].headers.indexOf('PLAYER_ID');

      var shouldIncludePlayers = [];
      for (var i = 0; i < rowSet.length; i ++) {
        if (players.indexOf(rowSet[i][playerIndex]) >= 0) {
          shouldIncludePlayers.push(rowSet[i]);
        }
      }

      upload('qyzgl.json', playerDataGenerator3.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('AST'),
        columnName: '数据',
        columnSummary: '在场时以个人助攻结束的回合比重',
        isPercent: false,
        sortType: 1              // 按数目倒序
      }), '球员助攻率');

      upload('qyswl.json', playerDataGenerator3.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('TOV'),
        columnName: '数据',
        columnSummary: '在场时以个人失误结束的回合比重',
        isPercent: false,
        sortType: 2              // 按数目倒序
      }), '球员失误率');

      upload('qyqdl.json', playerDataGenerator3.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('STL'),
        columnName: '数据',
        columnSummary: '在场时以个人抢断结束的回合比重',
        isPercent: false,
        sortType: 1              // 按数目倒序
      }), '球员抢断率');

      upload('qygml.json', playerDataGenerator3.generateData({
        allData: shouldIncludePlayers,
        dataIndex: json.resultSets[0].headers.indexOf('BLK'),
        columnName: '数据',
        columnSummary: '在场时以个人盖帽结束的回合比重',
        isPercent: false,
        sortType: 1              // 按数目倒序
      }), '球员盖帽率');
    }
  });
}

function downloadPlayerTime(AllTeams, url) {
  console.log('  下载球员的出场时间...'.blue);
  request(url, function(error, response, body) {
    if (error) {
      console.log('  球员的出场时间下载失败！！！！！'.red);
    } else {
      console.log('  球员的出场时间下载成功！！！！！'.green);

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      var timeIndex = json.resultSets[0].headers.indexOf('MIN');
      var teamIndex = json.resultSets[0].headers.indexOf('TEAM_ID');
      var playerIndex = json.resultSets[0].headers.indexOf('PLAYER_ID');
      var playerNameIndex = json.resultSets[0].headers.indexOf('PLAYER_NAME');
      
      var shouldIncludePlayers = [];
      for (var i = 0; i < rowSet.length; i ++) {

        All_Players['' + rowSet[i][playerIndex]] = {
          player: Configs.GetPlayer(rowSet[i][playerIndex] + '', {
            id: rowSet[i][playerIndex] + '',
            name: rowSet[i][playerNameIndex],
            pos: 0
          }), 
          
          team: {
            id: rowSet[i][teamIndex] + '',
            name: Configs.NamesCache[[rowSet[i][teamIndex] + '']]
          }
        };

        // 出场时间比要大于0.127
        if (rowSet[i][timeIndex] / AllTeams[rowSet[i][teamIndex]].minutes >= 0.127) {
          shouldIncludePlayers.push(rowSet[i][playerIndex]);
        }
      }

      upload('player.json', All_Players);
      

      downloadPlayerTimeInfo(shouldIncludePlayers, Configs.PLAYER_BASIC_ATIME);

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_PerGame, 'PTS', function(players, dataIndex) {
        upload('qydf.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: false,
          sortType: 1              // 按数目倒序
        }), '球员得分');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_PerGame, 'REB', function(players, dataIndex) {
        upload('qylb.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: false,
          sortType: 1              // 按数目倒序
        }), '球员篮板');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_PerGame, 'AST', function(players, dataIndex) {
        upload('qyzg.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: false,
          sortType: 1              // 按数目倒序
        }), '球员助攻');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_PerGame, 'STL', function(players, dataIndex) {
        upload('qyqd.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: false,
          sortType: 1              // 按数目倒序
        }), '球员抢断');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_PerGame, 'BLK', function(players, dataIndex) {
        upload('qygm.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: false,
          sortType: 1              // 按数目倒序
        }), '球员盖帽');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_Totals, 'FG_PCT', function(players, dataIndex) {
        upload('qymzl.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: true,
          sortType: 1              // 按数目倒序
        }), '球员命中率');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_Totals, 'FG3_PCT', function(players, dataIndex) {
        upload('qysf.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: true,
          sortType: 1              // 按数目倒序
        }), '球员三分命中率');
      });

      downloadPlayerBasicInfoByCategory(Configs.PLAYER_BASIC_Totals, 'FT_PCT', function(players, dataIndex) {
        upload('qyfq.json', playerDataGenerator1.generateData({
          All_Players: All_Players,
          allData: players,
          dataIndex: dataIndex,
          columnName: '数据',
          columnSummary: '',
          isPercent: true,
          sortType: 1              // 按数目倒序
        }), '球员罚球');
      });

      
      downloadPlayerDeep1(shouldIncludePlayers, Configs.PLAYER_DEEP1);
      downloadPlayerDeep2(shouldIncludePlayers, Configs.PLAYER_DEEP2);
    }
  });
}



function run(AllTeams) {
  downloadPlayerTime(AllTeams, Configs.PLAYER_TIME);
}






module.exports = {
  run: run
};
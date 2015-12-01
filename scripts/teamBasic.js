var request = require('request');
var colors = require('colors');

var upload = require('./upload.js');
var Configs = require('./config.js');
var basicDataGenerator = require('./basicDataGenerator');
var teamFQGenerator = require('./teamFQGenerator');


function downloadInfo(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log('球队基础数据下载失败！！！！！'.red);
    } else {

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      upload('qddf.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('PTS'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队得分');

      upload('qdlb.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('REB'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队篮板');

      upload('qdzg.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('AST'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队场均助攻');


      upload('qdqd.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('STL'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队场均抢断');

      upload('qdgm.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('BLK'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队场均盖帽');

      upload('qdmzl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('FG_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        toFixed: 0,
        sortType: 1              // 按数目倒序
      }), '球队命中率');

      upload('qdsfmzl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('FG3_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        toFixed: 0,
        sortType: 1              // 按数目倒序
      }), '球队三分命中率');

      upload('qdfqmzl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('FT_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        toFixed: 0,
        sortType: 1              // 按数目倒序
      }), '球队罚球命中率');


      upload('qdzfq.json', teamFQGenerator.generateData({
        allData: rowSet,
        freeThrowMadeIndex: json.resultSets[0].headers.indexOf('FTM'),
        fieldGoalMadeIndex: json.resultSets[0].headers.indexOf('FGA'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球队造罚球');
    }
  });
}



function run(AllTeams) {
  downloadInfo(Configs.TEAM_BASIC);
}



module.exports = {
  run: run
};

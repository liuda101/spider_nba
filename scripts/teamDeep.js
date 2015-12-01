var request = require('request');
var colors = require('colors');

var upload = require('./upload.js');
var Configs = require('./config.js');
var basicDataGenerator = require('./basicDataGenerator');
var teamFQGenerator = require('./teamFQGenerator');


function downloadInfo1(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log('球队进阶数据下载失败！！！！！'.red);
    } else {

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      upload('qdjz.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('PACE'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队节奏');


      upload('qdjgxl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('OFF_RATING'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 1              // 按数目倒序
      }), '球队进攻效率');



      upload('qdfsxl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('DEF_RATING'),
        columnName: '数据',
        columnSummary: '',
        isPercent: false,
        toFixed: 1,
        sortType: 2              // 按数目倒序
      }), '球队防守效率');


      upload('qdtl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('EFG_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球队有效命中率');


      upload('qdswl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('TM_TOV_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 2              // 按数目倒序
      }), '球队失误率');



      upload('qdqbl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('OREB_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球队前板率');

    }
  });
}



function downloadInfo2(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log('球队进阶数据下载失败！！！！！'.red);
    } else {

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;


      upload('qdftl.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('OPP_EFG_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 2              // 按数目倒序
      }), '球队防投篮');


      // TODO 对手罚球命中数/对手投篮出手术
      upload('qdffq.json', teamFQGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('OPP_FTA_RATE'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 2              // 按数目倒序
      }), '球队防罚球');


      upload('qdzsw.json', basicDataGenerator.generateData({
        allData: rowSet,
        dataIndex: json.resultSets[0].headers.indexOf('OPP_TOV_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球队造失误');

      upload('qdhbl.json', basicDataGenerator.generateData({
        allData: rowSet,
        showReverse: true,
        dataIndex: json.resultSets[0].headers.indexOf('OPP_OREB_PCT'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 1              // 按数目倒序
      }), '球队后板率');

    }
  });
}

function downloadInfo3(url) {
  request(url, function(error, response, body) {
    if (error) {
      console.log('球队进阶数据下载失败！！！！！'.red);
    } else {

      var json = JSON.parse(body);
      var rowSet = json.resultSets[0].rowSet;

      upload('qdffq.json', teamFQGenerator.generateData({
        allData: rowSet,
        freeThrowMadeIndex: json.resultSets[0].headers.indexOf('OPP_FTM'),
        fieldGoalMadeIndex: json.resultSets[0].headers.indexOf('OPP_FGA'),
        columnName: '数据',
        columnSummary: '',
        isPercent: true,
        sortType: 2              // 按数目倒序
      }), '球队防罚球');

    }
  });
}


function run(AllTeams) {
  downloadInfo1(Configs.TEAM_DEEP1);
  downloadInfo2(Configs.TEAM_DEEP2);
  downloadInfo3(Configs.TEAM_DEEP3);
}



module.exports = {
  run: run
};

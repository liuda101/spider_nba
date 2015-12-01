var Configs = require('./config.js');

function calculateSC(ary, index) {
  if (index == 0) {
    return '0';
  }
  return ((ary[0][7] - ary[index][7]) + (ary[index][8] - ary[0][8])) / 2 + '';
}

function percent(num) {
  if (parseInt(num) == 1) {
    return '100%';
  }
  num = num * 100;
  return num.toFixed(1) + '%';
}

function generateData(AllTeams, eastData, westData) {
  
  var result = {
    summary: '',
    data: []
  };

  var eastStanding = {
    sectionHeaders: ["东部球队", "胜", "负", "胜率", "胜场差"],
    cells: []
  };

  var westStanding = {
    sectionHeaders: ["西部球队", "胜", "负", "胜率", "胜场差"],
    cells: []
  };

  for (var i = 0; i < eastData.length; i ++) {
    var east = eastData[i];
    eastStanding.cells.push({
      team: {
        id: '' + east[0],
        name: Configs.NamesCache['' + east[0]]
      },
      data: [
        '' + east[7],
        '' + east[8],
        '' + percent(east[9]),
        calculateSC(eastData, i)
      ]
    });
  }

  for (var i = 0; i < westData.length; i ++) {
    var west = westData[i];
    westStanding.cells.push({
      team: {
        id: '' + west[0],
        name: Configs.NamesCache['' + west[0]]
      },
      data: [
        '' + west[7],
        '' + west[8],
        '' + percent(west[9]),
        calculateSC(westData, i)
      ]
    });
  }

  result.data.push(eastStanding);
  result.data.push(westStanding);

  return result;
}



module.exports = {
  generateData: generateData
};
var Configs = require('./config.js');

function percent(num) {

  if (num == 1) {
    return '100%';
  }
  num = num * 100;

  return num.toFixed(1) + '%';
}

function generateData(opts) {
  
  var result = {
    summary: opts.columnSummary,
    data: [{
      sectionHeaders: ['球员', opts.columnName],
      cells: []
    }]
  };

  for (var i = 0; i < opts.allData.length; i ++) {
    if (opts.allData[i][opts.fieldGoalMadeIndex] == 0) {
      opts.allData[i].__ratio = 0;
    } else {
      opts.allData[i].__ratio = opts.allData[i][opts.freeThrowMadeIndex] / opts.allData[i][opts.fieldGoalMadeIndex];
    }
  }

  opts.allData.sort(function(item1, item2) {
    if (opts.sortType == 1) {
      return item2.__ratio - item1.__ratio;
    } else {
      return item1.__ratio - item2.__ratio;
    }
  });

  for (var i = 0; i < opts.allData.length; i ++) {
    result.data[0].cells.push({
      team: {
        id: '' + opts.allData[i][2],
        name: Configs.NamesCache['' + opts.allData[i][2]]
      },
      player: Configs.GetPlayer('' + opts.allData[i][0], {
        id: '' + opts.allData[i][0],
        name: Configs.PlayerCHName(opts.allData[i][0], opts.allData[i][1]),
        pos: 0
      }),
      data: [
        opts.isPercent ? percent(opts.allData[i].__ratio) : opts.allData[i].__ratio.toFixed(1) + ''
      ]
    });
  }

  return result;
}



module.exports = {
  generateData: generateData
};
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
      sectionHeaders: [opts.playerColumn || '球队', opts.columnName],
      cells: []
    }]
  };

  for (var i = opts.allData.length - 1; i >= 0; i--) {
    opts.allData[i]._ratio = opts.allData[i][opts.freeThrowMadeIndex] / opts.allData[i][opts.fieldGoalMadeIndex];
  }
  

  opts.allData.sort(function(item1, item2) {
    if (opts.sortType == 1) {
      return item2._ratio - item1._ratio;
    } else {
      return item1._ratio - item2._ratio;
    }
  });

  for (var i = 0; i < opts.allData.length; i ++) {
    result.data[0].cells.push({
      team: {
        id: '' + opts.allData[i][0],
        name: Configs.NamesCache['' + opts.allData[i][0]]
      },
      data: [
        opts.isPercent ? percent(opts.allData[i]._ratio) : (opts.toFixed == 1 ? opts.allData[i]._ratio.toFixed(1) : opts.allData[i]._ratio) + ''
      ]
    });
  }

  return result;
}



module.exports = {
  generateData: generateData
};
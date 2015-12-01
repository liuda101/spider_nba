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

  if (opts.shouldDeal1Minus) {

  }

  opts.allData.sort(function(item1, item2) {
    if (opts.sortType == 1) {
      return item2[opts.dataIndex] - item1[opts.dataIndex];
    } else {
      return item1[opts.dataIndex] - item2[opts.dataIndex];
    }
  });

  for (var i = 0; i < opts.allData.length; i ++) {
    result.data[0].cells.push({
      team: {
        id: '' + opts.allData[i][2],
        name: Configs.NamesCache['' + opts.allData[i][2]]
      },
      player: {
        id: '' + opts.allData[i][0],
        name: Configs.PlayerCHName(opts.allData[i][0], opts.allData[i][1])
      },
      data: [
        opts.allData[i][opts.dataIndex] + '%'
      ]
    });
  }

  return result;
}



module.exports = {
  generateData: generateData
};
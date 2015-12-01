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

  if (opts.showReverse) {
    for (var i = opts.allData.length - 1; i >= 0; i--) {
      opts.allData[i][opts.dataIndex] = 1 - opts.allData[i][opts.dataIndex];
    }
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
        id: '' + opts.allData[i][0],
        name: Configs.NamesCache['' + opts.allData[i][0]]
      },
      data: [
        opts.isPercent ? percent(opts.allData[i][opts.dataIndex]) : (opts.toFixed == 1 ? opts.allData[i][opts.dataIndex].toFixed(1) : opts.allData[i][opts.dataIndex]) + ''
      ]
    });
  }

  return result;
}



module.exports = {
  generateData: generateData
};
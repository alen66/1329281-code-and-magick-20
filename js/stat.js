'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 20;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BARHEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили', CLOUD_X + 2 * GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + 2 * GAP + (GAP + TEXT_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + 2 * GAP + (GAP + TEXT_WIDTH) * i, CLOUD_Y + (CLOUD_HEIGHT - (BARHEIGHT * times[i]) / maxTime) - 2.5 * GAP);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var colorBar = 'hsl(240, ' + (i + 1) * 49 + '%, ' + (i + 1) * 12 + '%)';
      ctx.fillStyle = colorBar;
    }
    ctx.fillRect(CLOUD_X + 2 * GAP + (GAP + TEXT_WIDTH) * i, CLOUD_Y + (CLOUD_HEIGHT - (BARHEIGHT * times[i]) / maxTime) - 2 * GAP, BAR_WIDTH, (BARHEIGHT * times[i]) / maxTime);
  }
};

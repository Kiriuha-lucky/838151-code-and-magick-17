var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 50;
var BAR_WIDTH = 40;
var STAT_HEIGHT = 150;
var FONT_HEIGHT = 16;
var BAR_HEIGHT = STAT_HEIGHT - FONT_HEIGHT * 2;
var STAT_X = 100;
var STAT_Y = 80;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
    ;
  }
  ;
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, 100, 10, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 35);
  ctx.fillText('Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);

  var randomColorSaturation = function () {
    return "hsl(240," + (Math.round(Math.random() * 100)).toString() + "%,50%)";
  };

  var renderUserStatistic = function (i, color) {
    ctx.fillStyle = '#000';
    ctx.fillText((Math.round(times[i])).toString(), STAT_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y + (BAR_HEIGHT - times[i] * BAR_HEIGHT / maxTime));
    ctx.fillStyle = color;
    ctx.fillRect(STAT_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y + FONT_HEIGHT + (BAR_HEIGHT - times[i] * BAR_HEIGHT / maxTime), BAR_WIDTH, times[i] * BAR_HEIGHT / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], STAT_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y + BAR_HEIGHT + FONT_HEIGHT * 2);
  };

  for (var i = 0; i < players.length; i++) {
    var userColor = randomColorSaturation();
    if (players[i] === 'Вы') {
      userColor = '#ff0000';
      renderUserStatistic(i, userColor);
    } else {
      renderUserStatistic(i, userColor);
    }
    ;
  }
  ;
};

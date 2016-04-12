var time = function(){
  var time = new Date().getTime();

  function refresh() {
    if(new Date().getTime() - time >= 600000)
      window.location.reload(true);
    else
      setTimeout(refresh, 10000);
   }

  setTimeout(refresh, 10000)
}

montecarlopi = function () {
    time()

    var hitsEl = document.getElementById('hits');
    var totalEl = document.getElementById('total');
    var piEl = document.getElementById('pi');

    var canvas = document.getElementById('circle');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;
    var radius = Math.min(width, height) / 2;

    var hits = 0;
    var misses = 0;
    var total = 0;

    var paintScore
    var paintHit

    // Draw circle
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.rect(0, 0, width, height);
    ctx.stroke();

    var throwCtx = document.getElementById('throws').getContext('2d');

    redPx = throwCtx.createImageData(1, 1);
    redPx.data[0] = 255; // R
    redPx.data[1] = 0; // G
    redPx.data[2] = 0; // B
    redPx.data[3] = 255; // A

    greenPx = throwCtx.createImageData(1, 1);
    greenPx.data[0] = 0; // R
    greenPx.data[1] = 255; // G
    greenPx.data[2] = 0; // B
    greenPx.data[3] = 255; // A

    function loop() {
      var datapoint = 0;
      while(datapoint < 50){
        throwOne();
        datapoint += 1;
      }

      paintHit = setTimeout(loop, 0);
    }

    function throwOne() {
        // Throw a new one
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;

        if (Math.pow(x, 2) + Math.pow(y, 2) <= 1) {
            ++hits;
            var coloredPx = greenPx;
        } else {
            var coloredPx = redPx;
        }
        ++total;

        // Put pixel
        var imgX = (x + 1) / 2 * width;
        var imgY = (y + 1) / 2 * height;

        throwCtx.putImageData(coloredPx, imgX, imgY);
    };

    function score(){
      hitsEl.textContent = hits
      totalEl.textContent = total;
      // Recalculate pi
      piEl.textContent = (4 * hits / total).toFixed(14);

      window.requestAnimationFrame(score)
    }

    function start(){
      paintScore = window.requestAnimationFrame(score)
      loop()
    }

    function pause(){
      window.cancelAnimationFrame(paintScore)
      window.clearTimeout(paintHit)
    }

    start()
};

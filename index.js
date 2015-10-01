var milkcocoa = new MilkCocoa("woodif7nsnbf.mlkcca.com");


window.onload = function(){

  var currentMode = 'portrait';
  var output = document.getElementById('output');

  // app_idは自分のものに書き換えてください
  var milkcocoa = new MilkCocoa("woodif7nsnbf.mlkcca.com");
  var ds = milkcocoa.dataStore('gravity');

  window.addEventListener('devicemotion', function(e){
    gravity = e.accelerationIncludingGravity;

    output.innerHTML
    = 'x方向: '+gravity.x
    + '<br>y方向: '+gravity.y;

    sendModeFromGravityValue(gravity);

  },true);


  function sendModeFromGravityValue(g){

    // 絶対値を取得
    var x = Math.sqrt(g.x * g.x);
    var y = Math.sqrt(g.y * g.y);

    // portrait -> landscape
    if(currentMode === 'portrait' && x > 8.5 && y < 1.5){
      currentMode = 'landscape';
      ds.send({mode: currentMode});
    }

    // landscape -> portrait
    if(currentMode === 'landscape' && x < 1.5 && y > 8.5){
      currentMode = 'portrait';
      ds.send({mode: currentMode});
    }
  }
};


window.onload = function(){

  var image = document.getElementById('image');

  // app_idは自分のものに書き換えてください
  var milkcocoa = new MilkCocoa("woodif7nsnbf.mlkcca.com");
  var ds = milkcocoa.dataStore('gravity');

  ds.on('send', changeViewFromSentMode);

  function changeViewFromSentMode(sent){
    if(sent.value.mode === 'portrait'){
      image.className = '';
    }
    if(sent.value.mode === 'landscape'){
      image.className = 'is-landscape';
    }
  }
};
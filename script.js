let localStream;

// カメラ映像取得
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then( stream => {
  // 成功時にvideo要素にカメラ映像をセットし、再生
  const videoElm = document.getElementById('my-video');
  videoElm.srcObject = stream;
  videoElm.play();
  // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
  localStream = stream;
}).catch( error => {
  // 失敗時にはエラーログを出力
  console.error('mediaDevice.getUserMedia() error:', error);
  return;
});

// ユーザ情報入力項目&ボタン(初期値)
function buttonreset() {
  document.getElementById("id-open").disabled = false;
  document.getElementById("my-id").disabled = false;
  document.getElementById("id-close").disabled = true;
  document.getElementById("your-id").disabled = true;
  document.getElementById("make-call").disabled = true;
}
buttonreset();

//Peer作成
$('#id-open').on('click', function() {
  const myID = document.getElementById('my-id').value;
  // ユーザ情報入力項目&ボタン
  document.getElementById("id-open").disabled = true;
  document.getElementById("my-id").disabled = true;
  document.getElementById("id-close").disabled = false; 
  document.getElementById("your-id").disabled = false;
  document.getElementById("make-call").disabled = false;

  const peer = new Peer(myID, {
  key: '047c0c68-2d54-436d-8f0e-070ae4983ca5',
  debug: 3
  });

  //Peer接続
  peer.on('open', () => {
    //
  });

  // 発信処理
  document.getElementById('make-call').onclick = () => {
    const yourID = document.getElementById('your-id').value;
    // ユーザ情報入力項目&ボタン
    document.getElementById("your-id").disabled = true;
    document.getElementById("make-call").disabled = true;
    
    const mediaConnection = peer.call(yourID, localStream);
    setEventListener(mediaConnection);
  };

  // イベントリスナを設置する関数
  const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('your-video')
    videoElm.srcObject = stream;
    videoElm.play();
  });
  }

  //着信処理
  peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
  });

  //Peer切断
  $('#id-close').on('click', function() {
    peer.destroy();
    buttonreset();
  });

  peer.on('close', () => {
    alert('通信が切断しました。');
  });
});

$(function() {
  // 音声ON(相手)(初期設定が音声OFFのため)
  var yoursettings = $('#your-video').get(0);
  yoursettings.muted = false;

  // 撮影機能
  var myvideo = document.getElementById('my-video');
  var yourvideo = document.getElementById('your-video');

  // 写真の撮影(canvasに描写)
  function camera () {

    // myphoto
    mycanvas.width = myvideo.videoWidth;
    mycanvas.height = myvideo.videoHeight;
    mycontext.drawImage(myvideo, 0, 0);

    // yourphoto
    yourcanvas.width = yourvideo.videoWidth;
    yourcanvas.height = yourvideo.videoHeight;
    yourcontext.drawImage(yourvideo, 0, 0);
  }

  // 会話続けさせたるちゃん
  var txt = new Array();
  txt[0]="せつめいクイズだよ！「チョコレート」をせつめいしてみて！";
  txt[1]="せつめいクイズだよ！「えんぴつ」をせつめいしてみて！";
  txt[2]="せつめいクイズだよ！「さつまいも」をせつめいしてみて！";
  txt[3]="せつめいクイズだよ！「はさみ」をせつめいしてみて！";
  txt[4]="せつめいクイズだよ！「フライパン」をせつめいしてみて！";
  txt[5]="わたしにかってね！じゃんけんぽん　　「パー」";
  txt[6]="わたしにまけてね！じゃんけんぽん　　「パー」";
  txt[7]="みんなであいこになろう！じゃんけんぽん　　「パー」";
  txt[8]="おえかきしてみない？絵（え）でしりとりとか！";
  txt[9]="あっちむいてほい、しよう！";
  txt[10]="ジェスチャーゲームしよう！おだいは「ぞう」";
  txt[11]="ジェスチャーゲームしよう！おだいは「キリン」";
  txt[12]="ジェスチャーゲームしよう！おだいは「きょうりゅう」";
  txt[13]="ジェスチャーゲームしよう！おだいは「バナナ」";
  txt[14]="ジェスチャーゲームしよう！おだいは「ライオン」";
  txt[15]="しりとりしよう！じゃあさいしょは・・・「ぶどう」の「う」！";
  txt[16]="しりとりしよう！じゃあさいしょは・・・「めがね」の「ね」！";
  txt[17]="しりとりしよう！じゃあさいしょは・・・「あめんぼ」の「ぼ」！";
  txt[18]="しりとりしよう！じゃあさいしょは・・・「はんかち」の「ち」！";
  txt[19]="しりとりしよう！じゃあさいしょは・・・「ねんど」の「ど」！";
  txt[20]="にらめっこしよう！にーらめっこしましょ、わらうとまけよ、あっぷっぷ！";
  txt[21]="九九（くく）にちょうせんしてみよう！きょうは、「１のだん」と「２のだん」！";
  txt[22]="九九（くく）にちょうせんしてみよう！きょうは、「３のだん」と「４のだん」！";
  txt[23]="九九（くく）にちょうせんしてみよう！きょうは、「５のだん」と「６のだん」！";
  txt[24]="九九（くく）にちょうせんしてみよう！きょうは、「７のだん」と「８のだん」！";
  txt[25]="九九（くく）にちょうせんしてみよう！きょうは、「９のだん」！";
  txt[26]="かみとペンをよういして！１ぷんかんで、「どうぶつ」のしゅるいをかきだしてみよう！どっちがたくさんかけるかな？じゃあ時間（じかん）をきめて・・・よーいスタート！";
  txt[27]="かみとペンをよういして！１ぷんかんで、「やさい」のしゅるいをかきだしてみよう！どっちがたくさんかけるかな？じゃあ時間（じかん）をきめて・・・よーいスタート！";
  txt[28]="かみとペンをよういして！１ぷんかんで、「フルーツ」のしゅるいをかきだしてみよう！どっちがたくさんかけるかな？じゃあ時間（じかん）をきめて・・・よーいスタート！";
  txt[29]="かみとペンをよういして！１ぷんかんで、「スポーツ」のしゅるいをかきだしてみよう！どっちがたくさんかけるかな？じゃあ時間（じかん）をきめて・・・よーいスタート！";
  txt[30]="かみとペンをよういして！１ぷんかんで、「おにぎりの具（ぐ）」のしゅるいをかきだしてみよう！どっちがたくさんかけるかな？じゃあ時間（じかん）をきめて・・・よーいスタート！";
  $('#sasetaruchan').on('click', function() {
    var max = 31; //メッセージ行数
    var txtno = Math.floor(Math.random() * max);
    $('#AItxt').html(txt[txtno]);
  });

  // 時計
  function clock () {
    var twoDigit = function(num) {
      var digit
      if( num < 10 ){
        digit = "0" + num;
      } else {
        digit = num;
      }
      return digit;
    }

    var date = new Date();

    var year = date.getFullYear();
    var month = twoDigit(date.getMonth()+1);
    var day = twoDigit(date.getDate());
    var weeks = new Array("日","月","火","水","木","金","土");
    var week = weeks[date.getDay()];
    var hour = twoDigit(date.getHours());
    var minute = twoDigit(date.getMinutes());
    var second = twoDigit(date.getSeconds());
    $('.clock-date').html(year + "/" + month + "/" + day + " (" + week + ")");
    $('.clock-time').html(hour + ":" + minute + ":" + second);
  }
  setInterval(clock, 1000);
  
});
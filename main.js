let gameData;
let currentStreak = 0;

// モード選択時に呼び出される関数
async function selectMode(modeKey) {
  try {
    const response = await fetch('gamedata.json');
    const allData = await response.json();
    gameData = allData.modes[modeKey];

    if (!gameData) {
      throw new Error('指定されたモードが見つかりません');
    }

    // UI切り替え
    document.getElementById('mode-selector').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('mode-title').innerText = gameData.title;
    document.getElementById('mode-description').innerText = gameData.description;

    // 背景切り替え 👇
    const body = document.body;
    if (modeKey === 'gold') {
      body.style.backgroundImage = "url('l_mh_rize_ekisho88.webp')";
      body.style.backgroundSize = 'cover';
    } else if (modeKey === 'normal') {
      body.style.backgroundImage = "url('OIP (1).jpg')"; 
      body.style.backgroundSize = 'cover';
    }

  } catch (error) {
    console.error("ゲームデータの読み込みに失敗しました", error);
    document.getElementById('result').innerText = 'エラー：ゲーム設定を読み込めません';
  }
}

// チャレンジ処理
function tryChance() {
  if (!gameData) {
    document.getElementById('result').innerText = 'ゲームデータ未読み込みです';
    return;
  }

  const isSuccess = Math.random() < gameData.stockProbability;
  const resultText = isSuccess ? gameData.successMessage : gameData.failMessage;

  if (isSuccess) {
    currentStreak++;
  } else {
    currentStreak = 0;
  }

  document.getElementById('result').innerText = resultText;
  document.getElementById('streak').innerText = `現在の連チャン数: ${currentStreak}`;
}


function goBackToModeSelection() {
  // ゲーム状態をリセットし、モード選択に戻る
  currentStreak = 0;
  document.getElementById('result').innerText = '';
  document.getElementById('streak').innerText = '現在の連チャン数: 0';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('mode-selector').style.display = 'block';
}

// 👇 関数を公開
window.endGame = endGame;
window.goBackToModeSelection = goBackToModeSelection;


// 関数をHTMLから呼び出せるように公開
window.tryChance = tryChance;
window.selectMode = selectMode;

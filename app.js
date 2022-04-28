// 可以在app.js写普通的js函数，只在app.js内部使用，而不需要在html中使用
function getRandomValue(a, b) {
  // random number in [a,b)
  return Math.floor(Math.random() * (b - a)) + a;
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameLog: [],
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth > 0) {
        return { width: this.monsterHealth + "%" };
      } else {
        return { width: "0%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth > 0) {
        return { width: this.playerHealth + "%" };
      } else {
        return { width: "0%" };
      }
    },
    mayUseSpecialAttack() {
      return !!(this.currentRound % 3);
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        // monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "special attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        this.addLogMessage("player", "heal to", 100);
      } else {
        this.playerHealth += healValue;
        this.addLogMessage("player", "heal", healValue);
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.addLogMessage("player", "surrender", 0);
    },
    addLogMessage(actionBy, actionType, value) {
      this.gameLog.unshift({
        actionBy,
        actionType,
        value,
      });
    },
    restart() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.gameLog = [];
      this.currentRound = 0;
    },
  },
}).mount("#game");

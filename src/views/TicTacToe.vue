<template>
  <div class="game">
    <div class="gameContainer" v-if="mainStore.ticTacToeModel.board != null">
      <div class="row" v-for="(row, rowIndex) in mainStore.ticTacToeModel.board" :key="rowIndex">
        <div class="col" v-for="(value, colIndex) in row" :key="colIndex" @click="setField(rowIndex, colIndex)" :class="{ clickable: value == TicTacToeEnum.None }">
          <span v-if="value == TicTacToeEnum.Cross">X</span>
          <span v-if="value == TicTacToeEnum.Circle">O</span>
        </div>
      </div>
      <div style="margin-top: 25px">
        <div v-if="mainStore.ticTacToeModel.winner === TicTacToeEnum.Cross">Du har vundet og fået point! Se din konto for at se hvor mange point du har!</div>
        <div v-if="mainStore.ticTacToeModel.winner === TicTacToeEnum.Circle">Du har tabt :( Nulstil spillet ved at klikke på "Genstart spillet"</div>
      </div>
    </div>
    <div class="buttonContainer">
      <div class="btn-secondary" @click="ticTacToeResetGame()">Genstart spillet</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { TicTacToeEnum } from '@/store/models';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class TicTacToe extends Vue {
  mainStore = useMainStore();
  TicTacToeEnum = TicTacToeEnum;

  async mounted() {
    await this.ticTacToeResetGame();
  }

  async ticTacToeResetGame() {
    await this.mainStore.ticTacToeResetGame();
  }

  setField(row: number, col: number) {
    this.mainStore.ticTacToeSetField(row, col);
  }
}
</script>

<style scoped>
.game {
  box-shadow: 0px 1px 10px 0px #979797;
  border-radius: 2px;
  background: white;
  margin: 25px auto;
  width: 1200px;
  height: calc(100% - 160px);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  align-content: space-between;
  flex-direction: column;
}

.gameContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gameContainer .row {
  display: flex;
}
.gameContainer .row .col {
  font-size: 48px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 92px;
  border: solid 1px black;
  margin: 0px;
}
.gameContainer .row .col.clickable {
  cursor: pointer;
}

.buttonContainer div {
  width: 180px;
  float: right;
  margin-right: 25px;
}
</style>

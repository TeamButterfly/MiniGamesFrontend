<template>
  <div class="game">
    <div class="gameContainer" v-if="mainStore.slidePuzzleModel.board != null">
      <div class="row" v-for="(row, rowIndex) in board2D" :key="rowIndex">
        <div class="col" v-for="(value, colIndex) in row" :key="colIndex" :class="{ clickable: isClickable(rowIndex, colIndex) }" @click="swap(rowIndex, colIndex)">
          <span v-if="value !== 0">{{ value }}</span>
        </div>
      </div>
      <div v-if="mainStore.slidePuzzleModel.isGameWon" style="margin-top: 25px">Du har vundet og fået point! Se din konto for at se hvor mange point du har!</div>
    </div>
    <div class="buttonContainer">
      <div class="btn-secondary" @click="slidePuzzleResetGame()">Genstart spillet</div>
      <div class="size">Størrelse på spillet: <input v-model="size" value="Størrelse" type="number" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class SlidePuzzle extends Vue {
  mainStore = useMainStore();

  board2D: number[][] = [];

  size: number = 9;

  async mounted() {
    await this.slidePuzzleResetGame();
  }

  async slidePuzzleResetGame() {
    await this.mainStore.slidePuzzleResetGame(this.size);
    this.board2D = this.getBoard2D(this.mainStore.slidePuzzleModel.board);
  }

  getBoard2D(board: number[]): number[][] {
    const board2D: number[][] = [];
    const squareLength = Math.sqrt(board.length);

    let boardIndex = 0;
    for (let i = 0; i < squareLength; i++) {
      board2D[i] = [];
      for (let j = 0; j < squareLength; j++) {
        board2D[i][j] = board[boardIndex];
        boardIndex++;
      }
    }

    return board2D;
  }

  async swap(rowIndex: number, colIndex: number) {
    if (!this.isClickable(rowIndex, colIndex)) {
      return;
    }
    await this.mainStore.slidePuzzleMove(this.board2D[rowIndex][colIndex]);
    this.board2D = this.getBoard2D(this.mainStore.slidePuzzleModel.board);
  }

  isClickable(rowIndex: number, colIndex: number): boolean {
    const col = this.board2D[rowIndex][colIndex];

    const up = rowIndex - 1;
    const down = rowIndex + 1;
    const left = colIndex - 1;
    const right = colIndex + 1;

    if (this.inBounce(up, colIndex)) {
      if (this.board2D[up][colIndex] === 0) {
        return true;
      }
    }
    if (this.inBounce(down, colIndex)) {
      if (this.board2D[down][colIndex] === 0) {
        return true;
      }
    }
    if (this.inBounce(rowIndex, left)) {
      if (this.board2D[rowIndex][left] === 0) {
        return true;
      }
    }
    if (this.inBounce(rowIndex, right)) {
      if (this.board2D[rowIndex][right] === 0) {
        return true;
      }
    }

    return false;
  }

  inBounce(rowIndex: number, colIndex: number) {
    if (rowIndex >= this.board2D.length || rowIndex < 0) {
      return false;
    }
    if (colIndex >= this.board2D[rowIndex].length || colIndex < 0) {
      return false;
    }
    return true;
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

.buttonContainer .size {
  float: right;
  width: 250px;
  margin-right: 5px;
}
.buttonContainer .size input {
  width: 80px;
}
.buttonContainer div {
  width: 180px;
  float: right;
  margin-right: 25px;
}
</style>

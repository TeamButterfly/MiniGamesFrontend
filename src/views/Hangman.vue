<template>
  <div class="game">
    <div class="gameContainer" v-if="mainStore.hangmanModel.life != null">
      <div class="image"><img :src="require(`../assets/hangman_${mainStore.hangmanModel.life}.png`)" /></div>
      <div style="margin-bottom: 25px">
        <span>{{ mainStore.hangmanModel.revealedWord }}</span>
      </div>
      <div class="guess_letters">
        <div v-for="(letter, index) in letters" :key="index" @click="hangmanGuessLetter(letter)" v-if="!guessedLetters.includes(letter)">
          {{ letter }}
        </div>
        <div v-else style="cursor: default">_</div>
      </div>
      <div class="guess_word">
        <input placeholder="Gæt ordet" v-model="guessedWord" />
        <div class="btn-secondary" @click="hangmanGuessWord()">Gæt ord</div>
      </div>
      <div v-if="mainStore.hangmanModel.isGameWon">Du har vundet og fået point! Se din konto for at se hvor mange point du har!</div>
      <div v-if="mainStore.hangmanModel.life === 0">Du har tabt :( Nulstil spillet ved at klikke på "Genstart spillet"</div>
    </div>
    <div class="buttonContainer">
      <div class="btn-secondary" @click="hangmanResetGame()">Genstart spillet</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Hangman extends Vue {
  mainStore = useMainStore();

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'];
  guessedLetters: string[] = [];
  guessedWord: string = '';

  mounted() {
    this.hangmanResetGame();
  }

  hangmanResetGame() {
    this.guessedLetters = [];
    this.guessedWord = '';
    this.mainStore.hangmanResetGame();
  }

  hangmanGuessLetter(letter: string) {
    if (this.mainStore.hangmanModel.life === 0 || this.mainStore.hangmanModel.isGameWon) {
      return;
    }
    this.guessedLetters.push(letter);
    this.mainStore.hangmanGuessLetter(letter.toLowerCase());
  }

  hangmanGuessWord() {
    if (this.mainStore.hangmanModel.life === 0 || this.mainStore.hangmanModel.isGameWon) {
      return;
    }
    this.mainStore.hangmanGuessWord(this.guessedWord);
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
.gameContainer div {
  margin-bottom: 10px;
}
.gameContainer .guess_letters div {
  float: left;
  margin-right: 15px;
  padding: 5px;
  width: 25px;
  text-align: center;
  border-radius: 3px;
  border: 1px black solid;
  cursor: pointer;
}
.gameContainer .guess_word input {
  width: 400px;
}

.buttonContainer div {
  width: 180px;
  float: right;
  margin-right: 25px;
}
</style>

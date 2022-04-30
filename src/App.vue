<template>
  <div id="app">
    <loading v-if="mainStore.globalLoading"></loading>

    <div class="navContainer" v-if="mainStore.account">
      <div class="nav">
        <div class="link minigames">
          <router-link to="/"> <font-awesome-icon icon="fa-solid fa-trophy" /> MiniGames </router-link>
        </div>
        <div class="link">
          <router-link to="/profile">Profil</router-link>
        </div>
        <div class="link">
          <router-link to="/hangman">Hangman</router-link>
        </div>
        <div class="link">
          <router-link to="/slidepuzzle">Slide Puzzle</router-link>
        </div>
        <div class="link">
          <router-link to="/tictactoe">Tic Tac Toe</router-link>
        </div>
        <div class="link">
          <router-link to="/logout">Log ud</router-link>
        </div>
      </div>
    </div>

    <router-view class="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Loading from './components/Loading.vue';
import { MessageBus } from './components/MessageBus';
import { useMainStore } from './store/mainStore';

@Component({
  components: {
    Loading,
  },
})
export default class App extends Vue {
  mainStore = useMainStore();

  created() {
    MessageBus.$on('logout', () => {
      localStorage.removeItem('userData');
      this.mainStore.activeAccount = null;
      this.mainStore.$reset();
    });
    MessageBus.$on('startGlobalLoading', () => {
      this.mainStore.globalLoading = true;
    });
    MessageBus.$on('stopGlobalLoading', () => {
      this.mainStore.globalLoading = false;
    });
  }
}
</script>

<style>
@font-face {
  font-family: Montserrat;
  src: url(../src/assets/fonts/Montserrat-Regular.ttf);
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: Montserrat;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  background: #f3f3f3;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.navContainer {
  background: white;
  height: 80px;
  box-shadow: 0px 1px 10px 0px #979797;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  width: 800px;
  display: flex;
  justify-content: space-evenly;
}

.link {
  position: relative;
  display: block;
  padding: 10px 0;
}
.link.minigames {
  font-size: 22px;
  padding: 5px;
}
.link a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.link a:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #37d631;
  transform: scaleX(0);
  transform-origin: bottom left;
  transition: transform 0.3s;
}
.link a:hover:after {
  transform: scaleX(1);
}
.link a.router-link-exact-active {
  color: #42b983;
}

.content {
  height: calc(100% - 80px);
  padding: 25px 5px;
}

input,
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.btn-primary {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.btn-primary:hover {
  background-color: #45a049;
}
.btn-secondary {
  background-color: #4c90af;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.btn-secondary:hover {
  background-color: #3c7c99;
}
.btn-text {
  color: #272727;
  cursor: pointer;
  text-align: center;
}
.btn-text:hover {
  font-weight: bold;
}
</style>

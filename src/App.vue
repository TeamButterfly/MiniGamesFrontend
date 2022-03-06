<template>
  <div id="app">
    <loading v-if="mainStore.globalLoading"></loading>

    <div class="nav" v-if="mainStore.account">
      <router-link to="/profile">Profil</router-link> |
      <router-link to="/game1">Spil 1</router-link> |
      <router-link to="/game2">Spil 2</router-link> |
      <router-link to="/game3">Spil 3</router-link> |
      <router-link to="/logout">Log ud</router-link>
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
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.nav {
  padding: 30px;
  height: 80px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  width: 100%;
  height: calc(100% - 80px);
  padding: 5px;
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

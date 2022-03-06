<template>
  <div id="app">
    <div id="nav" v-if="mainStore.account">
      <router-link to="/profile">Profil</router-link> |
      <router-link to="/game1">Spil 1</router-link> |
      <router-link to="/game2">Spil 2</router-link> |
      <router-link to="/game3">Spil 3</router-link> |
      <router-link to="/logout">Log ud</router-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MessageBus } from './components/MessageBus';
import { useMainStore } from './store/mainStore';

@Component({
  components: {},
})
export default class App extends Vue {
  mainStore = useMainStore();

  created() {
    MessageBus.$on('logout', () => {
      localStorage.removeItem('userData');
      this.mainStore.$reset();
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
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
.submit {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.submit:hover {
  background-color: #45a049;
}
</style>

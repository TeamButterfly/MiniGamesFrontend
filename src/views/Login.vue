<template>
  <div class="content">
    <div class="loginContainer">
      <form>
        <div class="loginContent">
          <table>
            <tr>
              <td>Brugernavn:</td>
              <td>
                <input type="text" v-model="username" @keyup.enter="submit()" />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  v-model="password"
                  @keyup.enter="submit()"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><div class="submit" @click="submit()">Login</div></td>
            </tr>
          </table>
          <div style="height: 20px">
            <span style="color: #b11010">{{ error }}</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { User } from '@/store/models';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Login extends Vue {
  mainStore = useMainStore();

  error: string = '';
  username: string = '';
  password: string = '';

  async submit() {
    if (!this.username) {
      this.error = 'Indtast et brugernavn';
      return;
    }
    if (!this.password) {
      this.error = 'Indtast et password';
      return;
    }
    try {
      const { status, data } = await this.mainStore.login(
        this.username,
        this.password
      );
      this.$router.push({ name: 'Profile' });
    } catch (err) {
      this.error = 'Forkert brugernavn eller password';
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: #303138;
}

.loginContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.loginContent {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 600px;
  height: 250px;
  background: #99c6ff;
  border-radius: 80px;
}

.loginContent td {
  text-align: right;
}
</style>

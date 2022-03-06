<template>
  <div class="content">
    <div class="loginContainer">
      <form>
        <div class="loginContent">
          <table>
            <tr>
              <td>Brugernavn:</td>
              <td>
                <input
                  type="text"
                  v-model="user.username"
                  @keyup.enter="login()"
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  v-model="user.password"
                  @keyup.enter="login()"
                />
              </td>
            </tr>
            <tr>
              <td>
                <div class="btn-secondary" @click="register()">
                  Opret bruger
                </div>
              </td>
              <td><div class="btn-primary" @click="login()">Login</div></td>
            </tr>
          </table>
          <div style="height: 20px">
            <span style="font-weight: bold">{{ message }}</span>
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
import Validater from '@/components/Validater';
import { AxiosError } from 'axios';

@Component({
  components: {},
})
export default class Login extends Vue {
  mainStore = useMainStore();

  message: string = '';
  user: User = new User();

  async register() {
    const validaterObject = Validater.validate(this.user);

    if (!validaterObject.success) {
      this.message = validaterObject.message;
      return;
    }

    try {
      await this.mainStore.register(this.user);
      this.message = 'Brugeren blev oprettet';
    } catch (err) {
      const axiosError = err as AxiosError;
      this.message = axiosError.response?.data.message;
    }
  }

  async login() {
    const validaterObject = Validater.validate(this.user);

    if (!validaterObject.success) {
      this.message = validaterObject.message;
      return;
    }

    try {
      await this.mainStore.login(this.user);
      this.$router.push({ name: 'Profile' });
    } catch (err) {
      const axiosError = err as AxiosError;
      this.message = axiosError.response?.data.message;
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

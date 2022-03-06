<template>
  <div class="content">
    <div class="loginContainer">
      <div class="header">Log ind</div>
      <input
        type="text"
        v-model="user.username"
        @keyup.enter="login()"
        placeholder="Brugernavn"
      />
      <input
        type="password"
        v-model="user.password"
        @keyup.enter="login()"
        placeholder="Password"
      />
      <div class="btn-primary" @click="login()">Login</div>
      <div style="text-align: center">
        eller,
        <span class="btn-text" @click="register()">opret bruger</span>
      </div>
    </div>

    <popup name="loginPopup" :message="message" />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { User } from '@/store/models';
import { Component, Vue } from 'vue-property-decorator';
import Validater from '@/components/Validater';
import Popup from '@/components/Popup.vue';
import { getAxiosError } from '@/http/httpClient';

@Component({
  components: { Popup },
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
      this.$modal.show('loginPopup');
    } catch (err) {
      this.message = getAxiosError(err);
      this.$modal.show('loginPopup');
    }
  }

  async login() {
    const validaterObject = Validater.validate(this.user);

    if (!validaterObject.success) {
      this.message = validaterObject.message;
      this.$modal.show('loginPopup');
      return;
    }

    try {
      await this.mainStore.login(this.user);
      this.$router.push({ name: 'Profile' });
    } catch (err) {
      this.message = getAxiosError(err);
      this.$modal.show('loginPopup');
    }
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  background: #05212b;
}

.loginContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 5px;
  padding: 25px;
}

.header {
  font-size: 32px;
  font-weight: bolder;
  text-align: left;
}
</style>

<template>
  <div class="profile" v-if="mainStore.account">
    <div style="text-align: center">
      Velkommen,
      <span style="font-weight: bold">{{
        this.mainStore.account.user.username
      }}</span
      >.<br />
      Du har
      <span style="font-weight: bold">{{ this.mainStore.account.points }}</span>
      point
    </div>
    <div>
      <div style="font-weight: bold; text-align: center">
        Opdater profiloplysninger
      </div>
      <table>
        <tr>
          <td>Brugernavn:</td>
          <td>
            <input
              type="text"
              v-model="editUser.username"
              @keyup.enter="update()"
            />
          </td>
        </tr>
        <tr>
          <td>Password:</td>
          <td>
            <input
              type="password"
              v-model="editUser.password"
              @keyup.enter="update()"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td><div class="btn-primary" @click="update()">Opdater</div></td>
        </tr>
      </table>
      <div style="font-weight: bold; text-align: center">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Vue } from 'vue-property-decorator';
import { MessageBus } from '@/components/MessageBus';
import { User } from '@/store/models';
import { AxiosError } from 'axios';
import Validater from '@/components/Validater';

@Component({
  components: {},
})
export default class Profile extends Vue {
  mainStore = useMainStore();

  message: string = '';
  editUser: User = new User();

  async update() {
    const validaterObject = Validater.validate(this.editUser);
    if (!validaterObject.success) {
      this.message = validaterObject.message;
      return;
    }
    this.mainStore
      .updateUser(this.editUser)
      .then((resp) => {
        this.mainStore.getAccount().then(() => {
          this.editUser = new User();
          this.message = 'Dit brugernavn og password blev opdateret';
        });
      })
      .catch((err: any) => {
        const axiosError = err as AxiosError;
        this.message = axiosError.response?.data.message;
      });
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: space-around;
  width: 800px;
  margin: auto;
}
</style>

<template>
  <div class="profile" v-if="mainStore.account">
    <div class="header">Min profil</div>

    <div class="profile_content">
      <div class="profile_navigation">
        <div
          class="tab"
          :class="{ active: tabActive === Tab.DETAILS }"
          @click="tabActive = Tab.DETAILS"
        >
          <font-awesome-icon icon="fa-solid fa-circle-user" /> Mine detaljer
        </div>
        <div
          class="tab"
          :class="{ active: tabActive === Tab.ACCOUNT }"
          @click="tabActive = Tab.ACCOUNT"
        >
          <font-awesome-icon icon="fa-solid fa-money-check-dollar" /> Min konto
        </div>
      </div>
      <div class="tab_container">
        <div v-if="tabActive === Tab.DETAILS">
          <div class="tab_header">Mine detaljer</div>
          <div class="tab_content">
            <div class="row">
              <div class="col-15">Her kan du opdatere dine oplysninger</div>
              <div class="col-fill">
                <div>
                  <label for="username">Brugernavn:</label>
                  <input
                    type="text"
                    name="username"
                    v-model="editUser.username"
                    @keyup.enter="update()"
                  />
                </div>
                <div>
                  <label for="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    v-model="editUser.password"
                    @keyup.enter="update()"
                  />
                </div>
                <div
                  class="btn-secondary"
                  @click="update()"
                  style="width: 120px"
                >
                  Gem
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabActive === Tab.ACCOUNT">
          <div class="tab_header">Min konto</div>
          <div class="tab_content">
            <div class="row">
              <div class="col-15">Her kan du hente præmier for dine point</div>
              <div class="col-fill">
                <div>
                  Du har
                  <span style="font-weight: bold">{{
                    mainStore.account.points
                  }}</span>
                  point
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup name="profilePopup" :message="message" />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Vue } from 'vue-property-decorator';
import { MessageBus } from '@/components/MessageBus';
import { User } from '@/store/models';
import Validater from '@/components/Validater';
import Popup from '@/components/Popup.vue';
import { getAxiosError } from '@/http/httpClient';

export enum Tab {
  DETAILS,
  ACCOUNT,
}

@Component({
  components: { Popup },
})
export default class Profile extends Vue {
  mainStore = useMainStore();

  message: string = '';
  editUser: User = Object.assign(new User(), this.mainStore.account?.user);

  Tab = Tab;
  tabActive: Tab = Tab.DETAILS;

  update() {
    const validaterObject = Validater.validate(this.editUser);
    if (!validaterObject.success) {
      this.message = validaterObject.message;
      this.$modal.show('profilePopup');
      return;
    }
    this.mainStore
      .updateUser(this.editUser)
      .then((resp) => {
        this.mainStore.getAccount().then(() => {
          this.editUser = new User();
          this.message = 'Dit brugernavn og password blev opdateret';
          this.$modal.show('profilePopup');
        });
      })
      .catch((err: any) => {
        this.message = getAxiosError(err);
        this.$modal.show('profilePopup');
      });
  }
}
</script>

<style scoped>
.profile {
  margin: 0 30px;
}
.profile_content {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}
.profile_content .profile_navigation {
  flex-grow: 0;
  width: 200px;
}
.profile_content .profile_navigation .tab {
  cursor: pointer;
  height: 30px;
  width: 180px;
  padding: 6px 15px;
  border-radius: 10px;
}
.profile_content .profile_navigation .tab.active {
  color: #0875d2;
  background: #0875d20d;
}
.profile_content .tab_container {
  flex-grow: 1;
  background-color: white;
  box-shadow: 0px 0px 10px 1px #d5d5d5;
  border-radius: 5px;
  padding: 25px;
  max-width: 800px;
}
.profile_content .tab_container .tab_header {
  font-weight: bold;
  font-size: 22px;
  border-bottom: 1px solid #c5c5c570;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.profile_content .tab_container .tab_content {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}
.col-15 {
  flex-grow: 0;
  width: 250px;
  padding-top: 2px;
  color: #6c6c6c;
  font-size: 14px;
  padding-right: 15px;
}
.col-fill {
  flex-grow: 1;
  padding: 0 25px;
}

.header {
  font-size: 26px;
  font-weight: bold;
}
</style>

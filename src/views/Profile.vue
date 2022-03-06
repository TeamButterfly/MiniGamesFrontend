<template>
  <div class="content" v-if="mainStore.account">
    <span>Du har {{ this.mainStore.account.points }} point</span>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Vue } from 'vue-property-decorator';
import { MessageBus } from '@/components/MessageBus';

@Component({
  components: {},
})
export default class Profile extends Vue {
  mainStore = useMainStore();
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>

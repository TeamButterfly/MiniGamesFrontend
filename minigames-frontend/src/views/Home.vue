<template>
  <div class="missekat">
    {{ missekat }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  missekat: string = '';
  created() {
    this.missekat = 'en kat';
  }
}
</script>

<style scoped>
.missekat {
  width: 200px;
  height: 200px;
}
</style>

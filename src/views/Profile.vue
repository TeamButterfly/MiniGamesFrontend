<template>
  <div class="content">
    <span>Profilesiden</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Profile extends Vue {}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>

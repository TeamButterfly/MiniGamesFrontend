<template>
  <div class="content">
    {{ game }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Game1 extends Vue {
  game: string = 'Game 2';
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>

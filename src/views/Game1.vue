<template>
  <div>
    {{ game }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Game1 extends Vue {
  game: string = 'Game 1';
}
</script>

<style scoped></style>

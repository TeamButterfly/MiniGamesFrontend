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
export default class TicTacToe extends Vue {
  game: string = 'TicTacToe';
}
</script>

<style scoped></style>

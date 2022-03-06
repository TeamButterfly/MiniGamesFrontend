<template>
  <div>
    <modal :name="name" :width="width" :height="height" classes="popupMessage">
      <div class="popupHeader">
        <div><font-awesome-icon icon="fa-solid fa-info-circle" /> Info</div>
        <div class="closeIcon" @click="close()">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
      <div class="popupContent">
        {{ message }}
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/store/mainStore';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Popup extends Vue {
  mainStore = useMainStore();

  @Prop({ default: '' })
  message!: string;

  @Prop({ default: 'popupMessage' })
  name!: string;

  @Prop({ default: 380 })
  width!: number;

  @Prop({ default: 180 })
  height!: number;

  close() {
    this.$modal.hide(this.name);
  }
}
</script>

<style>
.popupMessage {
  background-color: #cce8f4 !important;
  border-radius: 20px !important;
  color: #417db3 !important;
  outline: rgba(0, 0, 0, 0.192) 1px solid;
  box-shadow: 1px 1px 10px 3px #000000 !important;
}

.popupHeader {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

.popupContent {
  height: calc(100% - 80px);
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-line;
  padding: 10px;
}
.closeIcon {
  font-size: 18px;
  margin-top: -2px;
  margin-right: -2px;
  cursor: pointer;
}
</style>

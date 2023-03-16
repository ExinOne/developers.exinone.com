<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="input-wrapper">
        <input type="text" v-model="text" placeholder="Type text here" />
      </div>
      <div  class="qrcode-wrapper">
        <template v-if="text">
          <div class="qrcode-label">{{ qrcodeLabel }}</div>
          <vue-qrcode :value="url" :options="{ width: 200 }"></vue-qrcode>
        </template>
        <div v-else>Please input some text to generate QRCode.</div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
export default {
  name: "QrCodeView",
};
</script>

<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { computed, ref } from 'vue';

const props = defineProps({
  prependText: {
    type: String,
    default: "",
  },
  qrcodeLabel: {
    type: String,
    default: "Scan the QRCode",
  },
});

const text = ref("");

const url = computed(() => {
  return (props.prependText + text.value) || '';
});

</script>

<style lang="css" scoped>
.wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px;
}
.input-wrapper input {
  padding: 4px 8px;
  background: var(--vp-c-bg-soft);
  width: 100%;
  margin-bottom: 16px;
}
.qrcode-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
</style>

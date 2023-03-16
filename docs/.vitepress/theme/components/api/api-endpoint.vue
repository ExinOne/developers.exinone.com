<template>
  <div>
    <div v-if="auth" class="auth-wrapper"><span class="auth">AUTHORIZATION REQUIRED</span></div>
    <div class="shiki material-palenight"><code class="url">{{ method }} {{ url }}</code>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "APIEndpoint",
};
</script>

<script setup lang="ts">

const props = defineProps({
  url: String,
  method: String,
  auth: Boolean,
  params: {
    type: Array<any>(),
    default: () => [],
  },
});

</script>

<style lang="css" scoped>
.auth-wrapper {
  margin-bottom: 4px;
}
.url {
  background-color: var(--vp-c-blue-dimm-2);
}
.auth {
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
  padding: 3px 6px;
  color: var(--vp-c-yellow-darker);
  background-color: var(--vp-c-yellow-dimm-2);
  transition: color 0.5s, background-color 0.5s;
}
</style>
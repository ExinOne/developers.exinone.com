<template>
  <div>
    <div class="title">Params</div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>In</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param, ix in params" :key="`param-${ix}`">
          <td class="param-item">{{ param.name }}</td>
          <td class="">{{ param.type }}</td>
          <td class=""><span class="params-type" :class="param.where">{{ param.where || "url"}}</span></td>
          <td class="param-required">{{ param.required }}</td>
          <td class="">{{ param.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "APIParams",
};
</script>

<script setup lang="ts">

const props = defineProps({
  params: {
    type: Array<any>(),
    default: () => [],
  },
});

</script>

<style lang="css" scoped>
.title {
  font-size: 1rem;
  font-weight: 500;
}
.params-type {
  text-transform: uppercase;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
  padding: 3px 6px;
  transition: color 0.5s, background-color 0.5s;
}
.params-type {
  background-color: var(--vp-c-blue-dimm-2);
}
.params-type.json {
  color: var(--vp-c-yellow-darker);
  background-color: var(--vp-c-yellow-dimm-2);
}
.params-type.header {
  color: var(--vp-c-green-darker);
  background-color: var(--vp-c-green-dimm-2);
}
.param-item, .param-required {
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
}
</style>

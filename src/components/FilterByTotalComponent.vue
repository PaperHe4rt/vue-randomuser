<template>
  <q-select
    map-options
    outlined
    dense
    :options="numberOfResult"
    label="Total"
    no-caps
    v-model="results"
    @update:model-value="changeTotalResult(results)"
  />
</template>

<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';

  const numberOfResult = reactive([4, 8, 16, 24, 32, 40]);
  const results = ref(numberOfResult[2]);

  const emit = defineEmits(['changeTotalResult']);

  const changeTotalResult = (value: number) => {
    emit('changeTotalResult', value);
  };
</script>

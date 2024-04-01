<template>
  <div class="row reverse q-mb-md">
    <div class="col-2">
      <q-select
        map-options
        outlined
        dense
        :options="numberOfResult"
        label="Total Results"
        no-caps
        v-model="results"
        @update:model-value="changeTotalResult(results)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, defineEmits } from 'vue';

  const numberOfResult = reactive([12, 24, 36, 48, 60]);
  const results = ref(numberOfResult[0]);

  const emit = defineEmits(['changeTotalResult']);

  const changeTotalResult = (value: number) => {
    emit('changeTotalResult', value);
  };
</script>

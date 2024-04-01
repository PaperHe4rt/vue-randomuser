<template>
  <TotalPageSelect @changeTotalResult="receivedTotalResult" />
  <div class="row q-col-gutter-md">
    <div
      class="col-xs-6 col-sm-6 col-md-4 col-lg-3 f-17"
      v-for="(item, index) in userData"
      :key="index"
    >
      <q-card class="cursor-pointer" style="border-radius: 10px; height: 100%">
        <q-card-section>
          <div class="col-12 text-center">
            <img
              class="items"
              :src="item.picture.large"
              style="border-radius: 100%"
            />
          </div>
          <div class="col-12 text-center q-my-md">
            {{ item.name.title }}.
            {{ item.name.first }}
            {{ item.name.last }}
          </div>
          <div class="col-12 text-center">Age: {{ item.dob.age }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="flex flex-center q-my-lg">
    <q-pagination
      v-model="currentPage"
      color="teal"
      :max="maxPage"
      :ellipses="false"
      :boundary-numbers="false"
      @update:model-value="getRandomUser"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { apiService } from 'src/stores/api';
  import { Notify } from 'quasar';
  import TotalPageSelect from 'src/components/TotalPageSelectionComponent.vue';

  interface User {
    picture: {
      large: string;
    };
    cell: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    dob: {
      age: number;
    };
  }

  let userData = reactive<User[]>([]);
  const currentPage = ref(1);
  const maxPage = ref(12);
  const totalResult = ref(12);

  async function getRandomUser() {
    console.log(currentPage.value);

    const res = (await apiService.get(
      `?page=${currentPage.value}&results=${totalResult.value}&seed=abc`
    )) as {
      data: { results: User[]; info: { results: number } };
      message: string;
    };

    console.log(res);

    if (res && res.data.results.length > 0) {
      userData.splice(0, userData.length, ...res.data.results);
      maxPage.value = Math.ceil(totalResult.value / 12);
      console.log(userData);
    } else {
      Notify.create({
        message: res.message,
        type: 'negative',
        position: 'center',
        timeout: 3000,
      });
    }
  }

  const receivedTotalResult = (value: number) => {
    totalResult.value = value;
    getRandomUser();
  };

  onMounted(async () => {
    await getRandomUser();
  });
</script>

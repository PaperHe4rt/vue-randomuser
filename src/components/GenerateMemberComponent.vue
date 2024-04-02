<template>
  <div class="row q-mb-md q-col-gutter-md">
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-1">
      <TotalPageSelect @changeTotalResult="receivedTotalResult" />
    </div>
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-1">
      <q-input
        outlined
        dense
        v-model="ageInput"
        label="Filter by age"
        @update:model-value="filterByAge"
        type="number"
      />
    </div>
    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
      <span>Age Range</span>
      <q-range
        v-model="ageRange"
        :min="0"
        :max="100"
        :step="5"
        label
        color="deep-orange"
        @update:model-value="filterAgeByRange"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md">
    <div
      class="col-xs-6 col-sm-6 col-md-4 col-lg-3 f-17"
      v-for="(item, index) in displayData"
      :key="index"
    >
      <q-card
        class="hover-items cursor-pointer"
        style="border-radius: 10px; height: 100%"
        @click="openUserModal(item)"
      >
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

  <q-dialog v-model="userModal">
    <UserDetailModal :userdetail="selectedUser" />
  </q-dialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, computed } from 'vue';
  import { apiService } from 'src/stores/api';
  import { Notify } from 'quasar';
  import TotalPageSelect from 'src/components/FilterByTotalComponent.vue';
  import UserDetailModal from 'src/components/UserDetailModalComponent.vue';
  import { IUser } from 'src/components/models';

  const userData = ref<IUser[]>([]);
  const displayData = ref<IUser[]>([]);
  const currentPage = ref(1);

  const totalResult = ref(16);
  const userModal = ref(false);
  let selectedUser = reactive({});
  const ageInput = ref(0);
  const ageRange = ref({
    min: 0,
    max: 100,
  });

  const openUserModal = (user: IUser) => {
    selectedUser = user;
    userModal.value = true;
  };

  const maxPage = computed(() => {
    return Math.ceil(displayData.value.length / 8);
  });

  const receivedTotalResult = (value: number) => {
    totalResult.value = value;
    getRandomUser();
  };

  async function getRandomUser() {
    const res = (await apiService.get(
      `?page=${currentPage.value}&results=${totalResult.value}` //use &seed=abc in case u wanna see the same result everytime
    )) as {
      data: { results: IUser[]; info: { results: number } };
      message: string;
    };

    if (res && res.data.results.length > 0) {
      userData.value = res.data.results;
      displayData.value = userData.value;
    } else {
      Notify.create({
        message: res.message,
        type: 'negative',
        position: 'center',
        timeout: 3000,
      });
    }
  }

  const filterAgeByRange = () => {
    if (ageRange) {
      displayData.value = userData.value.filter((user) => {
        const userAge = user.dob.age;
        return userAge >= ageRange.value.min && userAge <= ageRange.value.max;
      });

      if (displayData.value.length <= 0) {
        Notify.create({
          message: 'No users found within the specified age range',
          type: 'negative',
          position: 'center',
          timeout: 1000,
        });
      }
    }
  };

  const filterByAge = () => {
    if (ageInput.value) {
      ageInput.value = 0;
      displayData.value = userData.value.filter((i: IUser) => {
        const inputAge = String(ageInput.value);
        const userAge = String(i.dob.age);
        return userAge.includes(inputAge);
      });

      if (displayData.value.length <= 0) {
        Notify.create({
          message: 'No users found within the specified age range',
          type: 'negative',
          position: 'center',
          timeout: 1000,
        });
      }
    } else {
      getRandomUser();
    }
  };

  onMounted(async () => {
    await getRandomUser();
  });
</script>

<style scoped>
  .hover-items {
    background: linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(
          90deg,
          rgb(20, 112, 182) 0%,
          rgb(0, 149, 255) 50%,
          rgba(51, 0, 114, 1) 100%
        )
        border-box;
  }

  .hover-items:hover {
    border: 2px solid #0000;
  }
</style>

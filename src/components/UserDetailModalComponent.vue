<template>
  <q-card style="width: 600px; max-width: 100vw; border-radius: 10px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">
        {{ userdetail.id.name }}-{{ userdetail.id.value }}
      </div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-my-md">
      <div class="row">
        <div class="col-12 text-center">
          <img :src="userdetail.picture.large" style="border-radius: 100%" />
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-12 col-md-2 col-lg-2">
            <span>Title</span>
            <q-input
              outlined
              dense
              v-model="user.name.title"
              bg-color="white"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-5 col-lg-5">
            <span>First Name</span>
            <q-input
              outlined
              dense
              v-model="user.name.first"
              bg-color="white"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-5 col-lg-5">
            <span>Last Name</span>
            <q-input outlined dense v-model="user.name.last" bg-color="white" />
          </div>

          <div class="col-12">
            <q-input
              outlined
              dense
              type="textarea"
              v-model="user.fulladdress"
            />
          </div>

          <div class="col-12 col-sm-12 col-md-6 col-lg-6">
            <span>Email</span>
            <q-input outlined dense v-model="user.email" bg-color="white" />
          </div>

          <div class="col-12 col-sm-12 col-md-6 col-lg-6">
            <span>Phone</span>
            <q-input outlined dense v-model="user.phone" bg-color="white" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { defineProps, ref, onMounted } from 'vue';
  import { IUser } from 'src/components/models';

  const props = defineProps<{
    userdetail: IUser;
  }>();

  const user = ref(props.userdetail);
  user.value.fulladdress = '';

  function fulladdress() {
    for (const [key, value] of Object.entries(user.value.location)) {
      console.log('key, value', key);
      console.log('value', value);
      if (
        key === 'street' ||
        key === 'location' ||
        key === 'state' ||
        key === 'country' ||
        key === 'postcode'
      ) {
        if (typeof value === 'object') {
          for (const subKey in value) {
            user.value.fulladdress += `${value[subKey]} `;
          }
        } else {
          user.value.fulladdress += `${value} `;
        }
      }

      console.log(user.value.fulladdress);
    }
  }

  onMounted(() => {
    fulladdress();
  });
</script>

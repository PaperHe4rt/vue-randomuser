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
          <div class="col-4">
            <span>Title</span>
            <q-input
              outlined
              dense
              v-model="user.name.title"
              bg-color="white"
            />
          </div>
          <div class="col-4">
            <span>First Name</span>
            <q-input
              outlined
              dense
              v-model="user.name.first"
              bg-color="white"
            />
          </div>
          <div class="col-4">
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

          <div class="col-6">
            <span>Email</span>
            <q-input outlined dense v-model="user.email" bg-color="white" />
          </div>

          <div class="col-6">
            <span>Phone</span>
            <q-input outlined dense v-model="user.phone" bg-color="white" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { IUser } from 'src/components/models';

  const props = defineProps<{
    userdetail: IUser;
  }>();

  const user = props.userdetail;
  user.fulladdress = `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.state} ${user.location.postcode}`;
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <label for="name"> Display Name </label>
    <input
      type="text"
      placeholder="A dope username for you"
      name="name"
      id="name"
      v-model="name"
    />
    <label for="email"> Email Address</label>
    <input
      type="email"
      placeholder="The good-old email field"
      name="email"
      id="email"
      v-model="email"
    />
    <label for="password"> Password</label>
    <input
      type="password"
      placeholder="Top secret...."
      name="password"
      id="password"
      v-model="password"
    />
    <div v-if="error.show" class="error">{{ error.message }}</div>
    <button v-if="!isPending" :disabled="!email || !password || !name">
      Sign Up
    </button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import { useAccountStore } from "@/stores/account";

const globalStore = useGlobalStore();
const accountStore = useAccountStore();

const error = computed(() => globalStore.error);
const isPending = ref(false);

const email = ref("");
const password = ref("");
const name = ref("");

const handleSubmit = async () => {
  isPending.value = true;
  console.log("The user is trying to sign up");
  await accountStore.signup({
    email: email.value,
    password: password.value,
    name: name.value,
  });
  isPending.value = false;
  navigateTo("/assignments");
};
</script>

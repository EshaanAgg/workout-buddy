<script setup>
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();
const user = computed(() => accountStore.account);

const handleLogout = async () => {
  await accountStore.logout();
  console.log("User logged out");
  await navigateTo("/login");
};
</script>

<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/pics/logo.jpg" alt="Logo" />
      <h1><NuxtLink to="/">Workout Buddy</NuxtLink></h1>
      <div class="links">
        <div v-if="user">
          <NuxtLink to="/workouts">View my Workouts</NuxtLink>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <NuxtLink class="btn" to="/signup">Sign Up</NuxtLink>
          <NuxtLink class="btn" to="/login">Login</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
nav img {
  max-height: 60px;
}
</style>

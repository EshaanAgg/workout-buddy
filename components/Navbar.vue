<script setup>
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const user = computed(() => accountStore.account);
await accountStore.fetchAccount();

const route = useRoute()

const handleLogout = async () => {
  await accountStore.logout();
  console.log("User logged out");
};
</script>

<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/pics/logo.jpg" alt="Logo" />
      <h1><NuxtLink to="/">Workout Buddy</NuxtLink></h1>
      <div class="links">
        <div v-if="user">
          <div v-if="route.path!='/workouts'">
            <NuxtLink class="btn" to="/workouts">My Workouts</NuxtLink>
            <button class="btn" @click="handleLogout">Logout</button>
          </div>
          <div v-else>
            <button class="btn" @click="handleLogout">Logout</button>
          </div>
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
  background-color: #4c96af;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  border-radius: 12px;
}
nav img {
  max-height: 60px;
}
a {
  text-decoration: none;
  color:black;  
}
</style>
